const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
const today = new Date();
const yesterday = new Date(today);
const tomorrow = new Date(today);
yesterday.setDate(today.getDate() - 1);
tomorrow.setDate(today.getDate() + 1);

describe("todolist test suit", () => {
  beforeAll(() => {
    add({
      title: "newtodo",
      completed: false,
      duedate: new Date().toISOString().slice(0, 10),
    });
  });

  test("should add new todo", () => {
    const todoitemscount = all.length;
    add({
      title: "newtodo1",
      completed: true,
      duedate: yesterday.toISOString().slice(0, 10),
    });
    expect(all.length).toBe(todoitemscount + 1);
  });

  test("marks as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("retrival of overdue items", () => {
    const overdueitemscount = overdue().length;
    add({
      title: "newtodo2",
      completed: false,
      duedate: yesterday.toISOString().slice(0, 10),
    });
    overdueitems = overdue();
    console.log(overdueitems.length);
    expect(overdueitems.length).toBe(overdueitemscount + 1);
    expect(overdueitems[0].duedate).toEqual(
      yesterday.toISOString().slice(0, 10)
    );
    expect(overdueitems[0].completed).toBe(true);
  });
  test("retrival of dueToday items", () => {
    const duetodayitemscount = dueToday().length;
    add({
      title: "newtodo3",
      completed: false,
      duedate: new Date().toISOString().slice(0, 10),
    });
    duetodayitems = dueToday();
    expect(duetodayitems.length).toBe(duetodayitemscount + 1);
    expect(duetodayitems[0].duedate).toEqual(
      new Date().toISOString().slice(0, 10)
    );
    expect(duetodayitems[1].completed).toBe(false);
  });
});
test("retrival of duelater items", () => {
  const duelateritemscount = dueLater().length;
  add({
    title: "newtodo4",
    completed: true,
    duedate: tomorrow.toISOString().slice(0, 10),
  });
  duelateritems = dueLater();
  expect(duelateritems.length).toBe(duelateritemscount + 1);
  expect(duelateritems[0].duedate).toEqual(tomorrow.toISOString().slice(0, 10));
  expect(duelateritems[0].completed).toBe(true);
});
