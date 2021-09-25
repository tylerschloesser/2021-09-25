import clamp from 'lodash/clamp'

type Vec2 = [number, number]

interface State {
  p: Vec2
  v: Vec2
  r: number
}

interface Viewport {
  context: CanvasRenderingContext2D
  w: number
  h: number
  scale: number
}

function drawCircle({ context }: Viewport, c: Vec2, r: number) {
  context.beginPath()
  context.arc(c[0], c[1], r, 0, 2 * Math.PI)
  context.fill()
}

function blink(viewport: Viewport, state: State, timestamp: number) {
  let dt = timestamp % 2000
  if (dt > 1000) {
    return
  }
  dt /= 1000

  viewport.context.fillStyle = `rgba(255,255,255,${(1 - dt) * 0.4})`
  drawCircle(
    viewport,
    [0, 0],
    viewport.scale * state.r + viewport.scale * state.r * dt,
  )
}

function draw(viewport: Viewport, state: State, timestamp: number) {
  const { context, w, h, scale } = viewport

  context.clearRect(0, 0, w, h)
  context.fillStyle = '#333'
  context.fillRect(0, 0, w, h)

  const lineScale = scale * 10
  const lineCount = [Math.floor(w / lineScale), Math.floor(h / lineScale)]

  context.strokeStyle = 'white'
  context.beginPath()
  context.translate(
    (state.p[0] % lineScale) * -1,
    (state.p[1] % lineScale) * -1,
  )
  context.strokeStyle = '#555'
  context.lineWidth = 2

  for (let i = -1; i <= lineCount[0] + 1; i++) {
    context.moveTo(i * lineScale, -lineScale)
    context.lineTo(i * lineScale, h + lineScale)
  }
  for (let i = -1; i <= lineCount[1] + 1; i++) {
    context.moveTo(-lineScale, i * lineScale)
    context.lineTo(w + lineScale, i * lineScale)
  }
  context.stroke()
  context.resetTransform()

  context.translate(w / 2, h / 2)
  blink(viewport, state, timestamp)

  context.fillStyle = 'white'
  drawCircle(viewport, [0, 0], scale * state.r)

  context.resetTransform()

  context.font = `${scale * 4}px monospace`
  context.textBaseline = 'top'
  context.fillText(
    `p: [${state.p[0].toFixed(2)}, ${state.p[1].toFixed(2)}]`,
    0,
    0,
  )

  context.fillText(
    `v: [${state.v[0].toFixed(2)}, ${state.v[1].toFixed(2)}]`,
    0,
    viewport.scale * 4 * 1.5,
  )
}

async function main() {
  const canvas = document.querySelector('canvas')!
  const context = canvas.getContext('2d')!

  const w = (canvas.width = canvas.clientWidth)
  const h = (canvas.height = canvas.clientHeight)

  const scale = Math.min(w, h) / 100

  console.log({ w, h, scale })

  let state: State = {
    p: [0, 0],
    v: [100, 0],
    r: 4,
  }

  const viewport: Viewport = { context, w, h, scale }

  let last = performance.now()

  document.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault()

      state = {
        ...state,
        v: [
          clamp(state.v[0] + e.deltaX / 10, -200, 200),
          clamp(state.v[1] + e.deltaY / 10, -200, 200),
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
