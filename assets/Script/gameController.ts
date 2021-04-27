
const {ccclass, property} = cc._decorator;


export enum GameStatus
{
    // Estados del juego
    Game_Ready = 0,     // ready state
    Game_Playing,       // game playing
    Game_Over           // game Over
}


@ccclass
export default class GameController extends cc.Component 
{
    mainCamera: cc.Camera = null; 

    //Game State
    gameStatus: GameStatus = GameStatus.Game_Playing;  


/*
    @property(cc.Prefab)
    raceTrackPrefab:cc.Prefab  = null


    
    /*
    @property(cc.Prefab)
    palmTreePrefab:cc.Prefab  = null


    @property(cc.Prefab)
    enemyCarPrefab:cc.Prefab  = null
    */

    world: number = -100;


    onLoad () 
    {          
        
        //this.mainCamera = this.node.getChildByName("HUD_camera").getComponent(cc.Camera);

       // activamos el sistema de Colisiones
        var collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
         
        // debug draw
        collisionManager.enabledDebugDraw = false;        
    }

    start () 
    {
        for (let i = 0; i < 190; i++)
	    {
		    //var newRaceTrack = cc.instantiate(this.raceTrackPrefab);       
    	    //newRaceTrack.setPosition(0, 0 - i);           
		    //newRaceTrack.width =  1500 / (this.world / (newRaceTrack.position.y));
            //newRaceTrack.opacity = -500/ (this.world / (newRaceTrack.position.y));
    	    //this.node.getChildByName("raceTrack").addChild(newRaceTrack);  	
	    }
    }

    update (dt) 
    {
       
        
    }

    createRaceTrack()
    {
    	
    }

   
  
    
}
