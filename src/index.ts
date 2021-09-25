import { clamp } from 'lodash'

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

  viewport.context.fillStyle = `rgba(255,255,255,${(1 - scale) * 0.4})`
  drawCircle(viewport, [0, 0], 10 + 10 * scale)
}

function draw(viewport: Viewport, state: State, timestamp: number) {
  const { context, w, h } = viewport

  context.clearRect(0, 0, w, h)
  context.fillStyle = '#333'
  context.fillRect(0, 0, w, h)

  context.strokeStyle = 'white'
  context.beginPath()
  context.translate((state.p[0] % (w / 10)) * -1, (state.p[1] % (h / 10)) * -1)
  for (let i = -1; i <= 11; i++) {
    context.moveTo(-w / 10, i * (h / 10))
    context.lineTo(w + w / 10, i * (h / 10))

    context.moveTo(i * (w / 10), -h / 10)
    context.lineTo(i * (w / 10), h + h / 10)
  }
  context.stroke()
  context.resetTransform()

  context.translate(w / 2, h / 2)
  blink(viewport, state, timestamp)

  context.fillStyle = 'white'
  drawCircle(viewport, [0, 0], 10)

  context.resetTransform()

  context.font = '10px monospace'
  context.textBaseline = 'top'
  context.fillText(`[${state.p[0].toFixed(2)}, ${state.p[1].toFixed(2)}]`, 0, 0)

  context.fillText(
    `[${state.v[0].toFixed(2)}, ${state.v[1].toFixed(2)}]`,
    0,
    20,
  )
}

async function main() {
  const canvas = document.querySelector('canvas')!
  const context = canvas.getContext('2d')!

  const w = canvas.width
  const h = canvas.height

  console.log({ w, h })

  let state: State = {
    p: [0, 0],
    v: [10, 5],
  }

  const viewport: Viewport = { context, w, h }

  let last = performance.now()

  document.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault()

      state = {
        ...state,
        v: [
          clamp(state.v[0] + e.deltaX / 10, -100, 100),
          clamp(state.v[1] + e.deltaY / 10, -100, 100),
        ],
      }
    },
    { passive: false },
  )

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
