class Food {
    constructor(foodStock,lastFed,x,y) {
      var options = {
          isStatic: true
      }
      this.x=x;
      this.y=y;
      this.image=loadImage("Milk.png");
      World.add(world, this.body);
    }

    bedroom(){
        background(bedroom,550,500);
    }

    garden(){
        background(garden,550,500);
    }

    washroom(){
        background(washroom,550,500);
    }

    display(){
      var x=80,y=100;

      imageMode(CENTER);
      this.image(this.image,720,220,70,70);

      if(this.foodStock!=0){
          for(var i=0;i<this.foodStock;i++){
              if(i%10==0){
                  x=80;
                  y=y+50;
              }
              this.image(this.image,x,y,50,50);
              x=x+30;
          }
      }
  }
} 

