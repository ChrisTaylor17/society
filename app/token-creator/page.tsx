'use client'

import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { motion } from 'framer-motion'
import { Coins, Loader2, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface Allocation {
  address: string
  percentage: number
}

export default function TokenCreator() {
  const { publicKey } = useWallet()
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [decimals, setDecimals] = useState(9)
  const [initialSupply, setInitialSupply] = useState(1000000)
  const [allocations, setAllocations] = useState<Allocation[]>([
    { address: '', percentage: 100 }
  ])
  const [isCreating, setIsCreating] = useState(false)

  const addAllocation = () => {
    setAllocations([...allocations, { address: '', percentage: 0 }])
  }

  const removeAllocation = (index: number) => {
    setAllocations(allocations.filter((_, i) => i !== index))
  }

  const updateAllocation = (index: number, field: 'address' | 'percentage', value: string | number) => {
    const newAllocations = [...allocations]
    if (field === 'address') {
      newAllocations[index][field] = value as string
    } else {
      newAllocations[index][field] = value as number
    }
    setAllocations(newAllocations)
  }

  const totalPercentage = allocations.reduce((sum, alloc) => sum + Number(alloc.percentage), 0)

  const createToken = async () => {
    if (!publicKey) {
      toast.error('Please connect your wallet')
      return
    }

    if (!tokenName || !tokenSymbol) {
      toast.error('Please fill in token name and symbol')
      return
    }

    if (totalPercentage !== 100) {
      toast.error('Total allocation must equal 100%')
      return
    }

    const validAllocations = allocations.filter(a => a.address && a.percentage > 0)
    if (validAllocations.length === 0) {
      toast.error('Please add at least one allocation')
      return
    }

    setIsCreating(true)
    try {
      const response = await fetch('/api/create-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: publicKey.toBase58(),
          tokenName,
          tokenSymbol,
          decimals,
          initialSupply,
          allocations: validAllocations,
        }),
      })

      const data = await response.json()
      if (data.success) {
        toast.success(`Token created! Mint: ${data.mintAddress}`)
        setTokenName('')
        setTokenSymbol('')
        setAllocations([{ address: '', percentage: 100 }])
      } else {
        throw new Error(data.error || 'Failed to create token')
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create token')
      console.error(error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <Coins className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4">Token Creator</h1>
          <p className="text-gray-300">Launch your custom SPL token on Solana with team allocations</p>
        </div>

        <div className="glass-card p-8">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Token Name</label>
                <input
                  type="text"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  placeholder="e.g., Explorer Token"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Token Symbol</label>
                <input
                  type="text"
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
                  placeholder="e.g., EXPL"
                  className="input-field"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Decimals</label>
                <input
                  type="number"
                  value={decimals}
                  onChange={(e) => setDecimals(Number(e.target.value))}
                  min="0"
                  max="9"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Initial Supply</label>
                <input
                  type="number"
                  value={initialSupply}
                  onChange={(e) => setInitialSupply(Number(e.target.value))}
                  min="1"
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-semibold">Token Allocations</label>
                <span className={`text-sm ${totalPercentage === 100 ? 'text-green-400' : 'text-red-400'}`}>
                  Total: {totalPercentage}%
                </span>
              </div>

              {allocations.map((allocation, index) => (
                <div key={index} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={allocation.address}
                    onChange={(e) => updateAllocation(index, 'address', e.target.value)}
                    placeholder="Wallet Address"
                    className="input-field flex-1"
                  />
                  <input
                    type="number"
                    value={allocation.percentage}
                    onChange={(e) => updateAllocation(index, 'percentage', Number(e.target.value))}
                    placeholder="%"
                    min="0"
                    max="100"
                    className="input-field w-24"
                  />
                  {allocations.length > 1 && (
                    <button
                      onClick={() => removeAllocation(index)}
                      className="btn-secondary px-3"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}

              <button onClick={addAllocation} className="btn-secondary w-full">
                <Plus className="w-5 h-5 inline mr-2" />
                Add Allocation
              </button>
            </div>

            <button
              onClick={createToken}
              disabled={isCreating || totalPercentage !== 100}
              className="btn-primary w-full text-lg py-4 mt-8"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                  Creating Token...
                </>
              ) : (
                <>
                  <Coins className="w-5 h-5 inline mr-2" />
                  Create Token on Solana
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
