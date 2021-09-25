function main() {
  document.addEventListener('scroll', () => {
    //console.log(window.scrollY)
  })

  const name = document.getElementById('name')!
  'Tyler Schloesser'.split('').forEach((c) => {
    const span = document.createElement('span')
    span.innerText = c
    name.appendChild(span)
  })
}

main()
