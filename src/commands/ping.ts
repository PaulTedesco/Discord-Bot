import {Commands} from "../utils/Commands"
import {ClientCustom} from "../utils/ClientCustom"
import {Message} from "discord.js";

export default class ping extends Commands {
    constructor(client: ClientCustom) {
        super(client, {
            allowDMs: false,
            category: "",
            countDown: 0,
            permLevel: 0,
            permission: "MANAGE_MESSAGES",
            name: "ping",
            description: "send pong",
            usage: `ping`,
            aliases: ["p"]
        })
    }

    async run(msg: Message) {
        const msgEmbed = await this.messageEmbed(":ping_pong:")
        await msg.channel.send(`||<@${msg.author.id}>||`, msgEmbed)
        return;
    }
}