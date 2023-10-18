import { _decorator, Collider2D, Component, Contact2DType, EventTouch, Input, input, Node, Prefab, instantiate, Vec3, director} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    private gameOver: Node = null;

    private isGameOver: boolean = false;
    private speedTurun:number = 100;
    
   

    start() {
        input.on(Input.EventType.TOUCH_START,this.onInputReceived,this);
        this.node.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT,this.onCollide,this);

        this.gameOver = this.node.parent.getChildByName('gameover');

        if (this.gameOver) {
            this.gameOver.active = false;
            //this.restart.active = false;
            if (this.gameOver.parent) {
                this.gameOver.setSiblingIndex(this.gameOver.parent.children.length - 1);
            }
        }
    }
    onCollide(){

        
         if (!this.isGameOver) {
            //this.node.setRotationFromEuler(0, 0, -90);
            //this.speedTurun = 0;

            if (this.gameOver) {
                this.gameOver.active = true;
                // Setel urutan rendering "Game Over" ke paling depan
                if (this.gameOver.parent) {
                    this.gameOver.setSiblingIndex(this.gameOver.parent.children.length - 1);
                }
                director.pause();
            }
            this.isGameOver = true;
            input.off(Input.EventType.TOUCH_START, this.onInputReceived, this);
        }
    }

   

    onInputReceived(event:EventTouch){
        this.speedTurun = 150;
    }

    update(deltaTime: number) {
        

        let position = this.node.getPosition();

        if(position.y>240 || position.y<-240){
            this.onCollide();
        }

        this.speedTurun -= 200*deltaTime;
        position.y += this.speedTurun*deltaTime;
        this.node.setPosition(position);
        let angle = this.speedTurun;
        if(angle>=30){
            angle = 30;
        }else if(angle<=-30){
            angle = -30;
        }
        this.node.setRotationFromEuler(0,0,angle);
    }
}

