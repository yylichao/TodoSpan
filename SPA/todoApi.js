//todo API
//创建 todo
const todoNew = (time, task, done = false) => {
    let t = {
        time: time,
        done: done,
        task: task,
    }
    return t
}
//保存 todos
const saveTodos = (todoList) => {
    localStorage.todos = JSON.stringify(todoList)
}
//保存 todo
const saveTodo = (todo) => {
    let todoList = loadTodos()
    todoList.push(todo)
    saveTodos(todoList)
}
// 返回  todos
const loadTodos = () => {
    let todoStr = localStorage.todos
    if (todoStr == undefined) {
        todoStr = '[]'
    }
    let todoList = JSON.parse(todoStr)
    return todoList
}
const saveEditTodos = () => {
     // 1 先选出所有的 content 标签
     // 2 取出 todo
     // 3 添加到一个 数组中
     // 4 保存数组
    let edit = e('.todo-edit')
    let contents = finds(edit, '.todo-content')
    let updateList = []
    for (let v of contents) {
        let content = v
        let cell = content.parentElement
        let done = cell.classList.contains('todo-done')
        // log('cell done', cell, done)
        // log('task', content.innerHTML)
        let form = {
            time: find(cell, 'time').innerHTML,
            done,
            // innerHTML upper
            task: content.innerHTML,
        }
        // log('form', form)
        updateList.push(form)
    }
    log('debug updateList', updateList)
    saveTodos(updateList)
}