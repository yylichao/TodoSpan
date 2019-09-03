const insertTodo = (todo) => {
    // 添加到 container 中 
    let container = e('#id-div-container')
    let t = templateTodo(todo)
    appendHtml(container, t)
}
const templateTodo = (todo) => {
    let [time, done, task] = [todo.time, todo.done, todo.task]
    let status = done ? 'done' : ''
    let t = `
         <div class='todo-cell ${status}' >
            <span class='todo-now'>${time}</span>
            <button class='todo-done'>完成</button>
            <button class='todo-delete'>删除</button>
            <span class='todo-content' contenteditable='true'>${task}</span>
            <button class='todo-edit'>编辑</button>
            <button class='button-todo-submit' type="button">提交</button>
         </div>`
    return t
}
const inserteditTodo = (element) => {
    let parent = element.parentElement
    let t = `
    <input class='input-todo-edit' type="text">
    `
    appendHtml(parent, t)
}

const save = (arr) => {
    var s = JSON.stringify(arr)
    localStorage.todos = s
    // log("localStorage.todos", localStorage.todos)
}
const load = () => {
    let todoStr = localStorage.todos
    //一般todos 之前初始化的
    // 第一次读取的时候，结果是 undefined
    // 所以需要设置为  '[]'
    // 否则 就报错了
    if (todoStr == undefined) {
        todoStr = '[]'
    }
    let todoList = JSON.parse(todoStr)
    // log('todoList', todoList)
    return todoList
}

const saveTodos = () => {
    log('save todos')
    let cells = es('.todo-cell')
    let todos = []
    for (let i = 0; i < cells.length; i++) {
        let c = cells[i]
        let done = c.classList.contains('done')
        let time = findAll(c, 'span')[0].innerHTML
        let task = findAll(c, 'span')[1].innerHTML
        let todo = {
            time,
            done,
            task,
        }
        // 添加到数组中
        todos.push(todo)
    }
    // 保存数组
    save(todos)
}
const loadTodos = () => {
    let todos = load()
    log('todos', todos)
    // 添加到页面中
    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i]
        log('todo', todo)
        insertTodo(todo)
    }
}

const bindAdd = () => {
    let addButton = e('#id-button-add')
    bindEvent(addButton, EventType.click, () => {
        log('addButton click')
        // 获得 input.value
        let inputButton = e('#id-input-todo')
        let task = inputButton.value
        let time = now()
        // 添加到 container 中 默认没有完成（done 为布尔值）
        let done = false
        let todo = {
            time,
            done,
            task,
        }
        insertTodo(todo)
    })
}
const bindDel = () => {
    let container = e('#id-div-container')
    bindEvent(container, EventType.click, (event) => {
        let target = event.target
        if (target.classList.contains('todo-delete')) {
            log('delete')
            let todoDiv = target.parentElement
            todoDiv.remove()
            saveTodos()
        }
    })
}
const bindFinish = () => {
    let container = e('#id-div-container')
    bindEvent(container, EventType.click, (event) => {
        let target = event.target
        if (target.classList.contains('todo-done')) {
            let todoDiv = target.parentElement
            toggleClass(todoDiv, 'done')
            saveTodos()
        }
    })
}
const bindEdit = () => {
    let editButtons = es('.todo-edit')
    bindEventAll(editButtons, EventType.click, (event) => {
        log('editButton click')
        let self = event.target
        inserteditTodo(self)
        
    })
   
}
const bindSubmit = () => {
    let submitButtons = es('.button-todo-submit')
    bindEventAll(submitButtons, EventType.click, (event) => {
        log(' submit click')
        let self = event.target
        let parent = self.parentElement
        let editInput = find(parent, '.input-todo-edit')
        let content = find(parent, '.todo-content')
        // log('content', content)
        // log('value', editInput.value)
        content.innerHTML = editInput.value
        saveTodos()
    })  
}

const bindEvents = () => {
    bindAdd()
    bindDel()
    bindFinish()
    bindEdit()
    bindSubmit()
}

const __main = () => {
    loadTodos()
    bindEvents()
}
__main()