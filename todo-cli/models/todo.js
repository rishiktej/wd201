"use strict";
const { Model, Op } = require("sequelize");
const { truncate } = require("../todomodel");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overdueTasks = await Todo.overdue();
      overdueTasks.forEach((task) => console.log(task.displayableString()));
      console.log("\n");

      console.log("Due Today");
      const dueTodayTasks = await Todo.dueToday();
      dueTodayTasks.forEach((task) => console.log(task.displayableString()));
      console.log("\n");

      console.log("Due Later");
      const dueLaterTasks = await Todo.dueLater();
      dueLaterTasks.forEach((task) => console.log(task.displayableString()));
    }

    static async overdue() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date(),
          },
          completed: {
            [Op.or]: [false, true],
          },
        },
      });
    }

    static async dueToday() {
      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59,
        999
      );
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.between]: [startOfDay, endOfDay],
          },
          completed: {
            [Op.or]: [false, true],
          },
        },
      });
    }

    static async dueLater() {
      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: startOfDay,
          },
          completed: {
            [Op.or]: [false, true],
          },
        },
      });
    }

    static async markAsComplete(id) {
      const task = await Todo.findByPk(id);
      task.completed = true;
      await task.save();
    }

    displayableString() {
      let checkbox = "[ ]";
      if (this.completed === true) {
        checkbox = "[x]";
      }
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
