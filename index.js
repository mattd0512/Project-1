const game = document.getElementById('canvas')
const obs = document.getElementById('obstacle')
const ctx = game.getContext('2d')

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])

const gravity = 0.5

// player creation
class Player {
    constructor() {
        this.position = {
            x: 20,
            y: 180
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 50
        this.height = 80
    }
    build() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.build()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y +this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

const player = new Player()

// gravity and player movement
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
}
animate()

addEventListener('keydown', ({keyCode}) => {
    switch (keyCode) {
        case 65:
        case 37:
            console.log('left')
            player.velocity.x -= 20
            break
         
        case 83:
        case 40:
            console.log('down')
            player.velocity.y += 15
            break
        case 68:
        case 39:
            console.log('right')
            player.velocity.x += 10
            break   
        case 87:
        case 38:
            console.log('up')
            player.velocity.y -= 25
            break
    }
})

addEventListener('keyup', ({keyCode}) => {
    switch (keyCode) {
        case 65:
        case 37:
            console.log('left')
            player.velocity.x = 0
            break
         
        case 83:
        case 40:
            console.log('down')
            player.velocity.y = 0
            break
        case 68:
        case 39:
            console.log('right')
            player.velocity.x = 0
            break   
        case 87:
        case 38:
            console.log('up')
            player.velocity.y = 0
            break
    }
})

let frameCount = 1;
let obsCount = frameCount;
const obsXCoors = [];

const nextFrame = () => {
    frameCount++;
    for (let i = 0; i < obsCount; i++) {
        obsXCoor = Math.floor(Math.random() * (1165 - 40 + 1) + 140);
        obsXCoors.push(obsXCoor);
    } 
}


