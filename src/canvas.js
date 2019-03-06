import utils from "./utils"

const gravity = 1
const floorFriction = .95

const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")


canvas.width = innerWidth * .5
canvas.height = innerHeight * .9

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
  // canvas.width = innerWidth * .5
  // canvas.height = innerHeight * .9
  init()
})

// Objects an' things
function PinBall(x, y, velocityY, radius, color,velocityX=0){//constructor
  this.x = x
  this.y = y
  this.velocityY = velocityY
  this.velocityX = velocityX
  this.radius = radius
  this.color = color
}

PinBall.prototype.draw = function(){ //draws ball to canvas
  context.beginPath()
  context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  context.fillStyle = this.color
  context.fill()
  context.closePath()
}

PinBall.prototype.update = function() { //determines what happens to the ball
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

class Wall{
  constructor(x,y,color,width,height){
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
  }

  draw(){
    context.beginPath()
    context.lineWidth = "3"
    context.strokeStyle = this.color
    context.rect(this.x,this.y,this.width,this.height)
    context.stroke()
  }

  update(){
    this.draw()
  }

}

class PaddleLeft{
  constructor(color,width,height){
    this.moveX = 80   //bottom right x
    this.moveY = canvas.height - 100  //bottom right y
    this.line1x = 80  //top right x
    this.line1y = canvas.height - 120 //top right y
    this.line2x = 115 //
    this.line2y = canvas.height - 80
    this.line3x = 100
    this.line3y = canvas.height - 80
    this.color = color
    this.width = width
    this.height = height
  }

  draw(){
    context.beginPath();
    context.lineWidth = "3"
    context.moveTo(this.moveX, this.moveY);
    context.lineTo(this.line1x,this.line1y)
    context.lineTo(this.line2x,this.line2y)
    context.lineTo(this.line3x,this.line3y)
    context.closePath();
    context.stroke();
  }

  update(){
    this.draw()
  }
}

class PaddleRight{
  constructor(moveX,moveY,lr,color,width,height){
    this.moveX = canvas.width - 125   //bottom right x
    this.moveY = canvas.height - 65  //bottom right y
    this.line1x = canvas.width - 125  //top right x
    this.line1y = canvas.height - 45 //top right y
    this.line2x = canvas.width - 50 //
    this.line2y = canvas.height - 125
    this.line3x = canvas.width - 70
    this.line3y = canvas.height - 125
    this.color = color
    this.width = width
    this.height = height
  }

  draw(){
    context.beginPath();
    context.lineWidth = "3"
    context.moveTo(this.moveX, this.moveY);
    context.lineTo(this.line1x,this.line1y)
    context.lineTo(this.line2x,this.line2y)
    context.lineTo(this.line3x,this.line3y)
    context.closePath();
    context.stroke();
  }

  update(){
    this.draw()
  }
}

// Implementation
let ball,paddleLeft,paddleRight,startWall//vars
function init() {

  startWall =
    new Wall(
      canvas.width - 50,  //starting x
      50,                 //starting y
      "black",            //color
      10,                 //width
      canvas.height - 50  //height
    )

  paddleRight =
    new PaddleRight(
      canvas.width/1.8,  // start x
      canvas.height/1.1, // start y
      "right",           //side of paddle
      "black",           //color
      100,               //width
      10                 //height
    )

  paddleLeft =
    new PaddleLeft(
      canvas.width/4,  //
      canvas.height/1.1, //
      "left",           //side of paddle
      "black",           //color
      100,               //width
      10                 //height
    )

  ball =
    new PinBall(
      canvas.width-20,  //location x
      canvas.height-20, //location y
      0,                //initial velocity
      4,                //width
      "black"           //color
    )
}

let charCode
document.onkeydown = (e) => { //usefull for movement based games but will need to refactor for paddles
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
  context.clearRect(0, 0, canvas.width, canvas.height)
  ball.update()
  startWall.update()
  paddleRight.update()
  paddleLeft.update()
  // context.fillText("GolfWorld", mouse.x, mouse.y)
  // objects.forEach(object => {
  //  object.update()
  // })
}

init()
animate()
