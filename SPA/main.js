const showPage = (className) => {
    let pages = es('.todo-page')
    for (let v of pages) {
        v.classList.add('todo-hide')
    }
    //给todo-new 删掉 todo-hide
    let selector = '.' + className
    let container = e(selector)
    container.classList.remove('todo-hide')
    let validNames = ['todo-list', 'todo-edit', 'todo-detail']
    if (validNames.includes(className)) {
        showTodoList()
    }
}
const pushState = (className) => {
    // 切换地址栏信息
    let url = 'todoSPA.html?page=' + className
    let state = {
        page: className,
    }
    history.pushState(state, 'title', url)
    document.title = className
}

const initApp = () => {
    // 根据地址栏参数 显示不同的页面
    let querys = location.search
    let [k, v] = querys.slice(1).split('=')
    let page = 'todo-list'
    //排除干扰
    let validPages = ['todo-list', 'todo-new', 'todo-edit', 'todo-detail']
    if (k == 'page' && validPages.includes(v)) {
        page = v
    }
    showPage(page)
}

const bindAdd = () => {
    let btn = e('#id-button-add')
    bindEvent(btn, EventType.click, (event) => {
        log('click add')
        //获取 input 的值
        let input = e('#id-input-task')
        let task = input.value
        let time = now()
        // 创建一个 todo 对象
        let todo = todoNew(time, task)
        // 保存 todo
        saveTodo(todo)
    })
}
const bindDelete = () => {
    let edit = e('.todo-edit')
    bindEvent(edit, EventType.click, (event) => {
        log('click edit')
        let self = et(event)
        let btn = self.target
        if (btn.classList.contains('todo-delete')) {
            let cell = btn.parentElement
            cell.remove()
            saveEditTodos()
        }
    })
     
}
const bindComplete = () => {
    let edit = e('.todo-edit')
    bindEvent(edit, EventType.click, (event) => {
        log('click edit')
        let self = et(event)
        let btn = self.target
        if (btn.classList.contains('todo-complete')) {
            let cell = btn.parentElement
            let className = 'todo-done'
            toggleClass(cell, className)
            saveEditTodos()
        }
    })
}

const bindTabs = () => {
    //切换页面
    let tabs = es('.todo-tab')
    bindAll(tabs, EventType.click, (event) => {
        log('click tab')
        // data-page=todo-new
        let self = et(event)
        let button = self.target
        let page = button.dataset.page
        let className = page
        showPage(className)
        pushState(className)
    })
}
const bindToggleDetails = () => {
    let detail = e('.todo-detail')
    bindEvent(detail, EventType.click, (event) => {
        log('click toggle detail')
        let self = et(event)
        let btn = self.target
        if (btn.classList.contains('btn-detail')) {
            let className = 'todo-hide'
            let p = btn.parentElement
            // log('p', p)
            let content = find(p, 'span')
            toggleClass(content, className)
        }
    })
}
const bindPopstate = () => {
    window.addEventListener(EventType.popstate, (event) => {
        log('pop state')
        let self = et(event)
        let state = self.state
        let pageName = state.page
        log('pop state', state, pageName)
        showPage(pageName)
    })
}

const bindEvents = () => {
    // add
    bindAdd()
    // delete
    bindDelete()
    // complete
    bindComplete()

    bindTabs()
    bindPopstate()
    bindToggleDetails()
}
const __main = () => {
    // init
    initApp()
    // ets
    bindEvents()
}
__main()