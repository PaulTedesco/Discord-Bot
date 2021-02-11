import {Sequelize, Model, DataTypes, Optional} from 'sequelize';
import sequelize                               from "./index";

interface GuildAttributes {
    id: number;
    uuid_guild: string;
    uuid_owner: string;
    prefix: string;
}

interface GuildCreationAttributes extends Optional<GuildAttributes, "id"> {
}

export class GuildModel extends Model<GuildCreationAttributes, GuildAttributes> {
    id!: number;
    uuid_guild!: string;
    uuid_owner!: string;
    prefix!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

GuildModel.init({
                    id:         {
                        type:          DataTypes.INTEGER.UNSIGNED,
                        autoIncrement: true,
                        primaryKey:    true
                    },
                    uuid_guild: {type: DataTypes.STRING, allowNull: false},
                    uuid_owner: {type: DataTypes.STRING, allowNull: false},
                    prefix:     {type: DataTypes.STRING, allowNull: false, defaultValue: "!"}
                }, {
                    sequelize,
                    modelName: 'guild',
                });
GuildModel.sync()