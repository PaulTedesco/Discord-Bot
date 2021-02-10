require('dotenv').config();
import {ClientCustom, Options} from './utils/ClientCustom'

class Bot {
    static run() {
        let option = {}
        const bot = new ClientCustom(<Options>option);

        bot.login(process.env.BOT_TOKEN)
        bot.loadCommands();
        bot.loadEvents();
    }
}

Bot.run();