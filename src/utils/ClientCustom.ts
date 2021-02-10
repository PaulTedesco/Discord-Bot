import ErrnoException = NodeJS.ErrnoException;
import {ClientOptions, Message} from "discord.js";
// @ts-ignore
import * as cmds                from "../commands";
// @ts-ignore
import * as evts                from "../events";
import {where}                  from "sequelize";
import {GuildModel}             from "../models/guild";

const {Client, Collection} = require('discord.js');

export interface Options {
    clientOptions: ClientOptions,
    config: {},
    perms: {}
}

export class ClientCustom extends Client {
    /**
     * @param {Object} options The options passed to the client
     * @param {Object} options.clientOptions The client options used by the original discord.js client
     * @param {Object} options.Config The filepath to the Config file
     * @param {Object} options.perms The permission levels file
     */
    constructor(options: Options | null) {
        super(options?.clientOptions || {});

        /**
         * A collection of all of the bot's Commands
         * @type {Discord.Collection}
         */
        this.commands = new Collection();
        /**
         * A collection of all of the bot's command aliases
         * @type {Discord.Collection}
         */
        this.aliases = new Collection();

        // Client variables
        /**
         * The bot's configuration - empty if no file was specified
         * @type {Object}
         */
        this.config = options?.config;
        /**
         * The bot's permission levels
         * @type {Object}
         */
        this.perms = options?.perms;

        // Inform the user that the client has been initialised
        console.log(`Bot lancer avec la version ${process.version}.`);
    }

    /**
     * Loads all Commands in the directory
     * @param {String} path The path where the Commands are located
     */
    loadCommands() {
        console.log("Chargement...")
        Object.keys(cmds).forEach((cmdKey: string) => {
            // @ts-ignore
            const command = new cmds[cmdKey](this)
            this.commands.set(command.help.name, command)
            command.conf.aliases.forEach((a: string) => this.aliases.set(a, command.help.name))
        })
        console.log(`${this.commands.size} load`)
    }

    /**
     * Loads all events in the directory
     * @param {String} path The path where the events are located
     */
    loadEvents() {
        Object.keys(evts).forEach((evtKey: string) => {
            // @ts-ignore
            const evt = new evts[evtKey](this)
            super.on(evt.On, (...args: Array<any>) => evt.run(...args))
        })
    }

    async loadPrefix(guildID: string) {
        const guild = await GuildModel.findOne({where: {uuid_guild: guildID}})
        if (guild?.prefix) {
            return guild.prefix
        } else {
            return process.env.PREFIX
        }
    }
}
