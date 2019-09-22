import NetworkManager from 'NetworkManager';

cc.Class({
    extends: cc.Component,

    properties: {
        audio: {
            type: cc.AudioClip,
            default: null
        },
        audio_music: {
            type: cc.AudioClip,
            default: null
        }
    },

    onLoad(){
        cc.director.preloadScene("MainScene", function () {
            cc.log("Main scene preloaded");
        });

        // check deprecated
        ['playMusic', 'playEffect'].forEach(function (name) {
            if (!cc.audioEngine[name]) {
                cc.warn('.' + name + ' is not found!');
            }
        });

        cc.audioEngine.playMusic(this.audio_music, true);

        this.getComponent(cc.Animation).play("slide_up").wrapMode = cc.WrapMode.Reverse;
    },

    onStartPressed(){
        if (!this.audio) return;

        cc.audioEngine.playEffect(this.audio, false);

        this.getComponent(cc.Animation).play("slide_up").wrapMode = cc.WrapMode.Normal;
        
    },

    loadMainScene(string){
        cc.log(this.getComponent(cc.Animation).getAnimationState('slide_up').wrapMode);
        if (string == "slide_up" && 
        this.getComponent(cc.Animation).getAnimationState('slide_up').wrapMode == cc.WrapMode.Normal){
            cc.director.loadScene("MainScene");
        }
    },

    // update (dt) {},
});
