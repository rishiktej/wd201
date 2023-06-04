"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sportsession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sportsession.belongsTo(models.Users, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
    static async addsession({
      venue,
      numberofTeams,
      numberofplayers,
      playerNames,
      time,
      userId,
      sport_name,
    }) {
      return this.create({
        venue: venue,
        teamcount: numberofTeams,
        playercount: numberofplayers,
        playernames: playerNames,
        time: time,
        userId,
        sport_name: sport_name,
      });
    }
    static async getsession(sportName) {
      return this.findAll({
        where: {
          sport_name: sportName,
        },
      });
    }
  }
  sportsession.init(
    {
      venue: DataTypes.STRING,
      teamcount: DataTypes.INTEGER,
      playercount: DataTypes.INTEGER,
      playernames: DataTypes.STRING,
      time: DataTypes.DATE,
      sport_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "sportsession",
    }
  );
  return sportsession;
};
