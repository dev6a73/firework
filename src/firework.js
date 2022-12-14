let index = 0
const start = Date.now()
let time = _ => (Date.now()-start);

let r = Math.random()*256
let g = Math.random()*256
let b = Math.random()*256

// 무작위 색
resetColor = color => {
    r = Math.random()*256
    g = Math.random()*256
    b = Math.random()*256
}

class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.px = x
        this.py = y
        this.size = 5
        this.index = index++
        this.alpha = 0xff
        this.color = [
            noise(x)>.5?r:255-r+noise(0, x)*32-16,
            noise(x)>.5?g:255-g+noise(0, x)*32-16,
            noise(x)>.5?b:255-b+noise(0, x)*32-16
        ]
        this.driection = Math.PI*3/2+noise(x, y)-.5
        this.time = 0
        this.speed = 10
        this.wait = -Math.random()/8
        this.state = 0
        this.height = noise(x, y)
    }
    render(prev) {
        // render
        fill(...this.color, this.alpha)
        circle(this.x, this.y, this.size)
    }
    update(remove) {
        // this.wait 초 기다림
        if (this.wait < 0) {
            this.wait+=deltaTime/1000
            return;
        }

        // 위치 바꿈
        this.x += cos(this.driection)*this.speed
        this.y += sin(this.driection)*this.speed

        // 터질곳에 갔을때
        if (this.time > this.height) {
            // 무작위 위치
            if (this.state == 0) {
                this.state = 1
                this.speed = Math.random()*2+8
                this.driection = Math.random()*TAU
                this.x += Math.random()*10-5
                this.y += Math.random()*10-5
            }
            this.size += deltaTime*.01
            this.speed -= 0.02*deltaTime
            this.alpha = this.speed * 0xff / 10
            if (this.time > this.height+.5) {
                remove()
            }
        }
        if (this.y < 0) {
            remove()
        }
        this.py = this.y
        this.time += deltaTime/1000
    }
}