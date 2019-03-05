$(function(){
    var iosUrl = '',androidUrl = '';
    var timestamp = '';
    var channel = getUrlKey('channel');
    init();

    //轮播图效果
    if($("#carousel").length){
        $("#carousel").featureCarousel({
            largeFeatureWidth :     .4,
            largeFeatureHeight:		.4,
            smallFeatureWidth:      .35,
            smallFeatureHeight:		.35,
            topPadding:             0,
            sidePadding:            0,
            smallFeatureOffset:		10,
            startingFeature:        1,
            carouselSpeed:          1000,
            autoPlay:               1330,
            counterStyle:           1,
            preload:                true,
            displayCutoff:          0,
            animationEasing:        'swing',
            movedToCenter:function(sender){
                var idx = sender.context.getElementsByTagName("img")[0].getAttribute("data-id");
                $("#text-roasting").attr("src","img/text_roasting_"+idx+".png");
            }
        });
    }

//安卓下载
  $('.down_btn').click(function(){
        if(regParam.isWeiXin() || regParam.isQQ()){
            alert("点击右上角，使用浏览器打开下载");
            return;
        }else{
            maskShow();
            window.location.href = androidUrl;
        }
    });
    //下载页面点击进入游戏 ios下载
    $('.down_play').click(function(){   
    	if(regParam.isWeiXin() || regParam.isQQ()){
            alert("点击右上角，使用浏览器打开下载");
            return;
        }else{
        	 maskShow();
             window.location.href = iosUrl;
        }if(regParam.isApple()){
            if(iosUrl){
                maskShow();
                window.location.href = iosUrl;
            }
        }else{
            maskShow();
            return;
        }
		
    });

    //点击底部
    $('.tip2').click(function(){
        window.location.href="tip.html"; 
    });

    //正则匹配
    var regParam = {
        userAgent:navigator.userAgent.toLowerCase(),
        regPhone:function(phone){
            return ((11 && /^[1][3,4,5,7,8,9][0-9]{9}$/).test(phone))
        },
        isApple:function(){
            return (/iphone|ipod|ipad|macintosh/i.test(this.userAgent));
        },
        isAndroid:function(){
            return (/android/i.test(this.userAgent));
        },
        isWeiXin:function(){
            return (/micromessenger/i.test(this.userAgent));
        },
        isQQbrw:function(){   //QQ浏览器
            return (/mqqbrowser/i.test(this.userAgent));
        },
        isQQ:function(){
            return !this.isQQbrw() && (/qq/i.test(this.userAgent));
        }
    }
    if(regParam.isApple()){
        $('.tip2').show();
    }
    //获取url参数
    function getUrlKey(name){
        return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
    }

    function init(){
        if(channel == 'BAC_BL_A'){
            $('#channel1').hide();
            $('#channel2').show();
            $('.down_play').hide();
            iosUrl = 'itms-services:///?action=download-manifest&url=http://bacjiujiuqudaoa.oss-cn-shenzhen.aliyuncs.com/ios/bac_a.plist';
            androidUrl = 'http://bacjiujiuqudaoa.oss-cn-shenzhen.aliyuncs.com/android/bac_a.apk';
        }else{
            $('#channel1').show();
            $('#channel2').hide();
            $('.down_play').show();
			iosUrl = 'itms-services:///?action=download-manifest&url=https://bacjiujiu.oss-cn-shenzhen.aliyuncs.com/ios/bac.plist';
            androidUrl = 'https://bacjiujiu.oss-cn-shenzhen.aliyuncs.com/android/bac.apk';
        }
    }

    function maskShow(){
        $('.box').show();
        setTimeout(function(){ $('.box').hide();},3000)
    }
});
