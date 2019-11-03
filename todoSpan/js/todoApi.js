// todo api
const templateTodo = (content, done, time) => {
    let status = ''
    let gou = 'fa-circle-thin'
    if (done) {
        status = 'done'
        gou = 'fa-check-circle-o'
    }
    let t = `
    <div class='todo-cell ${status}'>
        <time class='thingTime'> ${time}</time>
        <span class='todo-done todo-check fa ${gou}'></span>
        <span class='todo-content' contenteditable='false'>${content}</span>
        <i class="todo-delete fa fa-trash" aria-hidden="true"></i>
    </div>
    `
    return t
}
const insertTodo = (content, done=false, time) => {
    let container = e('#id-div-container')
    let t = templateTodo(content, done, time)
    appendHtml(container, t)
}
const save = arr => {
    let s = sty(arr)
    localStorage.todos = s
}
const load = () => {
    let todoList = par(localStorage.todos)
    return todoList
}
const saveTodos = () => {
    let cells = es('.todo-cell')
    let todos = []
    for (let cell of cells) {
        let done = cell.classList.contains('done')
        let time = find(cell, 'time').innerHTML
        let content = find(cell, '.todo-content').innerHTML
        let todo = {
            time,
            done,
            content,
        }
        todos.push(todo)
    }
    log('todos  save', todos)
    save(todos)
}
const loadTodos = () => {
    let todos = load()
    for (let todo of todos) {
        insertTodo(todo.content, todo.done, todo.time)
    }
}