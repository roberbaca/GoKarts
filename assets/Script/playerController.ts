

import GameController, { GameStatus } from "./gameController";


const {ccclass, property} = cc._decorator;

@ccclass
export default class playerController extends cc.Component 
{ 
 
 // declaracion de variables 

 // direccion del auto
 isLeft: boolean = false;
 isRight: boolean = false;
 isDown: boolean = false;
 isUp: boolean = false;
 

 // animaciones
 RightAnimation : cc.AnimationState;
 LeftAnimation : cc.AnimationState;
 idleAnimation : cc.AnimationState;

 Anim0 : cc.AnimationState;
 Anim90 : cc.AnimationState;
 Anim180 : cc.AnimationState;
 Anim270 : cc.AnimationState;



 // movimiento
 speed: number = 0;
 carX: number = 500;
 carY: number = 300;
 angulo: number = 0;
 acc: number = 0.2; 
 dec: number = 0.1;
 maxSpeed: number = 2;

 // movimiento
 velocityX: number = 0;
 velocityY: number = 0;
 maxVel: number = 12;   
 

/*
// HUD
 @property(cc.RichText)
 RacePosition: cc.RichText = null;

 @property(cc.RichText)
Speed: cc.RichText = null;


// Sound FX
 @property(cc.AudioSource)
 sndStartEngine: cc.AudioSource = null;

 @property(cc.AudioSource)
 sndSkid: cc.AudioSource = null;

 @property(cc.AudioSource)
 sndCrash: cc.AudioSource = null;

 @property(cc.AudioSource)
 sndMotor: cc.AudioSource = null;
*/




 // asignamos el componente del GameController
 gameController: GameController = null;

 isGameOver: boolean = false;


position: number = 20; 




 // eventos del teclado
 movePlayer(event)
{
    switch(event.keyCode)
    {
        case cc.macro.KEY.left:
            this.isLeft = true;
            
            break;

        case cc.macro.KEY.right:
            this.isRight = true;
                     
            break;

         case cc.macro.KEY.up:
             this.isUp = true;
                     
             break;

         case cc.macro.KEY.down:
             this.isDown = true;
                 
             break;

        
     }
 }

