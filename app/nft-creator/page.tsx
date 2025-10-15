'use client'

import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { motion } from 'framer-motion'
import { Sparkles, Loader2, Image as ImageIcon } from 'lucide-react'
import toast from 'react-hot-toast'

export default function NFTCreator() {
  const { publicKey, signTransaction } = useWallet()
  const [prompt, setPrompt] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [attributes, setAttributes] = useState([{ trait_type: '', value: '' }])
  const [generatedImage, setGeneratedImage] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isMinting, setIsMinting] = useState(false)

  const generateImage = async () => {
    if (!prompt) {
      toast.error('Please enter an image prompt')
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()
      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl)
        toast.success('Image generated successfully!')
      } else {
        throw new Error('Failed to generate image')
      }
    } catch (error) {
      toast.error('Failed to generate image')
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  const mintNFT = async () => {
    if (!publicKey) {
      toast.error('Please connect your wallet')
      return
    }

    if (!generatedImage || !name || !description) {
      toast.error('Please fill in all fields and generate an image')
      return
    }

    setIsMinting(true)
    try {
      const response = await fetch('/api/mint-nft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: publicKey.toBase58(),
          imageUrl: generatedImage,
          name,
          description,
          attributes: attributes.filter(attr => attr.trait_type && attr.value),
        }),
      })

      const data = await response.json()
      if (data.success) {
        toast.success(`NFT minted successfully! Check your Phantom wallet.`)
        setPrompt('')
        setName('')
        setDescription('')
        setGeneratedImage('')
        setAttributes([{ trait_type: '', value: '' }])
      } else {
        throw new Error(data.error || 'Failed to mint NFT')
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to mint NFT')
      console.error(error)
    } finally {
      setIsMinting(false)
    }
  }

  const addAttribute = () => {
    setAttributes([...attributes, { trait_type: '', value: '' }])
  }

  const updateAttribute = (index: number, field: 'trait_type' | 'value', value: string) => {
    const newAttributes = [...attributes]
    newAttributes[index][field] = value
    setAttributes(newAttributes)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4">AI NFT Creator</h1>
          <p className="text-gray-300">Generate unique NFT images with AI and mint them on Solana</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-4">Generate Image</h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your NFT image... (e.g., 'A futuristic astronaut exploring a purple nebula')"
                className="input-field min-h-[120px] resize-none"
              />
              <button
                onClick={generateImage}
                disabled={isGenerating}
                className="btn-primary w-full mt-4"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 inline mr-2" />
                    Generate Image
                  </>
                )}
              </button>
            </div>

            <div className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-4">NFT Details</h2>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="NFT Name"
                className="input-field mb-4"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="NFT Description"
                className="input-field min-h-[100px] resize-none mb-4"
              />
              
              <h3 className="text-lg font-semibold mb-2">Attributes</h3>
              {attributes.map((attr, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={attr.trait_type}
                    onChange={(e) => updateAttribute(index, 'trait_type', e.target.value)}
                    placeholder="Trait Type"
                    className="input-field flex-1"
                  />
                  <input
                    type="text"
                    value={attr.value}
                    onChange={(e) => updateAttribute(index, 'value', e.target.value)}
                    placeholder="Value"
                    className="input-field flex-1"
                  />
                </div>
              ))}
              <button onClick={addAttribute} className="btn-secondary w-full mt-2">
                Add Attribute
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-4">Preview</h2>
              <div className="aspect-square bg-slate-800/50 rounded-xl flex items-center justify-center overflow-hidden">
                {generatedImage ? (
                  <img src={generatedImage} alt="Generated NFT" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-gray-500">
                    <ImageIcon className="w-16 h-16 mx-auto mb-2" />
                    <p>Your generated image will appear here</p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={mintNFT}
              disabled={isMinting || !generatedImage}
              className="btn-primary w-full text-lg py-4"
            >
              {isMinting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                  Minting NFT...
                </>
              ) : (
                'Mint NFT on Solana'
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
