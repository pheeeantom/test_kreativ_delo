import { resultScreen } from './templates.js'
import { highlightVowels } from './utils.js'

export function getQuestionEls() {
  return {
    screen: document.querySelector('.screen'),
    order: document.querySelector('#order'),
    input: document.querySelector('.question .answer__input'),
    button: document.querySelector('.question .answer__button'),
    iconIdle: document.querySelector('.answer__icon--idle'),
    iconActive: document.querySelector('.answer__icon--active'),
    image: document.querySelector('.question__image'),
    label: document.querySelector('.answer__label'),
    navItems: [...document.querySelectorAll('.nav .nav__item')],
    cancel: document.querySelector('.cancel-button'),
  }
}

export function setSubmitEnabled(el, active) {
  el.iconIdle.style.display = active ? 'none' : 'block'
  el.iconActive.style.display = active ? 'block' : 'none'
  el.button.disabled = !active
}

export function renderQuestion(el, item, order) {
  el.input.value = ''
  el.image.src = item.img
  el.image.alt = item.name
  el.label.textContent = `Напечатай: ${item.name}`
  el.order.value = String(order)

  el.navItems.forEach((navItem, i) => {
    navItem.classList.toggle('nav__item--completed', i < order)
    navItem.classList.toggle('nav__item--current', i === order)
  })

  setSubmitEnabled(el, false)
}

export function renderResults(screen, items, onRestart) {
  screen.innerHTML = resultScreen(items)
  screen.querySelector('.cancel-button').addEventListener('click', onRestart)
  highlightVowels(screen)
}