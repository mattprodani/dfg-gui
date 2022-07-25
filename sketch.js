const colors = ["#668F94", "#6089A7", "#675097", "#9E5591", "#0a4386", "#a3c4f3", "#8eecf5"]

const labels = ["Grains", "Fruit", "Dairy", "Livestock", "Legumes", "Vegetables"]


let sliders;
function setup() {
  let div = select('#container');
  div.size(600, 750);
  createCanvas(600, 750).parent("container");
  sliders = [];
  for(let i = 0; i < 6; i++){
    slider = createSlider(0, 1000, random(300, 700));
    slider.parent("container");
    slider.center();
    slider.position(250, 250 + i*30);
    slider.style('width', '100px');
    sliders.push(slider);
  }
}

function draw() {
  background("#FFFFFF");
  rect(0,0,600,50);
  textAlign(CENTER);
  fill("white");
  textSize(25)
  text("Agriculture Portfolio for Good", 300, 35);
  
  textSize(16)
  pieChart(300, 150, 150);
  for(let i = 0; i < 6; i++){
    noStroke()
    fill(colors[i]);
    s = sliders[i];
    textAlign(LEFT);
    text(labels[i], s.x + 120, s.y+15);
    textAlign(RIGHT);
    
    text(s.value() + " tonnes", s.x - 20, s.y+15);
    rectMode(CENTER);
  }
  rectMode(CENTER);
  fill("white")
  stroke(1);
  rect(300,480, 250, 40)
  rect(300,550, 250, 40)
  noStroke();
  rectMode(CORNER)
  fill("green")
  rect(175,460, (100-getCO2())*2.5, 40);
  fill("pink")
  rect(175, 530, 2.5*getSocial(), 40);
  getCO2();
  textAlign(CENTER)
  fill("#115880");
  text("Environmental Impact", 300, 520)
  
  text("Social Impact", 300, 590)
  

  textSize(10)
  text("Use: Move the sliders around to see how different production of agriculture products affects environmental measures", 
  0, 650, 600, 700);
}

function getCO2() {
  let icp = -8.155e+02;
  let arr = [  -2.924e-03,   -8.005e-03,    1.993e-02,    1.060e-01,    6.918e-03, -4.152e-03];
  let valSum = 0
  for(let i = 0; i < 6; i++){
    valSum += sliders[i].value();
  }
  for(let i = 0; i < 6; i++){
    icp += sliders[i].value()*arr[i]*100/valSum;
  }
  icp += 816.3;
  icp = icp*100 / (816.3-805.1);
  if(icp > 100) icp = 100;
  if(icp < 0) icp = 0;
  return icp;
}

function getSocial() {
  let icp = 8.198e+05;
  let arr = [ 5.410e-01,    1.034e-01,    1.250e-01,   -1.342e+00,    5.255e-02,    2.339e-02];
  let valSum = 0
  for(let i = 0; i < 6; i++){
    valSum += sliders[i].value();
  }
  for(let i = 0; i < 6; i++){
    icp += sliders[i].value()*arr[i]*100/valSum;
  }
  print(icp)
  icp -= 819665.8;
  icp = icp*100 / (819854.1-819665.8);
  if(icp > 100) icp = 100;
  if(icp < 0) icp = 0;
  print(icp)
  return icp;
}


function pieChart(x, y, r){
  stroke("#fff")
  currAngle = 0;
  total = 0;
  for(let i = 0; i < sliders.length; i++){
    total += sliders[i].value();
  }
  for(let i = 0; i < sliders.length; i++){
    fill(colors[i]);
    let ang = 2*PI*(sliders[i].value()/total) + currAngle;
    arc(x, y, r, r, currAngle, ang);
    currAngle = ang;
  }
}

 

