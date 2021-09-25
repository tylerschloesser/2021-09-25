function main() {
  document.addEventListener('scroll', () => {
    //console.log(window.scrollY)
  })

  const name = 'Tyler Schloesser'
  const nameContainer = document.createElement('div')

  name.split('').forEach((c) => {
    const span = document.createElement('span')
    span.innerText = c
    nameContainer.appendChild(span)
  })

  const root = document.getElementById('root')!
  root.appendChild(nameContainer)
}

main()
