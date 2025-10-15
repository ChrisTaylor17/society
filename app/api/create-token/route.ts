import { NextRequest, NextResponse } from 'next/server'
import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token'

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, tokenName, tokenSymbol, decimals, initialSupply, allocations } = await request.json()

    if (!walletAddress || !tokenName || !tokenSymbol || !decimals || !initialSupply || !allocations) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const connection = new Connection('https://api.devnet.solana.com', 'confirmed')
    
    const payer = Keypair.generate()
    
    const airdropSignature = await connection.requestAirdrop(
      payer.publicKey,
      2000000000
    )
    await connection.confirmTransaction(airdropSignature)

    const mintAuthority = payer
    const freezeAuthority = payer

    const mint = await createMint(
      connection,
      payer,
      mintAuthority.publicKey,
      freezeAuthority.publicKey,
      decimals
    )

    const totalSupply = initialSupply * Math.pow(10, decimals)

    for (const allocation of allocations) {
      const recipientPublicKey = new PublicKey(allocation.address)
      
      const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        recipientPublicKey
      )

      const amount = Math.floor((totalSupply * allocation.percentage) / 100)

      await mintTo(
        connection,
        payer,
        mint,
        recipientTokenAccount.address,
        mintAuthority,
        amount
      )
    }

    return NextResponse.json({
      success: true,
      mintAddress: mint.toBase58(),
      tokenName,
      tokenSymbol,
      decimals,
      totalSupply: initialSupply,
    })
  } catch (error: any) {
    console.error('Error creating token:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create token' },
      { status: 500 }
    )
  }
}
