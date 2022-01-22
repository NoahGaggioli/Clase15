var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage;
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;
var obstaclesGroup, cloudsGroup;
var gameOverImg, restartImg, gameOver,restart;

var PLAY = 1;
var END = 0
var gameState = PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");


  groundImage = loadImage("ground2.png");
  
 cloudImage = loadImage("cloud.png");
  
 gameOverImg = loadImage("gameOver.png");
 restartImg = loadImage("restart.png");
}

function setup() {

  createCanvas(600,200)
  
  //crear sprite de trex 
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collided",trex_collided);
  trex.scale = 0.5;
  
  //crear sprite de suelo
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  

  //gameover
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);

  //restart
  restart = createSprite(300,140);
  restart.addImage(restartImg);

  //escala gameover y restart
  gameOver.scale = 0.5;
  restart.scale = 0.5;


  //crear sprite de suelo invisible
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  score = 0;
 
  ///var rand = Math.round(random(1,100));
  //console.log(rand);
  
  

  obstaclesGroup = new Group();
  cloudsGroup = new Group();


  trex.setCollider("circle", 0,0,40);
  trex.debug = false;

}

function draw() {
  //establecer color de fondo
  background(150);
  
  fill("black");
  text("Puntuación:" + score,500,50);
  
 

  if(gameState == PLAY){

  gameOver.visible = false;
  restart.visible = false;

  //suelo
  ground.velocityX = -4;

  //puntuacion
  score = score+Math.round(frameCount/60);

  //generacion de suelo
    if (ground.x < 0){
    ground.x = ground.width/2;
    }

  //hacer que el trex salte al presionar la barra espaciadora
    if(keyDown("space")&& trex.y >= 140) {
    trex.velocityY = -10;

    

    }
  //gravedad
  trex.velocityY = trex.velocityY + 0.8

  //aparecen las nubes
  spawnClouds();
  //aparecen los cactus
  spawnObstacles();

  //muerte
    if(obstaclesGroup.isTouching(trex)){
      gameState = END
    }

  }
  else if(gameState == END){

  gameOver.visible = true;
  restart.visible = true;

  //para el suelo
  ground.velocityX = 0;
  trex.velocityY = 0;

  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);

  //cambio de animacion
  trex.changeAnimation("trex_collided",trex_collided);


  //nuevo ciclo de vida
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  }



  
  
  
  
  

  //evitar que el trex salte
  trex.collide(invisibleGround);

  
  drawSprites();
  
}

function spawnClouds(){
  //Escribir el codigo para aparecer las nubes
  if(frameCount %60 ==0){
  cloud = createSprite(600,100,40,10);
  cloud.addImage(cloudImage);
  cloud.y = Math.round(random(10,60));
  cloud.scale = 0.4;
  cloud.velocityX = -3;

  //ciclo de vida de nube
  cloud.lifetime  = 220;


  //console.log(trex.depth)
  //console.log(cloud.depth);


  //ajusta la profundidad
  cloud.depth = trex.depth;
  trex.depth = trex.depth + 1;

  //grupo de nubes
cloudsGroup.add(cloud);

  }

}

function spawnObstacles(){
  if(frameCount % 60 == 0){
    obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;

    //generar obstaculos aleatoriamente
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
      break;
      case 2: obstacle.addImage(obstacle2);
      break;
      case 3: obstacle.addImage(obstacle3);
      break;
      case 4: obstacle.addImage(obstacle4);
      break;
      case 5: obstacle.addImage(obstacle5);
      break;
      case 6: obstacle.addImage(obstacle6);
      break;
      default: break;
    }

    //escala de obstaculo
    obstacle.scale = 0.5;

    //ciclo de vida de los obstaculos
    obstacle.lifetime = 220;

  //grupo de obstaculos
  obstaclesGroup.add(obstacle);


  }

}