var dog, happyDog, database, foodS, foodStock;
var feedPet, addFood, fedTime, lastFed;
var foodObj;
var changing,gameState,readingGameState;
var bedroom, garden, washroom;

function preload()
{
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  bedroom = loadImage("virtual pet images/Bed Room.png");
  garden = loadImage("virtual pet images/Garden.png");
  washroom = loadImage("virtual pet images/Wash Room.png");
}

function setup() {
  createCanvas(500, 500);
  
  createSprite(dog,200,200,30,40);

  var database = database.ref;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });

  food = new Food(this.x,this.y);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);
  
}


function draw() { 
  background(46, 139, 87);
  food.display();

  fedTime=database.ref('FeedTime');
  feedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);

  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM", 350,30);
  }
  else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }
  else{
    text("Last Feed : "+ lastFed + " AM", 350,30);
  }

  currentTime = hour();
  if(currentTime == (lastFed+1)){
    update("Playing");
    foodObj.garden();
  }

  else if(currentTime == (lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }

  else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }

  else{
    update("Hungry");
    foodObj.display();
  }

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }

  drawSprites();

}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }

  function feedDog(){
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      feedTime:hour()
    })

    function addFood(){
      foodS++;
      database.ref('/').update({
        Food:foodS
      })
    }
  }

  database.ref('/').update({
    Food:x
  })

  function update(state){
    database.ref('/').update({
      gameState:state
    });
  }

}




