import {ClientCustom}                     from "../utils/ClientCustom";
import {Message, Constants, ClientEvents} from "discord.js";

interface OnInterface {
    client: ClientCustom;
    On: string;
}

export default class message implements OnInterface {
    client: ClientCustom;
    On!: string;

    constructor(client: ClientCustom) {
        this.client = client;
        this.On = Constants.Events.MESSAGE_CREATE;
    }


    async run(message: Message) {
        if (message.author.bot || !message.content.startsWith(`${process.env.PREFIX}`)) return;
        const args = message.content.split(/\s+/g);
        // @ts-ignore
        const command = args.shift().slice(this.client.loadPrefix(message.guild.id));
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

        if (!cmd) return;

        cmd.setMessage(message);
        cmd.run(message, args);

        message.delete();

        if (cmd.conf.cooldown > 0) cmd.startCooldown(message.author.id);
    }

}
