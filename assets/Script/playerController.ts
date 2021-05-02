

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
 
 canMoveUp: boolean = true;
 canMoveDown: boolean = true;
 canMoveLeft: boolean = true;
 canMoveRight: boolean = true;


 // animaciones
 Anim0 : cc.AnimationState;
 Anim22 : cc.AnimationState;
 Anim45 : cc.AnimationState;
 Anim67 : cc.AnimationState;
 Anim90 : cc.AnimationState;
 Anim112 : cc.AnimationState;
 Anim135 : cc.AnimationState;
 Anim157 : cc.AnimationState;
 Anim180 : cc.AnimationState;
 Anim202 : cc.AnimationState;
 Anim225 : cc.AnimationState;
 Anim247 : cc.AnimationState;
 Anim270 : cc.AnimationState;
 Anim292 : cc.AnimationState;
 Anim315 : cc.AnimationState;
 Anim337 : cc.AnimationState;



 // movimiento
 speed: number = 0;
 carX: number = 0;
 carY: number = 0;
 angulo: number = 135;
 acc: number = 0.4; 
 dec: number = 0.09;
 maxSpeed: number = 5;
 turnSpeed: number = 0.08;

 // lap
 lapNumber: number = 0;
 lapTime: number = 0;
 BestTime: number = 0;

 //debug
 @property(cc.Label)
 labelAngle: cc.Label = null;
  
 @property(cc.Label)
 labelResto: cc.Label = null;


 // HUD
 @property(cc.Label)
 labelTime: cc.Label = null;

 @property(cc.Label)
 labelLap: cc.Label = null;

 @property(cc.Label)
 labelBestTime: cc.Label = null;

 @property(cc.RichText)
 labelRecord: cc.RichText = null;


 // sounds FX
 @property(cc.AudioSource)
 sndSkid: cc.AudioSource = null;
 
 @property(cc.AudioSource)
 sndNewRecord: cc.AudioSource = null;


 // aux
 @property(cc.Sprite)
 startLine: cc.Sprite = null;


 // GameOver Screen
 @property(cc.Node)
 gameOverScreen: cc.Node = null;

 @property(cc.Sprite)
 cup: cc.Sprite = null;

 @property(cc.Label)
 yourTime: cc.Label = null;


  // HUD
 @property(cc.Node)
 HUD: cc.Node = null;

 // Buttons
 @property(cc.Button)
 btnRetry: cc.Button = null;

 @property(cc.Button)
 btnExit: cc.Button = null;
 
 @property(cc.Button)
 btnMenu: cc.Button = null;



 // asignamos el componente del GameController
 gameController: GameController = null;


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

     this.Anim0 = this.getComponent( cc.Animation ).getAnimationState('0');
     this.Anim22 = this.getComponent( cc.Animation ).getAnimationState('22');
     this.Anim45 = this.getComponent( cc.Animation ).getAnimationState('45');
     this.Anim67 = this.getComponent( cc.Animation ).getAnimationState('67');
     this.Anim90 = this.getComponent( cc.Animation ).getAnimationState('90'); 
     this.Anim112 = this.getComponent( cc.Animation ).getAnimationState('112');
     this.Anim135 = this.getComponent( cc.Animation ).getAnimationState('135');
     this.Anim157 = this.getComponent( cc.Animation ).getAnimationState('157');
     this.Anim180 = this.getComponent( cc.Animation ).getAnimationState('180');
     this.Anim202 = this.getComponent( cc.Animation ).getAnimationState('202');
     this.Anim225 = this.getComponent( cc.Animation ).getAnimationState('225');
     this.Anim247 = this.getComponent( cc.Animation ).getAnimationState('247');
     this.Anim270 = this.getComponent( cc.Animation ).getAnimationState('270'); 
     this.Anim292 = this.getComponent( cc.Animation ).getAnimationState('292');
     this.Anim315 = this.getComponent( cc.Animation ).getAnimationState('315');
     this.Anim337 = this.getComponent( cc.Animation ).getAnimationState('337'); 
     
     this.btnRetry.node.on(cc.Node.EventType.TOUCH_END,this.touchRetryBtn,this); 
     this.btnExit.node.on(cc.Node.EventType.TOUCH_END,this.touchExitBtn,this); 
     this.btnMenu.node.on(cc.Node.EventType.TOUCH_END,this.touchMenuBtn,this);       
 }

 start () 
 {
    this.carX = this.node.position.x;
    this.carY = this.node.position.y;
    this.labelRecord.node.active = false;
    this.gameOverScreen.active = false;
 }

 update(dt)
 {         
    if (this.gameController.gameStatus != GameStatus.Game_Playing)
    {
       return;
    }    

    if (this.isUp && this.speed < this.maxSpeed && this.canMoveUp)
    {
        if (this.speed < 0)
        {
            this.speed += this.dec;
        }
        else if (this.speed >= 0)
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
        this.angulo += this.turnSpeed;
        if (!this.sndSkid.isPlaying)
        {
            this.sndSkid.play();
        }
        
    }

    if (this.isLeft && this.speed != 0)
    {
        this.angulo -= this.turnSpeed;
        if (!this.sndSkid.isPlaying)
        {
            this.sndSkid.play();
        }
    }

    this.move();    
    this.animaciones();
    

    this.labelAngle.string = "Angle: " + String(this.rad2deg(this.angulo).toFixed());
    this.labelResto.string = "Resto: " + String((this.angulo % (Math.PI * 2)).toFixed());

    if(this.lapNumber > 0)
    {
        this.lapTime += dt;
    }

    if (this.lapNumber == 0)
    {
        this.labelLap.string = "Lap 1/5";
    }
    else
    {
        this.labelLap.string = "Lap " + String(this.lapNumber) + "/5";
    }
   
    this.labelTime.string = "Time: " + String(this.lapTime.toFixed(3));
    this.labelBestTime.string = "Best: " + String(this.BestTime.toFixed(3));


    // Cuando se completan el total de vueltas, se muestra el resultado final
    if (this.lapNumber == 6)
    {
        this.GameOver();
    }
   
   
}


