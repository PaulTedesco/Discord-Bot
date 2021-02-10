import {ClientCustom} from '../utils/ClientCustom';
import {Guild}        from "discord.js";

import {GuildModel} from '../models/Guild'

interface OnInterface {
    client: ClientCustom;
    On: string;
}

export class ready implements OnInterface {
    client: ClientCustom;
    On: string;

    constructor(client: ClientCustom) {
        this.client = client;
        this.On = "ready"
    }

    run() {
        this.client.guilds.cache.map(async (guild: Guild) => {
            await GuildModel.findOrCreate({where: {uuid_guild: guild.id, uuid_owner: guild.ownerID}})
        })
        console.info(`SteoGame: Logged is as ${this.client.user.tag}`);
    };
}
