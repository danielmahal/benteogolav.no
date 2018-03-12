const pixelRatio = window.devicePixelRatio

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')

const agents = [{
  life: Math.random() < 0.2 ? Math.random() * 200 + 100 : Math.random() * 5,
  angle: Math.PI * 2 * Math.random(),
  x: Math.random() * window.innerWidth * pixelRatio,
  y: Math.random() * window.innerHeight * pixelRatio
}]

function step (time = 0) {
  context.strokeStyle = `rgba(255, 255, 255, 0.3)`
  context.fillStyle = context.strokeStyle

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

    context.save()
    context.translate(agent.x, agent.y)

    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(-dx, -dy)
    context.stroke()

    if (Math.random() > 0.5) {
      const size = Math.random() * 10
      context.translate((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6)
      context.rotate(Math.random() * Math.PI * 2)
      context.beginPath()
      context.rect(-size / 2, -size / 2, size, size)
      context.fill()
    }

    context.restore()

    if (agent.life <= 0) {
      const count = 2
      const spread = Math.random() * Math.PI / 8

      agents.splice(agents.indexOf(agent), 1)

      if (agents.length < 20) {
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
  context.lineWidth = pixelRatio * 1
  step()
})
