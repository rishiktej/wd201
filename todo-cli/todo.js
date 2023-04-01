/* eslint-disable no-sequences */
/* eslint-disable no-empty */

/* eslint-disable no-undef */
const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    // Write the date check condition here and return the array
    // of overdue items accordingly.
    const overdueItems = [];
    const l = all.length;
    for (let i = 0; i < l; i++) {
      if (all[i].dueDate === yesterday) {
        overdueItems.push(all[i]);
      }
    }
    return overdueItems;
  };

  const dueToday = () => {
    // Write the date check condition here and return the array
    // of todo items that are due today accordingly.
    const dueTodayItems = [];
    const l = all.length;
    for (let i = 0; i < l; i++) {
      if (all[i].dueDate === today) {
        dueTodayItems.push(all[i]);
      }
    }
    return dueTodayItems;
  };

  const dueLater = () => {
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.
    const dueLaterItems = [];
    const l = all.length;
    for (let i = 0; i < l; i++) {
      if (all[i].dueDate === tomorrow) {
        dueLaterItems.push(all[i]);
      }
    }
    return dueLaterItems;
  };

  const toDisplayableList = (list) => {
    // Format the To-Do list here, and return the output string
    // as per the format given above.
    let displayableList = "";
    for (let i = 0; i < list.length; i++) {
      const todoItem = list[i];
      let status = "[ ]";
      // eslint-disable-next-line eqeqeq
      if (todoItem.completed == true) {
        // eslint-disable-next-line no-const-assign
        status = "[x]";
      }
      const formattedDate = new Date(todoItem.dueDate).toLocaleDateString();
      if (todoItem.dueDate === today) {
        displayableList += `${i + 1}. ${status} ${todoItem.title}\n`;
      } else {
        displayableList += `${i + 1}. ${status} ${
          todoItem.title
        } ${formattedDate}\n`;
      }
    }
    return displayableList;
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

const dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);

todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
todos.add({ title: "Pay rent", dueDate: today, completed: true });
todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });

console.log("My Todo-list\n");

console.log("Overdue");
const overdues = todos.overdue();
const formattedOverdues = todos.toDisplayableList(overdues);
console.log(formattedOverdues);
console.log("\n");

console.log("Due Today");
const itemsDueToday = todos.dueToday();
const formattedItemsDueToday = todos.toDisplayableList(itemsDueToday);
console.log(formattedItemsDueToday);
console.log("\n");

console.log("Due Later");
const itemsDueLater = todos.dueLater();
const formattedItemsDueLater = todos.toDisplayableList(itemsDueLater);
console.log(formattedItemsDueLater);
console.log("\n\n");
