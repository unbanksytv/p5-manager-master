let colors = [];
let scl = 1;
let noiseScale = 9999;
let space = [3,3];
let thickness = [1,3];
let maxSegments = 1;
let alphaValue = 100;
let minRadius = 2;
let maxRadius = 10;
let zoff = 0;
let zIncrement = 0.01;

function setup() {
  createCanvas(3000, 2000);
  colors = [color('#29A691'), color('#DB4F54'), color('#3B2B20'), color('#FCD265'), color('#B8D9CE')];
  angleMode(DEGREES);
  noFill();
}

function draw() {
  background('#EBE4D8');
  
  let strokeCaps = [ROUND, SQUARE, PROJECT];
  let strokeJoins = [MITER, BEVEL, ROUND];
  
  for (let y=-height; y<height*2; y+=random(space[0]*scl, space[1]*scl)){
    for (let x=-width; x<width*2; x+=random(space[0]*scl, space[1]*scl)){  
      let v = createVector(x, y);
      let lastV = v.copy();
      const segments = noise(x/(noiseScale*scl), y/(noiseScale*scl), zoff) * maxSegments;
      const sw = round(noise(x/(noiseScale*scl), y/(noiseScale*scl), zoff) * max(thickness[0]*scl, thickness[1]*scl));
      strokeWeight(sw);
      strokeCap(random(strokeCaps));
      strokeJoin(random(strokeJoins));
      for (let seg=0; seg<segments; seg++){
        let lerpVal = noise(x/(noiseScale*scl), y/(noiseScale*scl), zoff);
        let c = colors[floor(lerpVal * colors.length)];
        c.setAlpha(alphaValue * noise(x/(noiseScale*scl), y/(noiseScale*scl), zoff));
        stroke(c);
        beginShape();
        for (let i=0; i<random(2,5); i++){
          const d = 360*noise(v.x/(noiseScale*scl), v.y/(noiseScale*scl), zoff);
          const dir = p5.Vector.fromAngle(d).setMag(3*scl);
          lastV = v.copy();
          v.x += dir.x;
          v.y += dir.y;
          if (v.x > width-50 || v.x < 50 || v.y > height-50 || v.y < 50) break;
          vertex(v.x, v.y);
          const rad = map(noise(v.x/(noiseScale*scl),v.y/(noiseScale*scl), zoff), 0, 1, minRadius, maxRadius);
          ellipse(v.x, v.y, rad, rad);
        }
        endShape(CLOSE);
        v = lastV.copy();
      }
    }
  }
  strokeWeight(50);
  rect(0,0,width,height);
  
  zoff += zIncrement;
}
