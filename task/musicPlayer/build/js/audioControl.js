!function(i,t){i(document.body);function o(){this.audio=new Audio,this.status="pause"}o.prototype={play:function(){this.audio.play(),this.status="play"},pause:function(){this.audio.pause(),this.status="pause"},getAudio:function(i){this.audio.src=i,this.audio.load()},playTo:function(i){this.audio.currentTime=i,this.play()}},t.audioControl=o}(window.Zepto,window.player||(window.player={}));