var MainSceneUI = cc.Class({
    extends: cc.Component,

    properties: {
        score: {
            type: cc.Label,
            default: null
        },
        btnSpin: {
            type: cc.Button,
            default: null            
        },
        audio_button: {
            type: cc.AudioClip,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad(){
        MainSceneUI.instance = this;
        this.updateScore();
    },

    onSpinPressed(){
        if (!this.audio_button) return;

        cc.audioEngine.playEffect(this.audio_button, false);

        this.btnSpin.interactable = false;
       
        var WheelController = require('WheelController');
        WheelController.instance.spinWheel();
    },

    onBackPressed(){
        if (!this.audio_button) return;

        cc.audioEngine.playEffect(this.audio_button, false);

        var MainScene = require('MainScene');
        MainScene.instance.back();
    },

    onFoolModePressed(){
        if (!this.audio_button) return;

        cc.audioEngine.playEffect(this.audio_button, false);
        
        var WheelController = require('WheelController');
        WheelController.instance.foolModeValue = !WheelController.instance.foolModeValue;
        WheelController.instance.foolMode(WheelController.instance.foolModeValue);
        cc.log("fool mode: " + WheelController.instance.foolModeValue);
    },

    updateScore(){
        let request = cc.loader.getXMLHttpRequest();
        request.open("GET", "localhost:3000/score", true);
		request.setRequestHeader("Content-Type","application/json;charset=UTF-8");
		request.onreadystatechange = () => {
			if (request.readyState == 4 && request.response != undefined) {
                let scoreNum = Number(JSON.parse(request.response).score);
                this.score.string = this.nFormatter(scoreNum, 3);
			}
		};
		request.send();       
    },

    nFormatter(num, digits) {
        var si = [
          { value: 1, symbol: "" },
          { value: 1E3, symbol: "k" },
          { value: 1E6, symbol: "M" },
          { value: 1E9, symbol: "G" },
          { value: 1E12, symbol: "T" },
          { value: 1E15, symbol: "P" },
          { value: 1E18, symbol: "E" }
        ];
        var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var i;
        for (i = si.length - 1; i > 0; i--) {
          if (num >= si[i].value) {
            break;
          }
        }
        return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
      }
      
    // update (dt) {},
});
