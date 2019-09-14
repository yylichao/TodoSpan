const log = console.log.bind(console)

const e = selector => document.querySelector(selector)
const es = selector => document.querySelectorAll(selector)
const et = event => event || window.event

const find = (element, selector) => element.querySelector(selector)
const finds = (element, selector) => element.querySelectorAll(selector)

const EventType = {
    click: 'click',
    popstate: 'popstate',
}

const bindEvent = (element, eventName, callback) => {
    element.addEventListener(eventName, callback)
}

const bindAll = (elements, eventName, callback) => {
    for (let v of elements) {
        bindEvent(v, eventName, callback)
    }
}

const appendHtml = (element, html) => {
    element.insertAdjacentHTML('beforeend', html)
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

const toggleClass = (element, className) => {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}



const removeClassAll = (className) => {
    let selector = '.' + className
    let elements = document.querySelectorAll(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        e.classList.remove(className)
    }
}
