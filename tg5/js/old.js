// 页面fontSize自适应
document.documentElement.style.fontSize = $('body').width() / 4.14 + 'px';
$(window).on('resize', function() {
  document.documentElement.style.fontSize = $('body').width() / 4.14 + 'px';
})

// 获取url中的参数
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

function orient() {
  if (window.orientation == 90 || window.orientation == -90) {
    // 横屏
    orientation = 'landscape';
    $('.landscape').show();
    return false;
  } else if (window.orientation == 0 || window.orientation == 180) {
    // 竖屏
    orientation = 'portrait';
    $('.landscape').hide();
    return false;
  }
}

function show01() {
  if ($('html').width() > 1100) {
    var w = $('html').width() - $('body').width();
    $('.show0').css('left', w / 2 - 300 + 'px');
    $('.show1').css('right', w / 2 - 300 + 'px');
    $('.show0').show('');
    $('.show1').show('');
  }else{
    $('.show0').hide('');
    $('.show1').hide('');
  }
}

// 用户变化屏幕方向时调用
$(window).bind('orientationchange', function(e) {
  orient();
});
$(window).resize(function() {
  show01();
});

// 浏览器
var ua = navigator.userAgent.toLowerCase();
var is_qq = ua.match(/\sqq\//i) == " qq/";
var is_safari = ua.indexOf("safari") > -1;
var is_micromessenger = ua.indexOf('micromessenger') > -1;

var is_ios = !!ua.match(/\(i[^;]+;( U;)? cpu.+mac os x/);
var is_android = ua.indexOf('android') > -1;

var id = getUrlParam('id');
var playurl = '/' + (id ? '?id=' + id : '')

// is_micromessenger = 1
if (is_micromessenger) {
  var msg = is_ios ? 'Safari' : '浏览器';
  $('.gobrowser p').html('请点击右上角的按钮<br/>并选择【在' + msg + '中打开】');
  $('.gobrowser').slideDown();
  $('.topbar').hide()
  $('.main').hide()
} else {
  $(".start-link").attr('href', playurl);
}

// 统计

// 按钮动画
setInterval(function() {
  $(".btn-start img").animate({ opacity: 0.5 }).animate({ opacity: 1 });
}, 900);

$(function() {
  orient();
  show01();
})