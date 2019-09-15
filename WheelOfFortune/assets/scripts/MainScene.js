var MainScene = cc.Class({
    extends: cc.Component,

    properties: {
        audio_music: {
            type: cc.AudioClip,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        MainScene.instance = this;

        cc.director.preloadScene("MainScene", function () {
            cc.log("Start scene preloaded");
        });

        if (!this.audio_music) return;

        cc.audioEngine.playMusic(this.audio_music, true);

        var anim = this.getComponent(cc.Animation);
        anim.wrapMode = cc.WrapMode.Normal;

        anim.play("fade_in", 0);
    },

    back (){
        this.getComponent(cc.Animation).play("fade_in").wrapMode = cc.WrapMode.Reverse;
        cc.audioEngine.stopMusic();
    },

    anim_started(string){
        if (string == "fade_in" && 
        this.getComponent(cc.Animation).getAnimationState('fade_in').wrapMode == cc.WrapMode.Reverse){
            cc.director.loadScene("StartScene");
        }
    },

    anim_finished(string){

    }

    // update (dt) {},
});
