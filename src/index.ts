import random from 'lodash/random'

function main() {
  const name = document.getElementById('name')!
  'Tyler Schloesser'.split('').forEach((c) => {
    const span = document.createElement('span')
    span.innerText = c
    span.dataset.dx = random(100).toString()
    span.dataset.dy = random(100).toString()
    span.dataset.dr = random(100).toString()

    name.appendChild(span)
  })

  // fixes some weird ass chrome bug.
  // really, try removing this.
  document.getElementById('name-container')!.style.height = '100%'
}

main()
