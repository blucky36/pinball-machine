import utils from "./utils"

const gravity = 1
const floorFriction = .95

const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")


canvas.width = innerWidth - 100
canvas.height = innerHeight - 100

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
  if(this.y + this.radius+10 > canvas.height){
    this.velocityY = -this.velocityY * floorFriction
    this.velocityX = this.velocityX * floorFriction
  }
  else this.velocityY += gravity
  if(this.velocityY === -0 || this.velocityY.toString().split("").includes("e")){
    this.velocityY = 0
    this.ready = true
    this.moving = false
  }
  if(this.x + this.radius + 10 > canvas.width)this.velocityX = -this.velocityX
  if(this.x + this.radius + 10 < 50) this.velocityX = -this.velocityX * .95

  this.y += this.velocityY
  this.x += this.velocityX
  // console.log(this.velocityY)
  // console.log(this.velocityX)
  this.draw()
}

// Implementation
let ball
function init() {
  ball = new GolfBall(100,canvas.height/2,1,10,"black")
}

let charCode
document.onkeydown = (e) => {
  charCode = e.keyCode
  console.log(charCode,e.code)
  if(charCode === 38||charCode === 87){//up
    ball.velocityY += 10
  }
  // if(charCode === 115){//down
  //   ball.velocityY -= 10
  // }
  if(charCode === 37||charCode === 65){//left
    ball.velocityX -= 10
  }
  if(charCode === 39||charCode === 68){//right
    ball.velocityX += 10
  }
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
