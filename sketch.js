var obstacleGroup;
var treeGroup;
var score  = 0;
var gameState = 1;
var highscore =0;

function preload(){
  soldierimg = loadAnimation("images/final/soldier1.png", "images/final/soldier2.png", "images/final/soldier3.png",
   "images/final/soldier4.png", "images/final/soldier5.png", "images/final/soldier6.png");

   tile1 = loadImage("images/final/tile001 (1).png");
   tile2 = loadImage("images/final/tile002 (1).png")
   tile3 = loadImage("images/final/tile004.png")
   tile4 = loadImage("images/final/tile005.png")
   tile5 = loadImage("images/final/tile006.png")
   tile6 = loadImage("images/final/tile008.png")
   tile7 = loadImage("images/final/tile009.png")
   tile8 = loadImage("images/final/tile010.png")

   treeimg = loadImage("images/obstacles1.png");

   fallenSoldier = loadAnimation("images/final/soldier7.png");
   backgroundimg = loadImage("images/final/background.png");
   restartimg = loadImage("images/final/restartButton.png")
}


function setup() {
  createCanvas(windowWidth,windowHeight);

  background1 = createSprite(width/2 + 100, height/2, width, height);
  background1.addImage(backgroundimg);
  background1.scale = 0.6;
  background1.velocityX = -3;

  background2 = createSprite(width/2 + width, height/2, width, height);
  background2.addImage(backgroundimg);
  background2.scale = 0.6;
  background2.velocityX = -3;


  soldier = createSprite(400, 400, 50, 50);
  soldier.addAnimation("soldier", soldierimg);
  soldier.addAnimation("fallen", fallenSoldier);
  
  soldier.scale = 0.7;
  
  obstacleGroup = createGroup();
  treeGroup = createGroup();
  
  soldier.setCollider("rectangle", 0, 0, 200,420)

  ground = createSprite(windowWidth/2,590,windowWidth ,10);
  ground.visible = false;

  restart = createSprite(windowWidth/2, windowHeight/2);
  restart.addImage(restartimg);
  restart.visible = false;

  database = firebase.database();
  database.ref('highscore').on("value", (data)=>{
    highscore = data.val();
  })
}

function draw() {
  background(backgroundimg);  
 
  soldier.velocityY = soldier.velocityY + 0.5;
  soldier.collide(ground);
  soldier.debug = true;

  spawnObstacles();
  drawSprites();

  if(keyWentDown(UP_ARROW)){
    soldier.velocityY = -10;
  }
  soldier.velocityY = soldier.velocityY + 0.6;

  if(soldier.isTouching(obstacleGroup) || soldier.isTouching(treeGroup)){
     //soldier.velocityY = 0;
     soldier.changeAnimation("fallen", fallenSoldier);
     //soldier.y =  soldier.y +100
     obstacleGroup.setVelocityXEach(0);
     treeGroup.setVelocityXEach(0);
     soldier.setCollider("rectangle", 0, 0, 200,200);
     background1.velocityX = 0;
     background2.velocityX = 0;
     restart.visible = true;
     gameState = 0;
     if(highscore < score){
       highscore= score;
       database.ref('/').update({
         highscore : highscore
       })
     }

  }

  if(background1.x < -width/2){
    background1.x = width/2 + width;

  }

  if(background2.x < -width/2){
    background2.x = width/2 + width;

  }
  if(gameState ==  1){
    score = score+0.1;
    
 
  }

  if(mousePressedOver(restart)){
    soldier.changeAnimation("soldier", soldierimg)
    background1.velocityX = -3;
    background2.velocityX = -3;
    restart.visible = false;
    obstacleGroup.destroyEach();
    treeGroup.destroyEach();
    score= 0;
    gameState = 1;

  }
  //console.log(soldier.y);
   stroke("black");
   textSize(25);
  text("score: " + Math.round(score), width - 150, 50);
  text("highscore: " + Math.round(highscore), width - 300, 50)

}

function spawnObstacles(){
  if(frameCount % 400 === 0){
    obstacle = createSprite(windowWidth+50, height/2 +210)
    var rand = Math.round(random(1,8))
   
    switch(rand){
      case 1: obstacle.addImage(tile1)
      break;
      case 2: obstacle.addImage(tile2)
      break;
      case 3: obstacle.addImage(tile3)
      break;
      case 4: obstacle.addImage(tile4)
      break;
      case 5: obstacle.addImage(tile5)
      break;
      case 6: obstacle.addImage(tile6)
      break;
      case 7: obstacle.addImage(tile7)
      break;
      case 8: obstacle.addImage(tile8)
      break;
    }
    obstacle.velocityX = -6;
    obstacleGroup. add(obstacle);
  }

  if(frameCount % 900 === 0 ){
    tree = createSprite(windowWidth+150, height/2+210);
    tree.addImage(treeimg);
    tree.scale = 0.3;
    tree.velocityX = -6;

    treeGroup.add(tree);
  }
}




