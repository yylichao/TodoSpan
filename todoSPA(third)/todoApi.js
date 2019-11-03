// new todo
const todoNew = task => {
    let ct = now()
    let ut = ct
    let id = 0
    let todoList = loadTodos()
    if (todoList.length > 0) {
        id = todolist.length + 1
    } else {
        id = 1
    }
    let t = {
        id,
        task,
        ct,
        ut,
        done: false,
    }
    return t
}
// save todo list
const saveTodos = todoList => {
    localStorage.todos = sty(todoList)
}
// save a todo
const saveTodo = todo => {
    let todoList = loadTodos()
    todoList.push(todo)
    saveTodos(todoList)
}
// return load todos
const loadTodos = () => {
    let todoStr = localStorage.todos
    if (todoStr == undefined) {
        todoStr = '[]'
    }
    let todoList = par(todoStr)
    return todoList
}
// delete
const todoDelete = id => {
    let todoList = loadTodos()
    let index = todoIdWithIndex(todoList, id)
    todoList.splice(index, 1)
    saveTodos(todoList)
}
// Finish todo
const todoFinish = id => {
    let todoList = loadTodos()
    let index = todoIdWithIndex(todoList, id)
    let status = todoList[index].done
    todoList[index].done = !status
    saveTodos(todoList)
}
// update todo
/*
   form {
        id: 0,
        content: 'str',
   }
 */
const todoUpdate = form => {
    let id = form.id
    let task = form.content
    let todoList = loadTodos()
    let index = todoIdWithIndex(todoList, id)
    todoList[index].task = task
    log('todoList', todoList)
    saveTodos(todoList)
}