GameOver()
{
    this.gameController.gameStatus = GameStatus.Game_Over;
    this.HUD.active = false;
    this.gameOverScreen.active = true;

    if (this.BestTime > 11)
    {
        this.cup.getComponent(cc.Animation).play("noCup");        
    }
    else if (this.BestTime <= 11 && this.BestTime > 10.5)
    {
        this.cup.getComponent(cc.Animation).play("bronzeCup"); 
    }
    else if (this.BestTime <= 10.5 && this.BestTime > 9.9)
    {
        this.cup.getComponent(cc.Animation).play("silverCup"); 
    }
    else if (this.BestTime <= 9.9)
    {
        this.cup.getComponent(cc.Animation).play("goldCup"); 
    }

    this.yourTime.string = "Best time: " + String(this.BestTime.toFixed(3));


}


checkTime()
{
    if (this.lapNumber == 1)
    {
        this.BestTime = this.lapTime;
        this.newRecord();
    }

    else if (this.lapNumber > 1)
    {
        if (this.lapTime < this.BestTime && this.lapTime != 0)
        {
            this.BestTime = this.lapTime;
            this.newRecord();
        }
    }
}

newRecord()
{
    this.labelRecord.node.active = true;
    this.sndNewRecord.play();
    this.schedule(this.newRecordOff, 2, 0);
}

newRecordOff()
{
    this.labelRecord.node.active = false;
}



