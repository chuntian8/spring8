$(function(){
    var iosUrl = '',androidUrl = '';
    var timestamp = '';
    var channel = getUrlKey('channel');
    var ad = getUrlKey('ad');
    init(channel,ad);

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

    //下载页面点击下载按钮
    $('.down_btn').click(function(){
        if(regParam.isWeiXin() || regParam.isQQ()){
            alert("点击右上角，使用浏览器打开下载");
            return;
        }
        if(regParam.isApple()){
            if(iosUrl){
                maskShow();
                window.location.href = iosUrl;
            }else{
                alert("暂无苹果安裝包，请使用安卓设备下载");
            }
        }else{
            maskShow();
            window.location.href = androidUrl;
        }
    });

    //下载页面点击进入游戏
    $('.down_play').click(function(){
        window.location.href = 'http://www.blggg.com/bjl/';
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

    function init(a1,a2){
        if(a1 == 'BAC_BL_A'){
            $('#channel1').hide();
            $('#channel2').show();
            $('.down_play').hide();
            iosUrl = 'itms-services:///?action=download-manifest&url=https://bacbla.oss-cn-shenzhen.aliyuncs.com/ios/bac_a.plist';
            androidUrl = 'https://bacbla.oss-cn-shenzhen.aliyuncs.com/android/bac_bl_a.apk';
            $('.tip1').hide();
            if(a2 == 'sg'){
                $('.tip1').hide();
                $.getScript("https://s96.cnzz.com/z_stat.php?id=1276282229&web_id=1276282229");
            }else if(a2 == 'sm'){
                $('.tip1').show();
            }
        }else{
            $('#channel1').show();
            $('#channel2').hide();
            $('.down_play').show();
            $('.tip1').hide();
            iosUrl = 'itms-services:///?action=download-manifest&url=https://bacpub.oss-cn-shenzhen.aliyuncs.com/ios/bac.plist';
            androidUrl = 'https://bacpub.oss-cn-shenzhen.aliyuncs.com/android/bac.apk';
        }
    }

    function maskShow(){
        $('.box').show();
        downloadCount();
        setTimeout(function(){ $('.box').hide();},3000)
    }

    function downloadCount() {
        if(timestamp == ''){
            timestamp = (new Date()).getTime();
        }else{
            var timestamp1 = (new Date()).getTime();
            var cha = parseInt((timestamp1-timestamp)/1000);
            if(cha < 300)return;
        }
        ajaxRequest('get','/login/downloadCount.jsp');
    }

    //网络请求
    function ajaxRequest(type,url,data,success){
        var funUrl = "http://103.243.182.93:8085/bac-web";
        url = funUrl + url;
        $.ajax({
            type: type,
            url: url,
            data: data,
            dataType: "json",
            success: function(res){
                if(success)success(res);
            },
            error:function(res){
                //alert('请求失败');
            }
        });
    }
});
