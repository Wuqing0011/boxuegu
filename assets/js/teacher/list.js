/**
 * 讲师列表页面需要完成的功能:
 * 1.展示讲师列表
 * 2.点击查看按钮，弹出模态框,并显示讲师详细信息
 * 3.点击添加讲师跳转到添加讲师的页面
 * 4.点击编辑跳转到编辑页面
 * 5.点击注销，或者启用，将注销或者启用讲师
 */
require(['/bxgmy/assets/js/config.js'],function(){
  require(['jquery','template','bootstrap','/bxgmy/assets/js/common.js'],function($,template){

      getTeacherList ();
      getDetailInfo();
      stopOrStart ();
      //获取列表信息

      function getTeacherList (){
          $.ajax({
              url:'/api/teacher',
              success:function(data){
                  if(data.code==200){
                      var res={list:data.result}
                      var html=template('tmpl-list',res);
                      $('#list').html(html);
                  }else{
                      alert('获取数据出错');
                  }
              },
              error:function(e){
                  console.log(e);
              }
          })
      }
      //传入出生日期,返回年龄
    function getAge(birth){
        var birthYear=new Date(birth).getFullYear(),
            nowYear=new Date().getFullYear()
            return nowYear-birthYear
    }
      template.defaults.imports.getTecAge = getAge

    //弹出模态框查看
     function getDetailInfo(){
         $('#list').on('click','.preview',function(){
             $('#teacherModal').modal();
            var tcId=$(this).closest('tr').attr('tc-id');
             var options={
                 url:'/api/teacher/view',
                 data:{
                     tc_id:tcId
                 },
                 success:function(data){
                        if(data.code==200){
                            console.log(data);
                            var obj=data.result;
                            var result = `
                        <tr>
                            <th>姓名:</th>
                            <td>${obj.tc_name}</td>
                            <th>职位:</th>
                            <td colspan="3">讲师</td>
                                <td rowspan="4" width="128">
                                <div class="avatar">
                                <img src="${obj.tc_avatar}" alt="">
                                </div>
                                </td>
                                </tr>
                                <tr>
                                <th>花名:</th>
                            <td>${obj.tc_roster}</td>
                            <th>年龄:</th>
                            <td colspan="3">${getAge(obj.tc_birthday)}</td>
                                </tr>
                                <tr>
                                <th>性别:</th>
                            <td>${obj.tc_gender === '0' ? '男' : '女'}</td>
                            <th>入职日期日期:</th>
                            <td colspan="3">${obj.tc_join_date}</td>
                                </tr>
                                <tr>
                                <th>手机号码:</th>
                            <td colspan="2">${obj.tc_cellphone}</td>
                                <th>邮箱:</th>
                            <td colspan="2">${obj.tc_email}</td>
                                </tr>
                                <tr>
                                <th>籍贯:</th>
                            <td colspan="6">${obj.tc_hometown}</td>
                                </tr>
                                <tr>
                                <td colspan="7">
                                <div class="introduce">
                                    ${obj.tc_introduce}
                                </div>
                                </td>
                                </tr>
              `
                            $('#modal-list').html(result)
                        }
                 }
             }
             $.ajax(options)
         })
     }

    //注销或启用
      function stopOrStart (){
          $('#list').on('click','.start-stop',function(){
              var $this = $(this)
              var $tr = $this.closest('tr')
              var tcId = $tr.attr('tc-id')
              var tcStatus = $tr.attr('tc-status')
              $.ajax({
                  url: '/api/teacher/handle',
                  type: 'post',
                  data: {
                      tc_id: tcId,
                      tc_status: tcStatus
                  },
                  success:function(data){

                      if(data.code==200){
                          var str=data.result.tc_status==0?'启用':'注销';
                          $tr.attr('tc-status',data.result.tc_status);
                          $this.text(str);
                      }
                  }
              })
          })
      }


  })
})
