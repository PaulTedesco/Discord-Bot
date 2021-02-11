/**
 * @author: steodec
 * @copyright: Steodec
 */
import {ClientCustom} from "./ClientCustom";
import {ColorResolvable, EmbedFieldData, Message, MessageEmbed, PermissionString} from "discord.js";

export interface Help {
    name: string | null;
    description: string;
    usage: string;
    category: string;
}

export interface Conf {
    permLevel: number;
    permission: PermissionString;
    countDown: number;
    aliases: Array<string>;
    allowDMs: boolean;
}

export interface CommandOption extends Help, Conf {
}

export class Commands {
    private client: ClientCustom;
    private help: Help;
    private conf: Conf;
    private countdown: Set<any>;
    private message!: Message;
    private embed!: MessageEmbed

    /**
     * @param {CustomClient} client The client used in the command
     * @param {Object} options The command's configuration
     */
    constructor(client: ClientCustom, options: CommandOption) {
        /**
         * The client used in the command
         * @type {CustomClient}
         */
        this.client = client;
        /**
         * The command's information properties
         * @type {Object}
         */
        this.help = {
            name: options.name || null,
            description: options.description || "No information specified.",
            usage: options.usage || "",
            category: options.category || "Information"
        };
        /**
         * The command's configuration
         * @type {Object}
         */
        this.conf = {
            permLevel: options.permLevel || 0,
            permission: options.permission || "SEND_MESSAGES",
            countDown: options.countDown || 1000,
            aliases: options.aliases || [],
            allowDMs: options.allowDMs || false
        };
        /**
         * A set of the IDs of the users on cooldown
         * @type {Set}
         */
        this.countdown = new Set();
    }

    /**
     * Puts a user on cooldown
     * @param {String} uuid The ID of the user to put on cooldown
     */
    startCooldown(uuid: string) {
        // Adds the user to the set
        this.countdown.add(uuid);

        // Removes the user from the set after the cooldown is done
        setTimeout(() => {
            this.countdown.delete(uuid);
        }, this.conf.countDown);
    }

    setMessage(message: Message) {
        this.message = message;
    }

    respond(messageRespond: string) {
        this.message.channel.send(messageRespond);
    }

    messageEmbed(title: string, color: ColorResolvable | null = null, description: string | null = null, fields: Array<EmbedFieldData> | null = null) {
        this.embed = new MessageEmbed();
        this.embed.setTitle(title || "Steo Games");
        this.embed.setColor(color || Math.floor(Math.random() * 16777214) + 1);
        if (description !== null)
            this.embed.setDescription(description);
        if (fields !== null)
            this.embed.addFields(fields)

        return this.embed
    }
}
