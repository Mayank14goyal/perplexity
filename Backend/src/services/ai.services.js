import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {AIMessage, HumanMessage, SystemMessage} from "@langchain/core/messages";
import {ChatMistralAI} from "@langchain/mistralai"

dotenv.config();

const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GOOGLE_API_KEY
});

const mistralModel = new ChatMistralAI({
    model:"mistral-small-latest",
    apiKey:process.env.MISTRAL_API_KEY
})

export async function genrateResponse(messages){

    const response = await geminiModel.invoke(messages.map(msg=>{
        if(msg.role === "user"){
            return new HumanMessage(msg.content)
        }else if(msg.role ==="ai"){
            return new AIMessage(msg.content)
        }
    }));

    return response.text
}       

export async function genrateChatTitle(message){

    const response = await mistralModel.invoke([
        new SystemMessage(`you have helpful assistent that generates choncise and descriptive titles for chat conversation.
            
            User will provide you the first message of the chat conversation, and you will genrate a title that capture the essance of the conversation in 2-4 words. The title should be clear,relevent and engaging, giving user a quick understanding of the chat's topics.`),

        new HumanMessage(`
            genrate a title for the chat conversation based on the following first message:
            "${message}"`)
        ])

        return response.text;
}