var boy 
var zombie
var obstacle
var background
var invisibleGround
var gameState = "PLAY"

function preload(){
    
    boyImage = loadImage("boy running.gif")
    zombieImg = loadImage("zombie running gif.gif")
    bushImg = loadImage("obstacle3.png")
    backgroundImg = loadImage("background.jpg")
    


}

function setup() {
    createCanvas(windowWidth,windowHeight)

    background = createSprite(1000,400)
    background.addImage("background",backgroundImg)
    background.scale = 7
    background.velocityX = -1
    
    

    
    

    boy = createSprite( 650,650)
    boy.addImage("running", boyImage)
    boy.scale = 0.5
   
    boy.setCollider("rectangle",0,0,boy.width - 400,boy.height -100);
    boy.debug = true
    

    zombie = createSprite(150,650)
    zombie.addImage("running", zombieImg)
    zombie.scale = 1.5
    zombie.setCollider("rectangle",0,0,zombie.width - 400,zombie.height -100);
    zombie.debug = true

    invisibleGround = createSprite(400,850,windowWidth)
    
    invisibleGround.visible = false

    obstacleGroup = new Group

    
    
 
}
 
function draw() {
    var score = frameCount % 100
    fill ("black")
    var scoreBoard = text("Score: "+ score, 500,350);
    scoreBoard.depth = background.depth
    scoreBoard.depth += 10



    boy.collide(invisibleGround)
    zombie.collide(invisibleGround)

    if(gameState === "PLAY"){
         if(background.x > 0 ){
        background.x = background.width/2
        if(keyDown("UP_ARROW") ){
            boy.velocityY -= 2 
        }
        boy.velocityX = -1
        boy.velocityY += 0.8
    
        if(keyDown("RIGHT_ARROW")){
            boy.velocityX = 2
        }
        
    
    }
        
        if(obstacleGroup.isTouching(boy) || zombie.isTouching(boy)){
            gameState = "END"
            
             
        }
        if(obstacleGroup.isTouching(zombie)){
            zombie.velocityY -= 2 
        }
        zombie.velocityY += 0.8
        spawnObstacles();

    }

    

   

    
   

    if(gameState = "END"){
        boy.changeImage("running", zombieImg )
        boy.velocityX = 0
        boy.velocityY = 0
        zombie.velocityY = 0
        background.velocityX = 0
        obstacleGroup.setVelocityXEach(0)
        obstacleGroup.setLifetimeEach(-1)
        
       
        
    }
    drawSprites()
 
}
function spawnObstacles(){
    if(frameCount %  200 === 0){
        obstacle = createSprite(990,750)
        obstacle.addImage("bush", bushImg)
        obstacle.velocityX = -5
        obstacle.scale = 1.5
        obstacle.lifetime = 500
        obstacleGroup.add(obstacle)
        

    }
}