animaciones()
{
    // muestro la animacion correcta en funcion del angulo en el que se desplaza el auto

    if (Math.abs(this.rad2deg(this.angulo) % 360) >= 0 && Math.abs(this.rad2deg(this.angulo) % 360) < 22.5) 
{
    this.Anim0.play();
    this.Anim22.stop();
    this.Anim45.stop();
    this.Anim67.stop();
    this.Anim90.stop();
    this.Anim112.stop();
    this.Anim135.stop();
    this.Anim157.stop();
    this.Anim180.stop();
    this.Anim202.stop();
    this.Anim225.stop();
    this.Anim247.stop();
    this.Anim270.stop();
    this.Anim292.stop();
    this.Anim315.stop();
    this.Anim337.stop();
}


else if (Math.abs(this.rad2deg(this.angulo)% 360) >= 22.5 && Math.abs(this.rad2deg(this.angulo)% 360) < 45) 
{
    this.Anim0.stop();
    this.Anim22.play();
    this.Anim45.stop();
    this.Anim67.stop();
    this.Anim90.stop();
    this.Anim112.stop();
    this.Anim135.stop();
    this.Anim157.stop();
    this.Anim180.stop();
    this.Anim202.stop();
    this.Anim225.stop();
    this.Anim247.stop();
    this.Anim270.stop();
    this.Anim292.stop();
    this.Anim315.stop();
    this.Anim337.stop();
}

else if (Math.abs(this.rad2deg(this.angulo)% 360) >= 45 && Math.abs(this.rad2deg(this.angulo)% 360) < 67.5) 
{
    this.Anim0.stop();
    this.Anim22.stop();
    this.Anim45.play();
    this.Anim67.stop();
    this.Anim90.stop();
    this.Anim112.stop();
    this.Anim135.stop();
    this.Anim157.stop();
    this.Anim180.stop();
    this.Anim202.stop();
    this.Anim225.stop();
    this.Anim247.stop();
    this.Anim270.stop();
    this.Anim292.stop();
    this.Anim315.stop();
    this.Anim337.stop();

}

else if (Math.abs(this.rad2deg(this.angulo)% 360) >= 67.5 && Math.abs(this.rad2deg(this.angulo)% 360) < 90) 
{
    this.Anim0.stop();
    this.Anim22.stop();
    this.Anim45.stop();
    this.Anim67.play();
    this.Anim90.stop();
    this.Anim112.stop();
    this.Anim135.stop();
    this.Anim157.stop();
    this.Anim180.stop();
    this.Anim202.stop();
    this.Anim225.stop();
    this.Anim247.stop();
    this.Anim270.stop();
    this.Anim292.stop();
    this.Anim315.stop();
    this.Anim337.stop();

}

else if (Math.abs(this.rad2deg(this.angulo)% 360) >= 90 && Math.abs(this.rad2deg(this.angulo)% 360) < 112.5) 
{
    this.Anim0.stop();
    this.Anim22.stop();
    this.Anim45.stop();
    this.Anim67.stop();
    this.Anim90.play();
    this.Anim112.stop();
    this.Anim135.stop();
    this.Anim157.stop();
    this.Anim180.stop();
    this.Anim202.stop();
    this.Anim225.stop();
    this.Anim247.stop();
    this.Anim270.stop();
    this.Anim292.stop();
    this.Anim315.stop();
    this.Anim337.stop();
}

else if (Math.abs(this.rad2deg(this.angulo)% 360) >= 112.5 && Math.abs(this.rad2deg(this.angulo)% 360) < 135) 
{
    this.Anim0.stop();
    this.Anim22.stop();
    this.Anim45.stop();
    this.Anim67.stop();
    this.Anim90.stop();
    this.Anim112.play();
    this.Anim135.stop();
    this.Anim157.stop();
    this.Anim180.stop();
    this.Anim202.stop();
    this.Anim225.stop();
    this.Anim247.stop();
    this.Anim270.stop();
    this.Anim292.stop();
    this.Anim315.stop();
    this.Anim337.stop();
}

else if (Math.abs(this.rad2deg(this.angulo)% 360) >= 135 && Math.abs(this.rad2deg(this.angulo)% 360) < 157.5) 
{
    this.Anim0.stop();
    this.Anim22.stop();
    this.Anim45.stop();
    this.Anim67.stop();
    this.Anim90.stop();
    this.Anim112.stop();
    this.Anim135.play();
    this.Anim157.stop();
    this.Anim180.stop();
    this.Anim202.stop();
    this.Anim225.stop();
    this.Anim247.stop();
    this.Anim270.stop();
    this.Anim292.stop();
    this.Anim315.stop();
    this.Anim337.stop();
}


else if (Math.abs(this.rad2deg(this.angulo)% 360) >= 157.5 && Math.abs(this.rad2deg(this.angulo)% 360) < 180) 
{
    this.Anim0.stop();
    this.Anim22.stop();
    this.Anim45.stop();
    this.Anim67.stop();
    this.Anim90.stop();
    this.Anim112.stop();
    this.Anim135.stop();
    this.Anim157.play();
    this.Anim180.stop();
    this.Anim202.stop();
    this.Anim225.stop();
    this.Anim247.stop();
    this.Anim270.stop();
    this.Anim292.stop();
    this.Anim315.stop();
    this.Anim337.stop();
}


else if (Math.abs(this.rad2deg(this.angulo)% 360) >= 180 && Math.abs(this.rad2deg(this.angulo)% 360) < 202.5) 
{
    this.Anim0.stop();
    this.Anim22.stop();
    this.Anim45.stop();
    this.Anim67.stop();
    this.Anim90.stop();
    this.Anim112.stop();
    this.Anim135.stop();
    this.Anim157.stop();
    this.Anim180.play();
    this.Anim202.stop();
    this.Anim225.stop();
    this.Anim247.stop();
    this.Anim270.stop();
    this.Anim292.stop();
    this.Anim315.stop();
    this.Anim337.stop();
}


else if (Math.abs(this.rad2deg(this.angulo)% 360) >= 202.5 && Math.abs(this.rad2deg(this.angulo)% 360) < 225) 
{
    this.Anim0.stop();
    this.Anim22.stop();
    this.Anim45.stop();
    this.Anim67.stop();
    this.Anim90.stop();
    this.Anim112.stop();
    this.Anim135.stop();
    this.Anim157.stop();
    this.Anim180.stop();
    this.Anim202.play();
    this.Anim225.stop();
    this.Anim247.stop();
    this.Anim270.stop();
    this.Anim292.stop();
    this.Anim315.stop();
    this.Anim337.stop();
}


else if (Math.abs(this.rad2deg(this.angulo)% 360) >= 225 && Math.abs(this.rad2deg(this.angulo)% 360) < 247.5) 
{
    this.Anim0.stop();
    this.Anim22.stop();
    this.Anim45.stop();
    this.Anim67.stop();
    this.Anim90.stop();
    this.Anim112.stop();
    this.Anim135.stop();
    this.Anim157.stop();
    this.Anim180.stop();
    this.Anim202.stop();
    this.Anim225.play();
    this.Anim247.stop();
    this.Anim270.stop();
    this.Anim292.stop();
    this.Anim315.stop();
    this.Anim337.stop();
}

else if (Math.abs(this.rad2deg(this.angulo)% 360) >= 247.5 && Math.abs(this.rad2deg(this.angulo)% 360) < 270) 
{
    this.Anim0.stop();
    this.Anim22.stop();
    this.Anim45.stop();
    this.Anim67.stop();
    this.Anim90.stop();
    this.Anim112.stop();
    this.Anim135.stop();
    this.Anim157.stop();
    this.Anim180.stop();
    this.Anim202.stop();
    this.Anim225.stop();
    this.Anim247.play();
    this.Anim270.stop();
    this.Anim292.stop();
    this.Anim315.stop();
    this.Anim337.stop();
}

else if (Math.abs(this.rad2deg(this.angulo)% 360) >= 270 && Math.abs(this.rad2deg(this.angulo)% 360) < 292.5) 
{
    this.Anim0.stop();
    this.Anim22.stop();
    this.Anim45.stop();
    this.Anim67.stop();
    this.Anim90.stop();
    this.Anim112.stop();
    this.Anim135.stop();
    this.Anim157.stop();
    this.Anim180.stop();
    this.Anim202.stop();
    this.Anim225.stop();
    this.Anim247.stop();
    this.Anim270.play();
    this.Anim292.stop();
    this.Anim315.stop();
    this.Anim337.stop();
}

else if (Math.abs(this.rad2deg(this.angulo)% 360) >= 292.5 && Math.abs(this.rad2deg(this.angulo)% 360) < 315) 
{
    this.Anim0.stop();
    this.Anim22.stop();
    this.Anim45.stop();
    this.Anim67.stop();
    this.Anim90.stop();
    this.Anim112.stop();
    this.Anim135.stop();
    this.Anim157.stop();
    this.Anim180.stop();
    this.Anim202.stop();
    this.Anim225.stop();
    this.Anim247.stop();
    this.Anim270.stop();
    this.Anim292.play();
    this.Anim315.stop();
    this.Anim337.stop();
}

else if (Math.abs(this.rad2deg(this.angulo)% 360) >= 315 && Math.abs(this.rad2deg(this.angulo)% 360) < 337.5) 
{
    this.Anim0.stop();
    this.Anim22.stop();
    this.Anim45.stop();
    this.Anim67.stop();
    this.Anim90.stop();
    this.Anim112.stop();
    this.Anim135.stop();
    this.Anim157.stop();
    this.Anim180.stop();
    this.Anim202.stop();
    this.Anim225.stop();
    this.Anim247.stop();
    this.Anim270.stop();
    this.Anim292.stop();
    this.Anim315.play();
    this.Anim337.stop();
}

else if (Math.abs(this.rad2deg(this.angulo)% 360) >= 337.5 && Math.abs(this.rad2deg(this.angulo)% 360) < 360) 
{
    this.Anim0.stop();
    this.Anim22.stop();
    this.Anim45.stop();
    this.Anim67.stop();
    this.Anim90.stop();
    this.Anim112.stop();
    this.Anim135.stop();
    this.Anim157.stop();
    this.Anim180.stop();
    this.Anim202.stop();
    this.Anim225.stop();
    this.Anim247.stop();
    this.Anim270.stop();
    this.Anim292.stop();
    this.Anim315.stop();
    this.Anim337.play();
}

}



