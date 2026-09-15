import { arr } from './data.js'
import { shuffle } from './utils.js'
import {
  getQuestionEls,
  setSubmitEnabled,
  renderQuestion,
  renderResults,
} from './ui.js'

export function startGame() {
  const el = getQuestionEls()

  arr.forEach((item) => {
    delete item.passed
    delete item.answer
  })

  shuffle(arr)
  renderQuestion(el, arr[0], 0)

  el.input.addEventListener('input', () => {
    setSubmitEnabled(el, el.input.value.length > 0)
  })

  el.input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && el.input.value.length > 0) {
      e.preventDefault()
      submit()
    }
  })

  el.button.addEventListener('click', submit)
  el.cancel.addEventListener('click', restart)

  function submit() {
    const order = Number(el.order.value)
    const current = arr[order]
    const value = el.input.value.trim().toUpperCase()

    current.answer = value
    current.passed = value === current.name.toUpperCase()

    const next = order + 1
    if (next >= arr.length) {
      renderResults(el.screen, arr, restart)
      return
    }
    renderQuestion(el, arr[next], next)
  }

  function restart() {
    window.location.reload()
  }
}