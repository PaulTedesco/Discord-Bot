import {Sequelize} from 'sequelize';

const env = process.env.NODE_ENV || 'development';
import conf        from '../config/config'

let sequelize: Sequelize;
const config = conf.get(env)
// @ts-ignore
if (config.use_env_variable) {
    // @ts-ignore
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    // @ts-ignore
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

export default sequelize