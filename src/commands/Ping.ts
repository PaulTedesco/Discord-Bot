import {Commands}     from "../utils/Commands"
import {ClientCustom} from "../utils/ClientCustom"
import {Message}      from "discord.js";

export default class Ping extends Commands {
    constructor(client: ClientCustom) {
        super(client, {
            allowDMs:    false,
            category:    "",
            countDown:   0,
            permLevel:   0,
            permission:  "MANAGE_MESSAGES",
            name:        "ping",
            description: "send pong",
            usage:       `ping`,
            aliases:     ["p"]
        })
    }

    async run(msg: Message) {
        await msg.reply("Pong")
        return;
    }
}