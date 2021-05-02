
const {ccclass, property} = cc._decorator;

@ccclass
export default class MainMenu extends cc.Component 
{
    //start button    
    btnStart: cc.Button = null;

    //start button    
    btnExit: cc.Button = null;
    
      // Logo
    @property(cc.Node)
    logo: cc.Node = null;

    @property(cc.Node)
    blackScreen: cc.Node = null;

    fadein: boolean = false;

    fadeout: boolean = false;

    onLoad () 
    {           

        cc.director.preloadScene('TutorialScene');
    
         // busca el boton Start
         this.btnStart = this.node.getChildByName("PlayBtn").getComponent(cc.Button);
         this.btnStart.node.on(cc.Node.EventType.TOUCH_END,this.touchStartBtn,this);  

           // busca el boton Exit
           this.btnExit = this.node.getChildByName("ExitBtn").getComponent(cc.Button);
           this.btnExit.node.on(cc.Node.EventType.TOUCH_END,this.touchExitBtn,this); 

    }

    update(dt)
    {
        if (this.fadein)
        {
            this.blackScreen.opacity -= dt * 60;
        }

        if (this.fadeout)
        {
            this.logo.opacity -= dt * 90;
        }
    }

    start () 
    {
        this.btnStart.node.active = false;
        this.schedule(this.fadeIn, 2, 0);
        this.schedule(this.fadeOut, 7, 0);
        this.schedule(this.menuOn, 9, 0);

    }

    touchStartBtn()
    {        
        cc.director.loadScene('TutorialScene');  
    }

    touchExitBtn()
    {        
        cc.director.end();
    }

    menuOn()
    {
        this.btnStart.node.active = true;
        //this.logo.active = false;
    }

    fadeIn()
    {
        this.fadein = true;
    }


    fadeOut()
    {
        this.fadeout = true;
    }

    

}

