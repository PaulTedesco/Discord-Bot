import {ClientCustom} from "../utils/ClientCustom";
import {Message, Constants, ClientEvents} from "discord.js";

interface OnInterface {
    client: ClientCustom;
    On: string;
}

export class message implements OnInterface {
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
        const command = args.shift().slice(process.env.PREFIX.length);
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
        if (!cmd) return message.delete();

        await cmd.setMessage(message);
        await cmd.run(message, args);
        await message.delete();


        if (cmd.conf.cooldown > 0) cmd.startCooldown(message.author.id);
    }


}
