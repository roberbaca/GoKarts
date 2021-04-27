

import GameController, { GameStatus } from "./gameController";


const {ccclass, property} = cc._decorator;

@ccclass
export default class raceTrackScript extends cc.Component 
{ 
 


 // variables
 zeta: number = 0;
 dx: number = 0;
 yhill: number = 0;
 control: number = 0;
 num: number = 0;

 
 
 onLoad () 
 {      
     
      
 }

 start () 
 {



 }

 update(dt)
{  
    
}

getZeta()
{
    return this.zeta;
}

}