import { configDotenv } from "dotenv";
import TelegramBot from "node-telegram-bot-api";
configDotenv()
// Replace with your Telegram bot token
const token = process.env.BOT_TOKEN;

if (!token) {
    throw new Error(
        "Please, add your bot token to the .env file. Use the format BOT_TOKEN=your_token"
    );
}

const bot = new TelegramBot(token, { polling: false });

export const sendMessage = async (
    chatId: string,
    message: string
): Promise<void> => {
    try {
        await bot.sendMessage(chatId, message);
    } catch (error) {
        console.error("Error sending message:", error);
    }
};

export default bot;
