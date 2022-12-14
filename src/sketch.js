let stars
let canvas
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  noStroke();
  fill(0, 0, 0)
  stars = Array(windowWidth*windowHeight/2500|0).fill(0).map((v, i)=>[Math.random()*windowWidth, Math.random()*windowHeight, Math.random()*255, Math.random()*8]);
}

let positions = [];

function draw() {
  background(0, 20);
  const black = color(191*time_, 255*time_, 255*time_)
  const blue = color(0+127*time_, 32+191*time_, 63+255*time_)
  const orange = color(255*time_, 127*time_, 0)

  // 배경
  for (let i = 0; i < windowHeight; i++) {
    stroke(lerpColor(lerpColor(black, blue, i/windowHeight), orange, 1-(2*time_-1)**2-(i/windowHeight-1.5)**2))
    line(0, i, windowWidth, i)
  }

  // 별
  if (time_<.5)
    stars.forEach(v=>{
      stroke(v[2]/2+128, 191+v[2]/4, 256-v[2]/2)
      strokeWeight(v[3]) 
      point(v[0], v[1])
    })
  noStroke();
  
  // particle
  positions.forEach((v, i)=>v.update(_ => delete positions[i]))
  positions.forEach((v, i)=>v.render(positions[i-1]??0))
  if (positions.every(v=>!v)) {
    positions.length = 0
  }
  positions = positions.filter(v => v)
}

function mouseClicked() {
  // console.log(time_)
  if (time_>0) return
  resetColor()
  for (let i = 0; i < 100; i++) {
    const a = Math.random()*windowWidth
    setTimeout(_=>{
      for (let j = 0; j < 100; j++)
      positions.push(new Particle(a, windowHeight));
    }, i*100)
  }
}

