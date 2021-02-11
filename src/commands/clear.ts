import {Commands} from "../utils/Commands"
import {ClientCustom} from "../utils/ClientCustom"
import {DMChannel, Message} from "discord.js";

export default class clear extends Commands {
    constructor(client: ClientCustom) {
        super(client, {
            allowDMs: false,
            category: "",
            countDown: 0,
            permLevel: 0,
            permission: "MANAGE_MESSAGES",
            name: "clear",
            description: "clear message",
            usage: `ping`,
            aliases: ["clean", "purge"]
        })
    }

    private noArgdeleteMessage = async (message: Message) => {
        const msgEmbed = await this.messageEmbed("Clean les messages", "DARK_RED", "Merci de choisir un chiffre entre 1 - 99 ou taper cancel pour annuler")
        const childMessage = await message.channel.send(`||<@${message.author.id}>||`, msgEmbed)
        message.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 60000
        }).then(collected => {
                if (parseInt(collected.first().content) <= 99 && parseInt(collected.first().content) >= 1) {
                    if (!(message.channel instanceof DMChannel)) {
                        message.channel.bulkDelete(parseInt(collected.first().content))
                        collected.first().delete()
                    }
                } else if (collected.first().content === "cancel") {
                    collected.first().delete()
                    return
                } else {
                    this.noArgdeleteMessage(message)
                    collected.first().delete()
                }
            }
        )
    }
    private isNumeric = (str: string) => {
        if (typeof str != "string") return false // we only process strings!
        return !isNaN(parseInt(str)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    async run(msg: Message, args: string | null = null) {
        if (args.length === 0 || !this.isNumeric(args[0]) || parseInt(args[0]) <= 0 || parseInt(args[0]) >= 100) {
            await this.noArgdeleteMessage(msg)
        } else {
            if (!(msg.channel instanceof DMChannel)) {
                await msg.channel.bulkDelete(parseInt(args[0]))
            }
        }
        return;
    }
}