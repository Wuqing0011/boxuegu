/**
 * 添加讲师功能:
 * 1.对象表单控件进行验证
 * 2.使用日期插件对日期框进行初始化
 * 3.将验证通过后的表单数据发给后端
 * 4.发送成功后，重置表单
 */
require(['/bxgmy/assets/js/config.js'],function(){
  require(['jquery','/bxgmy/assets/js/common.js','datepicker','validate','form','zh'],function($){
    //日期插件初始化
    $('input[name="tc_join_date"]').datepicker({
      format:'yyyy/mm/dd',
      language:'zh-CN'
    })
    //表单控件
    $('form').validate({
      submitHandler:function(){
        $('form').ajaxSubmit({
          url:'/api/teacher/add',
          type:'post',
          success:function(data){
            console.log(data);
            if(data.code==200){
              alert('添加成功')

            }
          }
        })
      },
      rules:{
        tc_name:{
          required:true
        }
      },
      messages:{
        tc_name:{
          required:"不能为空"
        }
      }



    })



  })


})
