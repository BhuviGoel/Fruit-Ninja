var knife, knifeImg;
var PLAY = 1;
var END = 0;
var fruitGroup, enemyGroup;
var fruit1, fruit2, fruit3, fruit4;
var fruit1Img, fruit2Img, fruit3Img, fruit4Img;
var fruitsGroup, enemyGroup;

var knifeSound,  gameoverSound;

var gameState = PLAY;
var score = 0;
var gameoverImg;

function preload() {
  knifeImg = loadImage("sword.png");
  fruit1Img = loadImage("fruit1.png");
  fruit2Img = loadImage("fruit2.png");
  fruit3Img = loadImage("fruit3.png");
  fruit4Img = loadImage("fruit4.png");
  enemy1Img = loadImage("alien1.png");
  enemy2Img = loadImage("alien2.png");
  gameOverImg = loadImage("gameover.png");
  knifeSound=loadSound("knifeSwooshSound.mp3");
  gameoverSound=loadSound("gameover.mp3");
}

function setup() {
  createCanvas(400, 400);

  knife = createSprite(200, 200, 10, 10);
  knife.addImage("knife", knifeImg);
  knife.addAnimation("gameover", gameOverImg);
  knife.scale = 0.5
  fruitsGroup = new Group();
  enemyGroup = new Group();

}

function draw() {
  background("orange");

  if (gameState === PLAY) {
    textSize(20);
    text("Score: " + score, 160, 200)
    knife.x = mouseX;
    knife.y = mouseY;
    if (fruitsGroup.isTouching(knife)) {
      fruitsGroup.destroyEach();
     score = score + Math.round(getFrameRate()/15);
      knifeSound.play();
    }
    if (enemyGroup.isTouching(knife)) {
      enemyGroup.destroyEach();
      gameState = END;
      gameoverSound.play();
    }
  } else if (gameState === END) {
    fruitsGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitsGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0); 
    knife.x=200;
    knife.y=200;
    knife.changeAnimation("gameover", gameOverImg)
    knife.scale=1;
  }
   if((mousePressedOver(knife) || keyDown("space")) && gameState===END) {
      reset();
    }
  obstacle();
  drawSprites();
}

function reset(){
  knife.changeAnimation("knife", knifeImg)
  knife.x=mouseX
  knife.y=mouseY
  gameState=PLAY;
  knife.scale=0.5;
  score=0;
}

function obstacle() {
  var selectFruit = Math.round(random(0, 5))
  if (frameCount % 60 === 0) {
    if (selectFruit === 0) {
      fruit12();
    }
    if (selectFruit === 1) {
      fruit23();
    }
    if (selectFruit === 2) {
      fruit34();
    }
    if (selectFruit === 3) {
      fruit45();
    }
    if (selectFruit === 4) {
      enemy12();
    }
    if (selectFruit === 5) {
      enemy23();
    }
  }
}

function fruit12() {
  fruit1 = createSprite(-30, 200, 10, 10)
  fruit1.addAnimation("fruit1", fruit1Img)
  fruit1.velocityX = 4 + score/4;
  fruit1.y = Math.round(random(10, 200))
  fruit1.lifetime = 100
  fruit1.scale = 0.2
  fruitsGroup.add(fruit1);
}

function fruit23() {
  fruit2 = createSprite(-30, 200, 10, 10)
  fruit2.addAnimation("fruit2", fruit2Img)
  fruit2.velocityX = 4 + score/4;
  fruit2.y = Math.round(random(10, 200))
  fruit2.lifetime = 100
  fruitsGroup.add(fruit2);
  fruit2.scale = 0.2
}

function fruit34() {
  fruit3 = createSprite(430, 200, 10, 10)
  fruit3.addAnimation("fruit3", fruit3Img)
  fruit3.velocityX = -(4 + score/4);
  fruit3.y = Math.round(random(10, 200))
  fruit3.lifetime = 100
  fruitsGroup.add(fruit3);
  fruit3.scale = 0.2

}

function fruit45() {
  fruit4 = createSprite(430, 200, 10, 10)
  fruit4.addAnimation("fruit4", fruit4Img)
  fruit4.velocityX = -(4 + score/4);
  fruit4.y = Math.round(random(10, 200))
  fruit4.lifetime = 100
  fruitsGroup.add(fruit4);
  fruit4.scale = 0.2

}

function enemy12() {
  enemy1 = createSprite(-30, 200, 20, 20)
  enemy1.addAnimation("enemy1", enemy1Img);
  enemy1.velocityX = (4+ score/10);
  enemy1.y = Math.round(random(10, 200));
  enemy1.lifetime = 100;
  enemyGroup.add(enemy1);

}

function enemy23() {
  enemy2 = createSprite(-30, 200, 20, 20)
  enemy2.addAnimation("enemy2", enemy2Img);
  enemy2.velocityX = -(4+ score/10);
  enemy2.y = Math.round(random(10, 200));
  enemy2.lifetime = 100;
  enemyGroup.add(enemy2);

}