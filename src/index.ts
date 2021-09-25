import random from 'lodash/random'

function main() {
  const name = document.getElementById('name')!

  const letters = 'Tyler Schloesser'.split('').map((c) => {
    const span = document.createElement('span')
    span.classList.add('letter')
    span.innerHTML = c === ' ' ? '&nbsp;' : c
    span.dataset.dx = random(100).toString()
    span.dataset.dy = random(100).toString()
    span.dataset.dr = random(100).toString()

    name.appendChild(span)

    return span
  })

  // fixes some weird ass chrome bug.
  // really, try removing this.
  document.getElementById('name-container')!.style.height = '100%'

  const start = performance.now()
  const duration = 1000

  const shift = (timestamp: number) => {
    const elapsed = timestamp - start
    let dt = elapsed / duration

    if (dt >= 1) {
      letters.forEach((span) => {
        span.style.transform = ''
      })
      return
    }

    const scale = 1 - dt
    letters.forEach((span) => {
      const dx = (1 - parseInt(span.dataset.dx!) / 50) * 20
      const dy = (1 - parseInt(span.dataset.dy!) / 50) * 20
      const dr = parseInt(span.dataset.dr!) / 100

      const translate = `translate(${dx * scale}vmin, ${dy * scale}vmin)`
      const rotate = `rotate(${dr * scale * Math.PI * 2}rad)`
      span.style.transform = `${translate} ${rotate}`
    })

    window.requestAnimationFrame(shift)
  }
  window.requestAnimationFrame(shift)
}

main()
