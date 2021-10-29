var bird, birdImg;
var thunder,thunderImg;
var bg,bgImg;
var count=1;
var SERVE=2;
var PLAY=1;
var END=0;
var gameState=SERVE;
var points=0;

function preload(){
  bgImg=loadImage("Photos/RainSky.jpg");
  birdImg=loadImage("Photos/Bird.png");
  thunderImg=loadImage("Photos/Thunder.png");
  lifeAnim=loadAnimation("Photos/LifeImg1.png","Photos/LifeImg2.png","Photos/LifeImg3.png","Photos/LifeImg4.png");
  CoinAnim=loadAnimation("Photos/Coin1.png","Photos/Coin2.png","Photos/Coin3.png","Photos/Coin4.png");
  scoreImg=loadImage("Photos/Score.png");
  GameOverImg=loadImage("Photos/GameOver.png");
  RestartImg=loadImage("Photos/Restart.png");
  coinSound=loadSound("Musics/mixkit-winning-a-coin-video-game-2069.wav");
  gameOverSound=loadSound("Musics/FVSZ8D7-game-over-cartoon-3.mp3");
}
function setup(){
   createCanvas(windowWidth,windowHeight);

   bg=createSprite(700,200);
   bg.addImage(bgImg);
   bg.scale=4; 

   bird=createSprite(650,350);
   bird.addImage(birdImg);
   bird.scale=0.3;
   bird.setCollider("rectangle",0,0,300,150);


   TG1=new Group();
   TG2=new Group();
   TG3=new Group();
   cg=new Group();

   ground1=createSprite(350,5,2100,10);
   ground1.visible=false;

   ground2=createSprite(350,620,2100,10);
   ground2.visible=false;

   life=createSprite(1320,50,30,30);
   life.addAnimation("life_rotating",lifeAnim);
   life.scale=1;
   
   score=createSprite(550,50,90,50);
   score.addImage(scoreImg);
   score.scale=0.3;

   gameOver=createSprite(650,300,20,20);
   gameOver.addImage(GameOverImg);
   gameOver.scale=0.8;
   gameOver.visible=false;

  restart=createSprite(650,450,20,20);
  restart.addImage(RestartImg);
  restart.scale=0.5;
  restart.visible=false;
}
function draw(){
        
    if (gameState===SERVE){
        bg.velocityX=0;
        life.visible=false;
        if(keyDown("space")){
            gameState=PLAY;
        }
    }
    if (gameState===PLAY){

   bg.velocityX=-3;
   
if(bg.x<500){
    bg.x=700;
}
bird.rotation=20;

  bird.collide(ground1);
  bird.collide(ground2);

life.visible=true;

if(keyDown("space") && bird.y>0){
    bird.velocityY=-9;
    bird.rotation=-45;
    
}

bird.velocityY=bird.velocityY+0.8;

if(TG1.isTouching(bird)){
    count = count - 1;
    TG1[0].destroy();
    cg.destroyEach();
}
if(TG2.isTouching(bird)){
    count = count - 1;
    TG2[0].destroy();
    cg.destroyEach();
}
if(TG3.isTouching(bird)){
    count = count - 1;
    TG3[0].destroy();
    cg.destroyEach();
}
if(count===0){
    life.visible=false;
    gameState=END;
}

if(cg.isTouching(bird)){
    cg[0].destroy();
    points=points+4;
    coinSound.play();
}
TG1.setColliderEach("rectangle",-20,0,40,370);
TG2.setColliderEach("rectangle",-20,0,40,370);
TG3.setColliderEach("rectangle",-20,0,40,370);
//calling groups
Thunder();
Light();
Storm();
Coin();
    }
    if (gameState===END){
        bg.velocityX=0;
        bird.rotation=90;
        bird.velocityY=12;
        gameOver.visible=true;
        restart.visible=true;
        gameOverSound.play();
        TG1.setVelocityXEach(0);
        TG2.setVelocityXEach(0);
        TG3.setVelocityXEach(0);
        TG3.setVelocityYEach(0);
      
        if(mousePressedOver(restart)){
            Reset();
        }
    }
    drawSprites();

textSize(45);
fill("gold");
text("=",620,65);
text(points,670,65);

if (points===100){
    textSize(45);
    fill("white");
    text("YOU WON!!!",650,350);
    TG1.setVelocityXEach(0);
    TG2.setVelocityXEach(0);
    TG3.setVelocityXEach(0);
    TG3.setVelocityYEach(0);
    TG1.destroyEach();
    TG2.destroyEach();
    TG3.destroyEach(); 
}
}
function Thunder(){
   if(World.frameCount % 80 == 0){
       var thunder=createSprite(0,100,20,20);
           thunder.addImage(thunderImg);
           thunder.scale=random(0.7,1);
           thunder.velocityX=12;
           thunder.velocityY=0;
           thunder.rotation=random(75,-45);
           TG1.add(thunder);
           return(thunder);
   }
}
function Light(){
    if(World.frameCount % 80 == 0){
        var light=createSprite(1200,500,20,20);
            light.addImage(thunderImg);
            light.scale=random(0.7,1);
            light.velocityX=-12;
            light.velocityY=0;
            light.rotation=random(75,-45);
            TG2.add(light);
            return(light);
    }
 }
 function Storm(){
    if(World.frameCount % 120 == 0){
        var storm=createSprite(0,0,20,20);
            storm.addImage(thunderImg);
            storm.scale=random(0.1,0.5);
            storm.velocityX=12;
            storm.velocityY=5;
            storm.rotation=45;
            TG3.add(storm);
            return(storm);
    }
 }
 function Coin(){
    if(World.frameCount % 100 == 0){
        var coin=createSprite(650,random(30,1000),20,20);
            coin.addAnimation("coin_spinning",CoinAnim);
            coin.scale=0.7;
            cg.add(coin);
            return(coin);
    }
 }
 function Reset(){
     gameState=PLAY;
     points=0;
     count=1;
     gameOver.visible=false;
     restart.visible=false;
     bird.x=650;
     bird.y=250;
     life.visible=true;
     bird.velocityY=0;
     bird.rotation=0;
     TG1.destroyEach();
     TG2.destroyEach();
     TG3.destroyEach();
 }