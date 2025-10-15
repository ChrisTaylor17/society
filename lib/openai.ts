import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateNFTImage(prompt: string): Promise<string> {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create a unique, artistic NFT image: ${prompt}. Style: digital art, vibrant colors, high quality, suitable for NFT collection.`,
      n: 1,
      size: "1024x1024",
      quality: "hd",
    })

    return response.data[0].url || ''
  } catch (error) {
    console.error('Error generating image:', error)
    throw error
  }
}

export async function getAIAssistance(userMessage: string, context?: string): Promise<string> {
  try {
    const systemPrompt = `You are an AI assistant for the Society of Explorers, a Web3 platform on Solana. 
    Help users create NFTs, tokens, and navigate blockchain interactions. Be concise, helpful, and guide them step-by-step.
    ${context ? `Context: ${context}` : ''}`

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      max_tokens: 500,
    })

    return response.choices[0].message.content || 'I apologize, but I could not generate a response.'
  } catch (error) {
    console.error('Error getting AI assistance:', error)
    throw error
  }
}
