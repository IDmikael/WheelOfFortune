var WheelController = cc.Class({
    extends: cc.Component,

    properties: {
        backg: {
            default: null,
            type: cc.Node
        },
        wheelBackg: {
            default: null,
            type: cc.Node
        },
        wheel_sound: {
            type: cc.AudioClip,
            default: null
        },
        fool_sound: {
            type: cc.AudioClip,
            default: null
        },
        arrow: {
            type: cc.Node,
            default: null
        },
        segments: [cc.Integer],
        winScore: Number,
        foolTexture: {
            type: cc.Texture2D, 
            default: null       
          },
        defaultTexture: {
            type: cc.Texture2D, 
            default: null     
        },
        foolModeValue: Boolean
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        WheelController.instance = this;
        this.foolModeValue = false;

        for (var i = 0; i < 16; i++){
            this.wheelBackg.getChildByName("l" + i).getComponent(cc.Label).string = "0";
        }

        while (this.segments.length != 16) {
            this.segments.push(0);
        }

        var req = cc.loader.getXMLHttpRequest();
        req.open("GET", 'localhost:3000/segments');
        req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
		req.onreadystatechange = () => {
			if (req.readyState == 4 && req.response != undefined){
                this.segments = [];
                JSON.parse(req.response).segmentsArray.forEach((elem, id) => {
                    this.wheelBackg.getChildByName("l" + id).getComponent(cc.Label).string = "" + elem;
                    this.segments.push(elem);
                });
            }
        }
        req.send();

    },

    start(){
        var MainSceneUI = require('MainSceneUI');
        cc.log("kjasn" + MainSceneUI.instance);
    },

    spinWheel(){

        if (this.foolModeValue){
            var anim = this.getComponent(cc.Animation);
            cc.audioEngine.playEffect(this.wheel_sound, false);
            anim.play("wheel_0");
            return;
        }

        let request = cc.loader.getXMLHttpRequest();
        request.open("POST", "localhost:3000/spin", true);
		request.setRequestHeader("Content-Type","application/json;charset=UTF-8");
		request.onreadystatechange = () => {
			if (request.readyState == 4 && request.response != undefined) {
                let rand = Number(JSON.parse(request.response).selectedSegment);
                cc.log("returned random: ", rand);
                
                var anim = this.getComponent(cc.Animation);
                anim.play("wheel_" + rand);
                cc.audioEngine.playEffect(this.wheel_sound, false);
			}
		};
		request.send();
    },

    onAnimationFinished(){
        if (this.foolModeValue){           
            this.backg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.foolTexture);
            cc.audioEngine.playEffect(this.fool_sound, false);
        }   

        var MainSceneUI = require('MainSceneUI');
        MainSceneUI.instance.updateScore();
        MainSceneUI.instance.btnSpin.interactable = true;
    },
    
    foolMode(enable){
        if (enable){            
            this.wheelBackg.getChildByName("l0").getComponent(cc.Label).string = "0";

            for(var i = 1; i < 16; i++){
                this.wheelBackg.getChildByName("l" + i).getComponent(cc.Label).string = "BIG WIN";
            }
        } 
        else {
            this.backg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.defaultTexture);          
            this.segments.forEach(function(elem, index){
                this.wheelBackg.getChildByName("l" + index).getComponent(cc.Label).string = "" + elem;
            }, this);
        }
    },

    randomInteger(min, max) {
        // to get random num from (min-0.5) to (max+0.5)
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }
});
