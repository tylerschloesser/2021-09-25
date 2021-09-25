

async function main() {

  const canvas = document.querySelector('canvas')!
  const context = canvas.getContext('2d')!


  const w = canvas.width
  const h = canvas.height

  context.fillStyle = '#333'
  context.fillRect(0, 0, w, h)

}

main()
