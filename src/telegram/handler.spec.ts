import { sendMessage } from "./handler";
import TelegramBot from "node-telegram-bot-api";

jest.mock("node-telegram-bot-api");

describe("sendMessage", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should send a message successfully", async () => {
        const chatId = process.env.CHAT_ID;
        const message = "Hello, world!";

        const sendMessageMock = jest.spyOn(
            TelegramBot.prototype,
            "sendMessage"
        );

        await sendMessage(chatId!, message);

        expect(sendMessageMock).toHaveBeenCalledWith(chatId, message);
    });
});
