import { NextRequest, NextResponse } from 'next/server'
import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import { Metaplex, keypairIdentity, bundlrStorage, toMetaplexFile } from '@metaplex-foundation/js'

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, imageUrl, name, description, attributes } = await request.json()

    if (!walletAddress || !imageUrl || !name || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const connection = new Connection('https://api.devnet.solana.com', 'confirmed')
    
    let payer: Keypair
    if (process.env.SOLANA_PRIVATE_KEY) {
      const secretKey = JSON.parse(process.env.SOLANA_PRIVATE_KEY)
      payer = Keypair.fromSecretKey(Uint8Array.from(secretKey))
    } else {
      payer = Keypair.generate()
      try {
        const airdropSignature = await connection.requestAirdrop(payer.publicKey, 1000000000)
        await connection.confirmTransaction(airdropSignature)
      } catch (airdropError) {
        return NextResponse.json({ 
          error: 'Devnet faucet rate limit reached. Please add SOLANA_PRIVATE_KEY to environment variables or try again later.' 
        }, { status: 429 })
      }
    }
    
    const metaplex = Metaplex.make(connection)
      .use(keypairIdentity(payer))
      .use(bundlrStorage({
        address: 'https://devnet.bundlr.network',
        providerUrl: 'https://api.devnet.solana.com',
        timeout: 60000,
      }))

    const imageResponse = await fetch(imageUrl)
    const imageBuffer = await imageResponse.arrayBuffer()
    const imageFile = toMetaplexFile(Buffer.from(imageBuffer), 'nft.png')
    
    const imageUri = await metaplex.storage().upload(imageFile)
    
    const metadata = {
      name,
      description,
      image: imageUri,
      attributes: attributes || [],
      symbol: 'SOE',
      seller_fee_basis_points: 500,
      external_url: '',
      properties: {
        files: [
          {
            uri: imageUri,
            type: 'image/png',
          },
        ],
        category: 'image',
        creators: [
          {
            address: walletAddress,
            share: 100,
          },
        ],
      },
    }

    const { uri } = await metaplex.nfts().uploadMetadata(metadata)

    const userPublicKey = new PublicKey(walletAddress)

    const { nft } = await metaplex.nfts().create({
      uri,
      name,
      sellerFeeBasisPoints: 500,
      tokenOwner: userPublicKey,
    })

    return NextResponse.json({
      success: true,
      mintAddress: nft.address.toBase58(),
      metadata: uri,
    })
  } catch (error: any) {
    console.error('Error minting NFT:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to mint NFT' },
      { status: 500 }
    )
  }
}
