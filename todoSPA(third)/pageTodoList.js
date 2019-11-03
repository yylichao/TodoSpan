const templateShowTodo = todo => {
    let status = todo.done ? 'done' : ''
    let task = todo.task
    let t = `
        <div class='todo-cell ${status}'>
        ${task}
        </div>
    `
    return t
}
const insertShow = todoList => {
    let listDiv = e('.todo-show')
    // 清空 所以的 todo list
    listDiv.innerHTML = ''
    for(let todo of todoList) {
        let t = templateShowTodo(todo)
        appendHtml(listDiv, t)
    }
}

const templateEditTodo = todo => {
    let status = todo.done ? 'done' : ''
    let task = todo.task
    let ct = todo.ct
    let id = todo.id
    let t = `
         <div class='todo-cell ${status}' data-todoid="${id}">
                <span class='todo-now'></span>
                <button class='todo-done'>完成</button>
                <button class='todo-delete'>删除</button>
                <span>${ct}</span>
                <span class='todo-content' contenteditable='false'> ${task} </span>
                <button class='edit'>编辑</button>
          </div>
    `
    return t
}
const insertEdit = todoList => {
    let listDiv = e('.todo-edit')
    // 清空 所以的 todo list
    listDiv.innerHTML = ''
    for(let todo of todoList) {
        let t = templateEditTodo(todo)
        appendHtml(listDiv, t)
    }
}

const templateDetailTodo = todo => {
    let status = todo.done ? 'done' : ''
    let task = todo.task
    let t = `
        <div class='todo-cell ${status}'>
        <button class="btn-detail"> detail </button>
        <span class="todo-detail gua-hide"> ${task} </span> 
        </div>
    `
    return t
}
const insertDetail = todoList => {
    let listDiv = e('.todo-detail')
    // 清空 所以的 todo list
    listDiv.innerHTML = ''
    for(let todo of todoList) {
        let t = templateDetailTodo(todo)
        appendHtml(listDiv, t)
    }
}

const insertTodoList = className => {
    let todoList = loadTodos()
    if (className == 'todo-show') {
        insertShow(todoList)
    } else if (className == 'todo-edit') {
        insertEdit(todoList)
    } else if (className == 'todo-detail') {
        insertDetail(todoList)
    }
}