/**
 * 这里书写多个页面公用的js代码
 * 这里写上多个页面会共同使用的js代码
 * 多个页面公用的功能有:
 * 1.判断用户是否登陆
 * 2.点击退出按钮时,退出登陆
 * 3.从cookie获取用户头像并展示
 * 4.左侧导航菜单的收起与展开
 * 5.页面加载里顶部展示进度条
 * 6.发ajax请求顶部展示进度条
 * */
define(['jquery','nprogress','cookie'], function ($, NProgress) {
  validSignIn()
  signOut()
  showUserInfo()
  menuSlideToggle()
  showProgress()
  ajaxProgress()

  // 判断用户是否
  function validSignIn () {
    var sessionId = $.cookie('PHPSESSID')
    if (!sessionId) {
      window.location.href = '/bxgmy/views/index/login.html'
    }
  }

  // 注册退出按钮的点击
  function signOut () {
    $('.fa-sign-out').closest('li')
    .on('click', function () {
      $.ajax({
        url: '/api/logout',
        type: 'post',
        success: function (data) {
          if (parseInt(data.code) === 200) {
            window.location.href = '/bxgmy/views/index/login.html'
          }
        }
      })
    })
  }

  //e获取用户头像并展示
  function showUserInfo () {
    var userInfo = $.cookie('userinfo')
    if (!userInfo) {
      return
    }
    var obj = JSON.parse(userInfo)
    var $profile = $('.profile')
    $profile.find('img').attr('src', obj.tc_avatar)
    $profile.children('h4').html(obj.tc_name)
  }

  // 左侧导航菜单的收起来展开
  function menuSlideToggle () {
    // 左侧菜单点击时，自动收起来展开
    $('.navs ul').prev('a')
    .on('click', function () {
      $(this).next().slideToggle()
    })
  }

  // 页面加载时，展示顶部进度条
  function showProgress () {
    NProgress.start()
    $(function () {
      NProgress.done()
    })
  }

  // 发ajax请求顶部也展示进度条
  function ajaxProgress () {
    $(document).ajaxStart(function () {
      NProgress.start();
    });
    $(document).ajaxStop(function () {
      NProgress.done()
    })
  };
  $(function(){
    NProgress.done()
  })
})
