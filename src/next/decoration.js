const pixelRatio = window.devicePixelRatio

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')

const agents = [{
  life: Math.random() * 40,
  angle: Math.PI * 2 * Math.random(),
  x: Math.random() * window.innerWidth * pixelRatio,
  y: Math.random() * window.innerHeight * pixelRatio
}]

function step (time = 0) {
  window.requestAnimationFrame(step)

  agents.forEach(agent => {
    agent.angle += Math.random() * 0.4 - 0.2

    const dx = Math.sin(agent.angle) * pixelRatio * 2
    const dy = Math.cos(agent.angle) * pixelRatio * 2

    agent.x += dx
    agent.y += dy

    agent.life--

    if (agent.x < 0) {
      agent.x = window.innerWidth * pixelRatio
    }

    if (agent.x > window.innerWidth * pixelRatio) {
      agent.x = 0
    }

    if (agent.y < 0) {
      agent.y = window.innerHeight * pixelRatio
    }

    if (agent.y > window.innerHeight * pixelRatio) {
      agent.y = 0
    }

    const sample = context.getImageData(agent.x, agent.y, 1, 1)
    const alpha = sample.data[3]
    const available = alpha <= 0

    context.save()
    context.translate(agent.x, agent.y)
    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(-dx, -dy)
    context.stroke()
    context.restore()

    if (agent.life <= 0 || !available) {
      const count = 2
      const spread = Math.random() * Math.PI / 4

      agents.splice(agents.indexOf(agent), 1)

      if (available && agents.length < 20) {
        for (let i = 0; i < count; i++) {
          const angle = (agent.angle - spread / 2) + (i / (count - 1)) * spread

          agents.push({
            life: Math.random() * 10 + 5,
            x: agent.x,
            y: agent.y,
            angle
          })
        }
      }
    }
  })
}

window.addEventListener('load', () => {
  document.body.appendChild(canvas)
  canvas.width = window.innerWidth * pixelRatio
  canvas.height = window.innerHeight * pixelRatio
  context.strokeStyle = 'rgba(255, 255, 255, 0.6)'
  context.lineWidth = pixelRatio * 1
  step()
})
