// 页面fontSize自适应
document.documentElement.style.fontSize = $(document.documentElement).width() / 7.68 + 'px';
$(window).on('resize', function() {
  document.documentElement.style.fontSize = $(document.documentElement).width() / 7.68 + 'px';
})

//判断浏览器
var isMobile = function() {
  if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
    return true;
  } else {
    return false;
  }
}

// 判断是否APP
var isApp = function() {
  var from = getUrlParam('from');
  var isapp = $.cookie('isapp');
  if (isapp > 0) {
    $.cookie('isapp', '1', { expires: 7, path: '/' });
    return true;
  } else if (from != null) {
    $.cookie('isapp', '1', { expires: 7, path: '/' });
    return true;
  } else {
    return false;
  }
}

jQuery(document).ready(function($) {
  // 登录状态
//if ($(".logininfo").length > 0) {
//  $.post('https:/haikuchina.com/index/index/logininfo', {}, function(data, textStatus, xhr) {
//    /*optional stuff to do after success */
//    $('.logininfo').html(data)
//  });
//}

  // 推荐人
var tuijianren = getUrlParam('id');
//var tuijianren = 1218517;
  if (tuijianren) {
    console.log('set tuijianren:' + tuijianren);
    $.cookie('tuijianren', tuijianren, { expires: 90, path: '/' });
  }

  var tuijianren = $.cookie('tuijianren');
  if (tuijianren > 0) {
    $("#tuijianren").attr('readonly', 'readonly');
    $("#tuijianren").val(tuijianren)
  }
});

function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

function register(obj) {
  $(obj).find('.btn').attr('disabled', 'disabled');
  $(obj).find('.btn').html('<i class="fa fa-refresh fa-spin"></i> 注册中...')
  $.post('/index/user/register', $(obj).serialize(), function(data, textStatus, xhr) {
    /*optional stuff to do after success */
    if (data.code > 0) {
      layer.open({ content: data.msg, btn: '确定', closeBtn: 0 });
      gotoGame(data.data.username, data.data.usertoken)
    } else {
      $(obj).find('#captcha img').click();
      $(obj).find('.btn').removeAttr('disabled')
      $(obj).find('.btn').html('提交注册')
      // $(obj)[0].reset();
      layer.open({ content: data.msg, btn: '确定', closeBtn: 0 });
    }
  });

  return false;
}

function login(obj) {
  $(obj).find('button').attr('disabled', 'disabled');
  $(obj).find('button').html('<i class="fa fa-refresh fa-spin"></i> 登录中...')
  // $.post('/index/user/login', $(obj).serialize(), function(data, textStatus, xhr) {
  //   /*optional stuff to do after success */
  //   if (data.code > 0) {
  //     gotoGame(data.data.username, data.data.usertoken)
  //   } else {
  //     layer.open({ content: data.msg, btn: '确定', closeBtn: 0 });
  //     $(obj).find('button').removeAttr('disabled')
  //     $(obj).find('button').html('登录')
  //   }
  // });
  $.ajax({
    url: "/index/user/login",
    data: $(obj).serialize(),
    dataType: "json",
    error: function(xhr, status, error) {
      layer.open({ content: "登录失败(" + error + ")，请稍后再试。", btn: '确定', closeBtn: 0 });
      $(obj).find('button').removeAttr('disabled')
      $(obj).find('button').html('登录')
    },
    success: function(result, status, xhr) {
      if (result.code > 0) {
        gotoGame(result.data.username, result.data.usertoken)
      } else {
        layer.open({ content: result.msg, btn: '确定', closeBtn: 0 });
        $(obj).find('button').removeAttr('disabled')
        $(obj).find('button').html('登录')
      }
    }
  });

  return false;
}

function forget(obj) {
  $(obj).find('button').attr('disabled', 'disabled');
  $(obj).find('button').html('<i class="fa fa-refresh fa-spin"></i> 提交审核中...')
  $.post('/index/user/forget', $(obj).serialize(), function(data, textStatus, xhr) {
    /*optional stuff to do after success */
    if (data.code > 0) {
      layer.open({ content: data.msg, btn: '确定', closeBtn: 0 });
      location.reload()
    } else {
      layer.open({ content: data.msg, btn: '确定', closeBtn: 0 });
      $(obj)[0].reset();
      $(obj).find('button').removeAttr('disabled')
      $(obj).find('button').html('提交审核')
    }
  });

  return false;
}

function gotoGame(username, token, gameid) {
  if (gameid < 100) {
    gameid = getUrlParam(gameid)
  }
  window.location.href = "/index/user/playgame";
}