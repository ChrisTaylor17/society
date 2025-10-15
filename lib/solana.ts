import { Connection, Keypair, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Metaplex, keypairIdentity, bundlrStorage, toMetaplexFile } from '@metaplex-foundation/js'

const SOLANA_NETWORK = 'devnet'
const RPC_ENDPOINT = 'https://api.devnet.solana.com'

export const connection = new Connection(RPC_ENDPOINT, 'confirmed')

export async function createNFT(
  wallet: any,
  imageUrl: string,
  name: string,
  description: string,
  attributes: { trait_type: string; value: string }[]
) {
  try {
    const metaplex = Metaplex.make(connection)
      .use(keypairIdentity(wallet))
      .use(bundlrStorage())

    const { nft } = await metaplex.nfts().create({
      uri: await uploadMetadata(metaplex, {
        name,
        description,
        image: imageUrl,
        attributes,
      }),
      name,
      sellerFeeBasisPoints: 500,
    })

    return nft
  } catch (error) {
    console.error('Error creating NFT:', error)
    throw error
  }
}

async function uploadMetadata(metaplex: Metaplex, metadata: any) {
  const { uri } = await metaplex.nfts().uploadMetadata(metadata)
  return uri
}

export async function createToken(
  wallet: any,
  decimals: number,
  initialSupply: number,
  allocations: { address: string; percentage: number }[]
) {
  try {
    const mintAuthority = wallet.publicKey
    const freezeAuthority = wallet.publicKey

    const mint = await createMint(
      connection,
      wallet,
      mintAuthority,
      freezeAuthority,
      decimals
    )

    const totalSupply = initialSupply * Math.pow(10, decimals)

    for (const allocation of allocations) {
      const recipientPublicKey = new PublicKey(allocation.address)
      const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        wallet,
        mint,
        recipientPublicKey
      )

      const amount = Math.floor((totalSupply * allocation.percentage) / 100)

      await mintTo(
        connection,
        wallet,
        mint,
        recipientTokenAccount.address,
        mintAuthority,
        amount
      )
    }

    return {
      mintAddress: mint.toBase58(),
      decimals,
      totalSupply: initialSupply,
    }
  } catch (error) {
    console.error('Error creating token:', error)
    throw error
  }
}

export async function getWalletBalance(publicKey: PublicKey): Promise<number> {
  const balance = await connection.getBalance(publicKey)
  return balance / LAMPORTS_PER_SOL
}