 stopPlayer(event)
 {     
     switch(event.keyCode)
     {
         case cc.macro.KEY.left:
             this.isLeft = false;
             break;
         case cc.macro.KEY.right:
             this.isRight = false;
             break;
         case cc.macro.KEY.up:
             this.isUp = false;
             break;
         case cc.macro.KEY.down:
             this.isDown = false;
             break;
         
     }     
 }

 
 onLoad () 
 {      
     cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.movePlayer,this);
     cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.stopPlayer,this);  
  
     this.gameController = cc.Canvas.instance.node.getComponent("gameController");   
     
     this.LeftAnimation = this.getComponent( cc.Animation ).getAnimationState('Left');
     this.RightAnimation = this.getComponent( cc.Animation ).getAnimationState('Right');
     this.idleAnimation = this.getComponent( cc.Animation ).getAnimationState('Idle'); 

     this.Anim0 = this.getComponent( cc.Animation ).getAnimationState('0');
     this.Anim180 = this.getComponent( cc.Animation ).getAnimationState('180');
     this.Anim270 = this.getComponent( cc.Animation ).getAnimationState('270'); 
     this.Anim90 = this.getComponent( cc.Animation ).getAnimationState('90'); 
      
 }

 start () 
 {



 }

 update(dt)
 {    
     /*
    if (this.gameController.gameStatus != GameStatus.Game_Playing)
    {
       // return;
    }    
     */
    
      
     // Limito la velocidad para que no se acelere de forma infinita

     /*
     if (this.velocityX <= (-this.maxVel))
     {
         this.velocityX = -this.maxVel;
     }

     if (this.velocityX >= this.maxVel)
     {
         this.velocityX = this.maxVel;
     }        
     
     if (this.velocityY <= (-this.maxVel))
     {
         this.velocityY = -this.maxVel;
     }
 
     if (this.velocityY >= this.maxVel)
     {
         this.velocityY = this.maxVel;
     }
*/


     

    // Animaciones del auto
/*
    if (this.isLeft)
    {
	    //this.sndSkid.play();
	    //this.LeftAnimation.play();   
        this.node.setPosition(this.node.position.x += this.velocityX,this.node.position.y);
        this.velocityX -= this.acc; // MRUV
        this.velocityY = 0;  
    }

    else if (this.isRight) 
    {
	    //this.sndSkid.play();
   	    //this.RightAnimation.play();   
        //this.node.setPosition(this.node.position.x += this.velocityX,this.node.position.y);
        //this.velocityX += this.acc; // MRUV
        //this.velocityY = 0; 
        //this.getComponent(cc.Animation).play();

    }

    if (!this.isRight)
    {
    	//this.idleAnimation.play();
        this.getComponent(cc.Animation).stop();
    }


    // Velocidad del auto

    if (this.isUp && this.speed < 6.9)
    {
        this.speed += 0.1;   
        
    }


    if (this.isDown && this.speed >= 0)
    {
        this.speed -= 0.1;   
    }


    if (this.speed <= 0)	 
    {
    	this.speed = 0;
    }

    if (this.isUp) 
    {
	    //this.sndMotor.play();   
        this.node.setPosition(this.node.position.x,this.node.position.y += this.velocityY / 2 );
        this.velocityY += this.acc; // MRUV
        this.velocityX = 0;   
    }

    if (this.isDown) 
    {
	    //this.sndSkid.play();    
        this.node.setPosition(this.node.position.x,this.node.position.y += this.velocityY / 2);
        this.velocityY -= this.acc; // MRUV
        this.velocityX = 0; 
        
    }
	

*/



    if (this.isUp && this.speed < this.maxSpeed)
    {
        if (this.speed < 0)
        {
            this.speed += this.dec;
        }
        else
        {
            this.speed += this.acc;
        }
    }

    if (this.isDown && this.speed > -this.maxSpeed)
    {
        if (this.speed > 0)
        {
            this.speed -= this.dec;
        }
        else
        {
            this.speed -= this.acc;
        }
    }


    if (!this.isUp && !this.isDown)
    {
        if (this.speed - this.dec > 0)
        {
            this.speed -= this.dec;
        }
        else if (this.speed + this.dec < 0)
        {
            this.speed += this.dec;
        }
        else
        {
            this.speed = 0;
        }       
    }

    if (this.isRight && this.speed != 0)
    {
        this.angulo += 0.09;
    }

    if (this.isLeft && this.speed != 0)
    {
        this.angulo -= 0.09;
    }

    this.move();
    this.rotate();

    
    // usar cos y sin
    
    if (this.rad2deg(this.angulo) > 0 && this.rad2deg(this.angulo) < 90)
    {
        this.Anim0.play();
    }

    if (this.rad2deg(this.angulo) >= 90 && this.rad2deg(this.angulo) < 180)
    {
        this.Anim90.play();
    }

    if (this.rad2deg(this.angulo) >= 180 && this.rad2deg(this.angulo) < 270)
    {
        this.Anim180.play();
    }

    if (this.rad2deg(this.angulo) >= 270 && this.rad2deg(this.angulo) < 360)
    {
        this.Anim270.play();
    }



   
}


// Colisiones
 
 onCollisionEnter(otherCollider,selfCollider)
 {     
  
    if (otherCollider.name == "enemyCar<BoxCollider>")
    {
        //this.sndCrash.play();
        cc.log("CRASH");
    }
 
    if (otherCollider.name == "palmTree<BoxCollider>")
    {
     	//this.sndCrash.play();
        cc.log("CRASH");
        
    }

   
 
 }

    onCollisionExit(otherCollider,selfCollider)
    {         
        if (otherCollider.name == "enemyCar<BoxCollider>" || otherCollider.name == "palmTree<BoxCollider>")
        {
        }      
    }  


    onCollisionStay(otherCollider,selfCollider)
    {
       
        if (otherCollider.name == "enemyCar<BoxCollider>")
        {         
               
        }
    }

 

    endRace()
    {
        cc.director.loadScene('RacePositions');          
    }


   move()
   {
    this.carX += Math.sin(this.angulo) * this.speed;
    this.carY += Math.cos(this.angulo) * this.speed;

    this.node.setPosition(this.carX, this.carY);
   }

   rotate()
    {
        this.node.setRotation(this.angulo * 180 / Math.PI);
    }   

    rad2deg(angle)
    {
        var deg = angle * 180 / Math.PI
       return deg;
    }
   
}
