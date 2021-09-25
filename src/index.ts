

type Vec2 = [number, number]

interface State {
  p: Vec2
  v: Vec2
}

interface Viewport {
  context: CanvasRenderingContext2D
  w: number
  h: number
}

function drawCircle({ context }: Viewport, c: Vec2, r: number) {
  context.beginPath()
  context.arc(c[0], c[1], r, 0, 2 * Math.PI)
  context.fill()
}

function blink(viewport: Viewport, state: State, timestamp: number) {

  const dt = timestamp % 2000
  if (dt > 1000) {
    return
  }
  const scale = dt / 1000

  viewport.context.fillStyle = `rgba(255,255,255,${(1-scale) * .4})`
  drawCircle(viewport, [0, 0], 10 + 10 * scale)
}

function draw(viewport: Viewport, state: State, timestamp: number) {


  const { context, w, h } = viewport

  context.clearRect(0, 0, w, h)
  context.fillStyle = '#333'
  context.fillRect(0, 0, w, h)

  context.strokeStyle = 'white'
  context.beginPath()
  for (let i = 0; i < 10; i++) {
    context.moveTo(0, i * (h / 10))
    context.lineTo(w, i * (h / 10))

    context.moveTo(i * (w / 10), 0)
    context.lineTo(i * (w / 10), h)
  }
  context.stroke()

  context.translate(w/2, h/2)
  blink(viewport, state, timestamp)

  context.fillStyle = 'white'
  drawCircle(viewport, [0, 0], 10)

  context.resetTransform()

  context.font = '10px monospace'
  context.textBaseline = 'top'
  context.fillText(`[${state.p[0].toFixed(2)}, ${state.p[1].toFixed(2)}]`, 0, 0)

}

async function main() {

  const canvas = document.querySelector('canvas')!
  const context = canvas.getContext('2d')!


  const w = canvas.width
  const h = canvas.height

  console.log({ w, h })


  let state: State = {
    p: [0, 0],
    v: [1, 0],
  }

  const viewport: Viewport = { context, w, h }

  let last = performance.now()


  const game = (timestamp: number) => {
    const elapsed = timestamp - last
    last = timestamp

    state = {
      ...state,
      p: [
        state.p[0] + state.v[0] * (elapsed / 1000),
        state.p[1] + state.v[1] * (elapsed / 1000),
      ],
    }

    draw(viewport, state, timestamp)
    window.requestAnimationFrame(game)
  }
  window.requestAnimationFrame(game)
}

main()
