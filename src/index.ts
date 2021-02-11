require('dotenv').config();
import {ClientCustom, Options} from './utils/ClientCustom'
import * as _ from 'lodash';

class Bot {
    static run() {
        let option = {}
        const bot = new ClientCustom(<Options>option);

        bot.login(process.env.BOT_TOKEN)
        console.log("Loading Command");
        bot.loadCommands();
        console.log("Finish Command\nLoading Events")
        bot.loadEvents();
        console.log("Finish Events")
    }
}

Bot.run();