// Colisiones
 
 onCollisionEnter(otherCollider,selfCollider)
 {     

    if (otherCollider.name == "startLine<BoxCollider>")
    {
        this.checkTime();
        this.lapTime = 0;        
        this.lapNumber++;        
    } 
  

    if (otherCollider.name == "solid copy<BoxCollider>" && this.isUp)
    {
        this.canMoveUp = false;        
        this.speed = 0;
    }

    if (otherCollider.name == "solid copy<BoxCollider>" && this.isLeft)
    {
        this.canMoveLeft = false;        
        this.speed = 0;
    }

    if (otherCollider.name == "solid copy<BoxCollider>" && this.isRight)
    {
        this.canMoveRight = false;        
        this.speed = 0;
    }

    if (otherCollider.name == "solid copy<BoxCollider>" && this.isDown)
    {
        this.canMoveDown = false;        
        this.speed = 0;
    } 
 }

    onCollisionExit(otherCollider,selfCollider)
    {                     
        if (otherCollider.name == "solid copy<BoxCollider>")
        {
            this.canMoveUp = true;  
            this.canMoveDown = true;   
            this.canMoveRight = true;   
            this.canMoveLeft = true;             
        }
    }  


   move()
   {
       // movimiento del auto
        this.carX += Math.sin(this.angulo) * this.speed;
        this.carY += Math.cos(this.angulo) * this.speed;
        this.node.setPosition(this.carX, this.carY);
   }  

    rad2deg(angle)
    {
        // para transformar de radianos a grados
        var deg = angle * 180 / Math.PI
        return deg;
    }

    touchRetryBtn()
    {
        cc.director.loadScene("GameScene");
    }

    touchExitBtn()
    {
        cc.director.end();
    }

    touchMenuBtn()
    {
        cc.director.loadScene("TitleScreen");
    }
  
   
}
