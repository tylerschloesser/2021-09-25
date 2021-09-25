

type Vec2 = [number, number]

interface State {
  p: Vec2
}

interface Viewport {
  context: CanvasRenderingContext2D
  w: number
  h: number
}

function draw(viewport: Viewport, state: State) {

  const { context, w, h } = viewport

  context.fillStyle = '#333'
  context.fillRect(0, 0, w, h)

}

async function main() {

  const canvas = document.querySelector('canvas')!
  const context = canvas.getContext('2d')!


  const w = canvas.width
  const h = canvas.height



  const state: State = {
    p: [0, 0],
  }

  const viewport: Viewport = { context, w, h }

  const game = (timestamp: number) => {
    draw(viewport, state)
    window.requestAnimationFrame(game)
  }
  window.requestAnimationFrame(game)
}

main()
