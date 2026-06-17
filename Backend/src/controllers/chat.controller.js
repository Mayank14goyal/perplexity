import { genrateResponse, genrateChatTitle } from "../services/ai.services.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

export async function sendMessage(req, res) {
  const { message, chat: chatId } = req.body;

  let title = null,
    chat = null;

  if (!chatId) {
    title = await genrateChatTitle(message);
    chat = await chatModel.create({
      user: req.user.id,
      title,
    });
  }

  const userMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: message,
    role: "user",
  });
  
    const messages = await messageModel.find({
        chat: chatId || chat._id
    }).sort({ createdAt: 1 });

const result = await genrateResponse(messages);

  const aiMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: result,
    role: "ai",
  });

  res.status(201).json({
    title,
    chat,
    userMessage,
    aiMessage: result,
  });
}

export async function getChats(req, res){
    const user = req.user

    const chats = await chatModel.find({user: user.id})

    res.status(200).json({
        message:"chas recive successfully",
        chats
    })
}

export async function getMessages(req, res){
    const {chatId} = req.params;

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if(!chat){
        return res.status(404).json({
            message: "user not found."
        })
    }

    const messages = await messageModel.find({
        chat : chatId
    })

    res.status(200).json({
        message: "message retrived successfully.",
        messages
    })
}

export async function deleteChat(){

    const {chatiId} = req.params;

    const chat = await chatModel.findOneAndDelete({
        _id: chatId,
        user: req.user.id
    })

    await messageModel.deleteMany({
        chat : chatId
    })

    if(!chat){
        return res.status(404).json({
            message:"chat not found"
        })
    }

    res.status(200).json({
        message: "chat deleted successfully"
    })
}

