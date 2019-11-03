/*
spa  ：
    网易云音乐
    手机上需求，节省流量，速度变快，体验变好（类似原生程序）还可以在界面上放动画

    four  page:
        1, add todo
        2, show todo
        3, edit todo
        4, show todos(todo list)
 */
/*
    1, add page
        - write page
        - give  btn bindEvent
        - require input value
        - add a todo
        - save todo
 */
const bindAdd = () => {
    let btn = e('#id-btn-add')
    bindEvent(btn, 'click', (event) => {
        log('click add')
        let input = e('#id-input-task')
        let task = input.value
        log('task', task)
        let todo = todoNew(task)
        saveTodo(todo)
    })
}
const pushState = className => {
    let state = {
        page: className,
    }
    // 切换 地址栏信息
    let url = 'index.html?page=' + className
    history.pushState(state, 'title', url)
    // 手动 修改 title
    document.title = className
}
const showPage = className => {
    let pages = es('.gua-page')
    for (let p of pages) {
        p.classList.add('gua-hide')
    }
    let seletor = '.' + className
    let newDiv = e(seletor)
    newDiv.classList.remove('gua-hide')
    insertTodoList(className)
}

const bindBtnTabs = () => {
    let btns = es('.todo-tab')
    bindAll(btns, 'click', event => {
        log('click btns tabs')
        let btn = event.target
        let page = btn.dataset.page
        log('page', page)
        showPage(page)
        // 改变 history.state
        pushState(page)
    })
}
// 用户点击 前进 后退 按钮的时候, 会触发 window 的 popstate 事件
const bindPopstate = () => {
    bindEvent(window, 'popstate', event => {
        let state = event.state
        // state 就是 pushState 的第一个参数
        log('pop state', state)
        let pageName = state.page
        showPage(pageName)
    })
}
const bindDelFin = () => {
    // todo-edit
    let edit = e('.todo-edit')
    bindEvent(edit, 'click', event => {
        let target = event.target
        let cell = target.parentElement
        let id = parseInt(cell.dataset.todoid)
        if (target.classList.contains('todo-delete')) {
            // client delete
            cell.remove()
            // serve delete
            todoDelete(id)
        } else if (target.classList.contains('todo-done')) {
            // client finish
            toggleClass(cell, 'done')
            // serve finish
            todoFinish(id)
        }
    })
}
const bindUpt = () => {
    // todo-edit
    let edit = e('.todo-edit')
    bindEvent(edit, 'click', event => {
        let target = event.target
        let cell = target.parentElement
        if (target.classList.contains('edit')) {
            // client edit
            let content = find(cell, '.todo-content')
            content.setAttribute('contenteditable', 'true')
            content.focus()
        }
    })
    edit.addEventListener('blur', event => {
        log('edit blur', event, event.target)
        let target = event.target
        if (target.classList.contains('todo-content')) {
            let cell = target.parentElement
            // log('cell', cell)
            let id = parseInt(cell.dataset.todoid)
            // log('id', id)
            let form = {
                id,
            }
            // client update
            target.setAttribute('contenteditable', 'false')
            // 阻止默认行为的发生, 也就是不插入回车
            event.preventDefault()
            form.content = target.innerHTML
            // server update
            todoUpdate(form)
        }
    }, true)
}
const initApp = () => {
    // 根据 初始地址栏 参数 显示页面
    let querys = location.search
    // log('querys', querys)
    let [k, v] = querys.slice(1).split('=')
    // 默认 page 是 'show'
    let page = 'todo-show'
    // 设置 合法 的 page 参数集合
    let validPages = ['todo-show', 'todo-new', 'todo-edit', 'todo-detail']
    if (k == 'page') {
        if (validPages.includes(v)) {
            page = v
        }
    }
    log('page', page)
    showPage(page)
}
const bindDetail = () => {
    let detail = e('.todo-detail')
    bindEvent(detail, 'click', event => {
        log('click  detail')
        let target = event.target
        if (target.classList.contains('btn-detail')) {
            let cell = target.parentElement
            let span =  find(cell, '.todo-detail')
            toggleClass(span, 'gua-hide')
        }
    })
}
const bindEvents = () => {
    // pop state
    bindPopstate()
    // 切换 page
    bindBtnTabs()
    // add
    bindAdd()
    // delete  finish
    bindDelFin()
    // update
    bindUpt()
    // detail
    bindDetail()
}

const __main = () => {
    // init
    initApp()
    // events
    bindEvents()
}
__main()