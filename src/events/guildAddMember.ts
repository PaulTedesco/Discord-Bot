import {ClientCustom} from '../utils/ClientCustom';
import {Guild, GuildMember} from "discord.js";

import {GuildModel} from '../models/Guild'

interface OnInterface {
    client: ClientCustom;
    On: string;
}

export class guildAddMember implements OnInterface {
    client: ClientCustom;
    On: string;

    constructor(client: ClientCustom) {
        this.client = client;
        this.On = "guildMemberAdd"
    }

    async run(member: GuildMember) {
        const welcomChannel = await this.client.channels.cache.get(c => c.id === "809056769170866196")
        welcomChannel.send(`Welcome <@${member.id}>`)
        return;
    };
}
