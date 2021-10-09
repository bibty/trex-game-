var cloudsgroup, obstaclesgroup; 
var gamestate = "play";
var trex, trex_running;
var groundImage;
var ground;
var invisground;
var cloud; 
var cloudImage; 
var obstacle;
var obstacle1;
var obstacle2,obstacle3,obstacle4,obstacle5,obstacle6; 
var randomnumber;
var trexstanding;
var gameover; 
var restart; 
var gameover1, restart1; 
var diesound, jumpsound, checkpointsound; 
var score=0
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  clougImage = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trexstanding = loadAnimation("trex1.png"); 
  gameover = loadImage("gameOver.png");
  restart = loadImage("restart.png");
  diesound = loadSound("die.mp3");
  jumpsound = loadSound("jump.mp3");
  checkpointsound = loadSound("checkpoint.mp3"); 
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  var message="good morning"; 
  console.log(message); 


  // creating trex
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trexstanding", trexstanding);

  
  ground=createSprite(200,height-70,width,20);
 ground.addImage(groundImage);
 
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  
  invisground=createSprite(600,height-50,width,20);
  invisground.visible=0;
  console.log("hello"+"everyone"); 

  cloudsgroup = new Group(); 
  obstaclesgroup = new Group(); 

  gameover1 = createSprite(width/2,height/2,300,300); 
  gameover1.addImage(gameover);
  gameover1.scale = 2
  gameover1.visible = 0

  restart1 = createSprite(width/2,height/2+50,300,300);
  restart1.addImage(restart);
  restart1.scale = 0.5; 
  restart1.visible = 0
  

  trex.debug = true
  trex.setCollider("rectangle", 0, 0, 70, 82); 
}


function draw(){
  //set background color 
  background("white");
  
  //logging the y position of the trex
  console.log(trex.y)

  
  if(gamestate == "play"){ 
    //jump when space key is pressed
  if((keyDown("space")||touches.length>0) &&(trex.y>height-120)){
    trex.velocityY = -10
    jumpsound.play(); 
    touches = []; 
  }
  trex.velocityY = trex.velocityY + 0.5;
  if(ground.x<0){
    ground.x=ground.width/2
      }
      createClouds();
      console.log(frameCount);
      createObstacle(); 
      if(obstaclesgroup.isTouching(trex)){
        diesound.play();
        gamestate = "end"; 
      }
      if(score > 0 && score%200 === 0){
        checkpointsound.play(); 
        
      }
      score = score+Math.round(getFrameRate()/60);
      ground.velocityX=-(5+score/200);



  }
   text ("score:" +score, width-200,100);
  
  if(gamestate == "end"){
    ground.velocityX = 0;
    trex.changeAnimation("trexstanding", trexstanding); 
    obstaclesgroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
    obstaclesgroup.setLifetimeEach(-1)
    cloudsgroup.setLifetimeEach(-1)

    restart1.visible = 1
    gameover1.visible = 1

    if((touches.length>0 || keyDown("space"))){
      reset(); 
      touches = []; 
   
    }

  

  }
  
  
  
  //stop trex from falling down
  trex.collide(invisground); 
  drawSprites();


 
} 

function createClouds(){
if(frameCount%60==0){
  cloud = createSprite(width,height-150,50,50);
  cloud.velocityX=-(5+score/200);
  cloud.addImage(clougImage);
  cloud.scale=0.5
  cloud.y=random(height/2,height/4);
  cloud.depth=trex.depth-1; 
  cloud.lifetime = 450;
  cloudsgroup.add(cloud); 
}
}

function createObstacle(){
if(frameCount%60==0){
  obstacle = createSprite(width,height-90,30,30);
  obstacle.velocityX=-(5+score/200);
  randomnumber=Math.round(random(1,6));
  obstacle.scale=0.7
  obstacle.lifetime = 450; 
  obstaclesgroup.add(obstacle); 
  switch(randomnumber){
    case 1:
      obstacle.addImage(obstacle1);
      break; 
      case 2:
        obstacle.addImage(obstacle2);
        break; 
        case 3:
          obstacle.addImage(obstacle3);
          break; 
          case 4:
            obstacle.addImage(obstacle4);
            break; 
            case 5:
            obstacle.addImage(obstacle5);
            break;
            case 6:
              obstacle.addImage(obstacle6);
              break; 
              default:
                break; 

  }
}

}
function reset(){
gamestate = "play";
gameover1.visible = false; 
restart1.visible = false;
cloudsgroup.destroyEach(); 
obstaclesgroup.destroyEach();
trex.changeAnimation("running",trex_running);
score = 0;
frameCount
}