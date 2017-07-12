/**
 * 登陆页面的功能
 * 主要是将用户名和密码发送给后端
 */
define(['jquery', 'cookie'], function ($) {
  $('.signin').on('click', function (e) {
    e.preventDefault()
    var name = $('#name').val()
    var pass = $('#pass').val()
    if (!name.trim() || !pass.trim()) {
      return window.alert('请输入用户名/密码!')
    }
    var options = {
      url: '/api/login',
      type: 'post',
      data: {
        tc_name: name,
        tc_pass: pass
      },
      success: function (data) {
        // 判断是否登陆成功!
        if (data.code == 200) {
          // 把用户头像和名字保存到cookie中
          $.cookie('userinfo', JSON.stringify(data.result), {
            expires: 7,
            path: '/'
          })
          window.location.href = '/bxgmy/views/index/dashboard.html'
        }
      },
      error: function () {
        window.alert('登陆失败！')
      }
    }
    $.ajax(options)
  })
})
