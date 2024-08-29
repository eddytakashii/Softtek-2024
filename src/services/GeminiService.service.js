import { GoogleGenerativeAI } from "@google/generative-ai";

const TOKEN_API=import.meta.env.VITE_TOKEN_API

const generativeAI = new GoogleGenerativeAI(TOKEN_API)
const model=generativeAI.getGenerativeModel({model:"gemini-1.5-flash"})

 const gerarResposta = async(prompt)=>{
    try {
        const result=await model.generateContent(prompt)
        const response=await result.response
        const text= await response.text()
        return text
    } catch (error) {
        console.error("Erro ao gerar resposta",error)
        throw error;
        
    }
}

export default{
    gerarResposta
}