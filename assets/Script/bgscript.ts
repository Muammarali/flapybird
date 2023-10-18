import { _decorator, Component, instantiate, Node, Prefab, randomRangeInt, Vec3,Label} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Background')
export class Background extends Component {

    @property({ type: Node })
    private parentBackground: Node;

    

    @property({ type: Prefab })
    private prefabPipa: Prefab;

    private pipa: Node[] = [];

    @property({type :Label})
    private skorLabel: Label = null;
    private hitungPipa: number = 0;
    private cekStop: boolean = false;

    private mulai: boolean = false;

    hitung(num:number){
        this.hitungPipa = num;
        this.skorLabel.string = ('' + this.hitungPipa);
    }

    tambah(){
        this.hitung(this.hitungPipa + 1);
    }

    berhenti(pipa:number):boolean{
        if(pipa<0){
            return true;
        }
        else{
            return false;
        }
    }

    start() {
        // this.parentBackground.setPosition(new Vec3(-100,0,0));
        // this.node.setPosition(new Vec3(-100,0,0));

        let pipaObj = instantiate(this.prefabPipa);
        pipaObj.setParent(this.node.parent);
        pipaObj.setPosition(new Vec3(200, 0, 0));
        this.pipa.push(pipaObj);

        //pipa 0 - posisi 0,0 ----> x = 0

        // pipaObj = instantiate(this.prefabPipa);
        // pipaObj.setParent(this.node.parent);
        // pipaObj.setPosition(new Vec3(144+288,0,0));
        // //pipa 1 - posisi 288,0 ----> x = 288
        // this.pipa.push(pipaObj);
    }
    
    update(deltaTime: number) {
        let position = this.node.getPosition();
        position.x -= (288) / 5 * deltaTime;//S = v*t
        if (position.x <= -288) {
            position.x += 288;
        }
        this.node.setPosition(position);

        for (let i = 0; i < this.pipa.length; i++) {
            let positionPipa = this.pipa[i].getPosition();
            positionPipa.x -= (566) / 5 * deltaTime;

            if(this.berhenti(positionPipa.x)&& !this.cekStop){
                this.tambah();
                this.cekStop = true;
            }

            if (positionPipa.x <= -200) {
                positionPipa.x += (288 + 56 + 56);
                positionPipa.y = randomRangeInt(-120, 120);
                this.cekStop = false;
                //pipa 0 - posisi x = -288 += 288 -> 0
                //pipa 1 - posisi x = -288 += 288 -> 0
            }
            this.pipa[i].setPosition(positionPipa);
        }
    }

}