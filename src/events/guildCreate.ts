import {ClientCustom} from '../utils/ClientCustom';
import {Guild}        from "discord.js";

import {GuildModel} from '../models/Guild'

interface OnInterface {
    client: ClientCustom;
    On: string;
}

export class guildCreate implements OnInterface {
    client: ClientCustom;
    On: string;

    constructor(client: ClientCustom) {
        this.client = client;
        this.On = "guildCreate"
    }

    async run(guild: Guild) {
        await GuildModel.findOrCreate({where: {uuid_guild: guild.id}})
        console.info(`New guild ${guild?.name}, owned by ${guild.owner.user.username}`);
    };
}
