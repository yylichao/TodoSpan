const log = console.log.bind(console)

const e = (selector) =>  document.querySelector(selector)

const es = (selector) => document.querySelectorAll(selector)

const EventType = {
    click: 'click',
    popstate: 'popstate',
    mouseover: 'mouseover',
    mouseout: 'mouseout',
}

const find = (element, selector) => {
   return  element.querySelector(selector)
}
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
const bindEventAll = (elements, eventName, callback) => {
    for (let v of elements) {
        bindEvent(v, eventName, callback)
    }
}

const toggleClass = (element, className) => {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}
