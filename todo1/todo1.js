const log = console.log.bind(console)

const e = (selector) =>  document.querySelector(selector)

const es = (selector) => document.querySelectorAll(selector)

// findAll 函数可以查找 element 的所有子元素
const findAll = (element, selector) => {
    return element.querySelectorAll(selector)
}

const now = () => {
    let d = new Date()
    let nm = d.getFullYear()
    let yt = d.getMonth() + 1
    let ri = d.getDate()
    let ui = d.getHours()
    let ff = d.getMinutes()
    let mc = d.getSeconds()

    return `${nm}/${yt}/${ri} ${ui}:${ff}:${mc}`
}

const appendHtml = (element, html) => {
    element.insertAdjacentHTML('beforeend', html)
}

const bindEvent = (element, eventName, callback) => {
    element.addEventListener(eventName, callback)
}

const insertTodo = (todo, time, done) => {
    // 添加到 container 中 
    let container = e('#id-div-container')
    let t = templateTodo(todo, time, done)
    appendHtml(container, t)
}

const templateTodo = (todo, time, done) => {
    let status = done ? 'done' : ''
    let t = `
         <div class='todo-cell ${status}' >
            <span class='todo-now'>${time}</span>
            <button class='todo-done'>完成</button>
            <button class='todo-delete'>删除</button>
            <span class='todo-content' contenteditable='true'>${todo}</span>
         </div>`
    return t
}

const toggleClass = (element, className) => {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

const save = (array) => {
    var s = JSON.stringify(array)
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
        let content = findAll(c, 'span')[1].innerHTML
        let todo = {
            time: time,
            done: done,
            content: content,
        }
        // 添加到数组中
        todos.push(todo)
    }
    // 保存数组
    save(todos)
}
const loadTodos = () => {
    let todos = load()
    // 添加到页面中
    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i]
        insertTodo(todo.content, todo.time, todo.done)
    }
}

const bindEvents = () => {
    let addButton = e('#id-button-add')
    bindEvent(addButton, 'click', () => {
        log('addButton click')
        // 获得 input.value
        let inputButton = e('#id-input-todo')
        let todo = inputButton.value
        let time = now()
        // 添加到 container 中 默认没有完成（done 为布尔值）
        insertTodo(todo, time, false)
    })

    let container = e('#id-div-container')
    //需要用到事件委托的方式绑定事件 
    bindEvent(container, 'click', (event) => {
        // log('container click', event, event.target)
        let target = event.target
        if (target.classList.contains('todo-done')) {
            log('done')
            //找到它的的父元素 <div class='todo-cell'> 删掉它
            let todoDiv = target.parentElement
            toggleClass(todoDiv, 'done')
            saveTodos()
        } else if (target.classList.contains('todo-delete')) {
            log('delete')
            let todoDiv = target.parentElement
            todoDiv.remove()
            saveTodos()
        }
    })
    
}

const __main = () => {
    loadTodos()
    bindEvents()
}
__main()