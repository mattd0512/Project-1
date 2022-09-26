const game = document.getElementById('canvas')
const movement = document.getElementById('movement')

const ctx = game.getContext('2d')

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])

let frame = 0;
let score = 0;
let gamespeed = 2;

const gravity = 1

// CHARACTER CREATION

class Character {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 30
        this.height = 30
    }

    draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0
        }
}
   
// CHARACTER MOVEMENT

addEventListener('keydown', ({keyCode}) => {
    switch (keyCode) {
        case 65:
            character.velocity.x -= 5
            break
        case 68:
            character.velocity.x += 5
            break
        case 87:
            character.velocity.y -= 20
            break
    }
})

addEventListener('keyup', ({keyCode}) => {
    switch (keyCode) {
        case 65:
            character.velocity.x = 0
            break
        case 68:
            character.velocity.x = 0
            break
        case 87:
            character.velocity.y -= 0
            break
    }
})

// OBSTACLE CREATION

const obstaclesArray = [];

class Obstacle {
    constructor() {
        this.top = (Math.random() * canvas.height/3) + 20
        this.bottom = (Math.random() * canvas.height/3) + 20
        this.x = canvas.width
        this.width = 50
        this.color = 'grey'
        this.counted = false;
    }
    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, 0, this.width, this.top)
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom)
    }
    update() {
        this.x -= gamespeed
        if (!this.counted && this.x < character.x){
            score++;
            this.counted = true;
        }
        this.draw()
    }
}

function handleObstacles() {
    if (frame%150 === 0) {
        obstaclesArray.unshift(new Obstacle)
    }
    for (let i = 0; i < obstaclesArray.length; i++) {
        obstaclesArray[i].update()
    }
    if (obstaclesArray.length > 20) {
        obstaclesArray.pop(obstaclesArray[0])
    }
}

// function handleCollision(){
//     for(let i = 0; i < Obstacle; i++){
//         if (character.x < Obstacle.x + Obstacle.width && 
//             character.x + character.width > Obstacle.x &&
//             ((character.y > 0 + Obstacle.top && character.y + character.height > 0) ||
//             (character.y > canvas.height - Obstacle.bottom &&
//             character.y + character.height < canvas.height))){
//                 console.log('hit')
//                 return true;
//             }
//     }
// }


const character = new Character()

function animate () {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    character.update()
    ctx.fillStyle = 'black'
    ctx.font = '90px Georgia'
    ctx.strokeText(score, 450, 70)
    ctx.fillText(score, 450, 70)
    handleObstacles()
    frame++
}

animate()



