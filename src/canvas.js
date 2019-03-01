import utils from "./utils"

const gravity = 1
const friction = .8
const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"]

// Event Listeners
addEventListener("mousemove", event => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener("resize", () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  init()
})

// Objects
function GolfBall(x, y, velocityY, radius, color,velocityX=0) {
  this.x = x
  this.y = y
  this.velocityY = velocityY
  this.velocityX = velocityX
  this.radius = radius
  this.color = color
}

Object.prototype.draw = function() {
  c.beginPath()
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  c.fillStyle = this.color
  c.fill()
  c.closePath()
}

Object.prototype.update = function() {
  if(this.y + this.radius > canvas.height)this.velocityY = -this.velocityY * friction
  else this.velocityY += gravity
  if(this.velocityY === -0 || this.velocityY.toString().split("").includes("e")){
    this.velocityY = 0
    this.ready = true
  }
  if(this.x + this.radius > canvas.width)this.velocityX = -this.velocityX * 0

  this.y += this.velocityY
  this.x += this.velocityX
  console.log(this.velocityY)
  console.log(this.velocityX)
  this.draw()
}

// Implementation
let ball
function init() {
  ball = new GolfBall(canvas.width/2,canvas.height/2,1,10,"black")
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  ball.update()
  c.fillText("GolfWorld", mouse.x, mouse.y)
  // objects.forEach(object => {
  //  object.update()
  // })
}

init()
animate()
