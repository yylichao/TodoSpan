const listTemplate = (todo) => {
    let time = todo.time
    let done = todo.done
    let status = done ? 'todo-done' : ''
    let task = todo.task
    let t = `
    <div class='todo-cell ${status}'>
    <time>${time}</time>
    <span>${task}<span>
    </div>
    `
    return t
}
const editTemplate = (todo) => {
    let time = todo.time
    let done = todo.done
    let status = done ? 'todo-done' : ''
    let task = todo.task
    let t = `
    <div class='todo-cell ${status}'>
    <time> ${time}</time>
    <button class='todo-complete'>完成编辑</button>
    <button class='todo-delete'>删除</button>
    <span class='todo-content' contenteditable='true'>${task}</span>
    </div>
    `
    return t
}
const detailTemplate = (todo) => {
    let task = todo.task
    let t = `
        <div class='todo-cell'>
            <button class='btn-detail'>点击查看Detail</button>
            <span class='todo-content todo-hide' contenteditable='true'>${task}</span>
        </div>
    `
    return t
}

const insertList = (todoList) => {
    let container = e('.todo-list')
    container.innerHTML = ''
    for (let v of todoList) {
        let t = listTemplate(v)
        appendHtml(container, t)
    }
}
const insertEdit = (todoList) => {
    let container = e('.todo-edit')
    container.innerHTML = ''
    for (let v of todoList) {
        let t = editTemplate(v)
        appendHtml(container, t)
    }
}
const insertDetail = (todoList) => {
    let container = e('.todo-detail')
    container.innerHTML = ''
    for (let v of todoList) {
        let t = detailTemplate(v)
        appendHtml(container, t)
    }
}

// 加载所有 todo 并且显示在界面上
const showTodoList = () => {
    let todoList = loadTodos()
    log('debug todo list', todoList)
    insertList(todoList)
    insertEdit(todoList)
    insertDetail(todoList)
}

 