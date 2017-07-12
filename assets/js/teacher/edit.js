/**
 * Created by Administrator on 2017/7/11.
 */
/**
 * 添加讲师功能:
 * 1.对象表单控件进行验证
 * 2.使用日期插件对日期框进行初始化
 * 3.将验证通过后的表单数据发给后端
 * 4.发送成功后，重置表单
 */
require(['/bxgmy/assets/js/config.js'],function(){
    require(['jquery','/bxgmy/assets/js/getarg.js','/bxgmy/assets/js/common.js','datepicker','validate','form','zh'],function($,obj){
        $.ajax({
            url:'/api//teacher/edit',
            data:{tc_id:obj.tc_id},
            success:function(data){
                if(data.code===200){
                    $('input[name="tc_name"]').val(data.result.tc_name);
                    $('input[name="tc_join_date"]').val(data.result.tc_join_date);
                    var num=data.result.tc_type==0?1:0;
                    $($('select[name="tc_type"]').find('option')[num]).attr('selected', true)
                    var num1=data.result.tc_type==0?1:0;
                    $($('input[name="tc_gender"]')[num1]).attr('checked', true)


                }
            }
        });
        //表单验证
        $('form').validate({
            submitHandler:function(){
                $('form').ajaxSubmit({
                    url: '/api/teacher/update',
                    type: 'post',
                    data: {
                        tc_id: obj.tc_id
                    },
                    success: function (data) {
                        if (data.code === 200) {
                            window.alert(data.msg)
                        }
                    }
                })
            },
            rules:{
                tc_name:{
                    required:true,
                    rangelength:[2,10]
                }
            },
            messages:{
                tc_name:{
                    required:"不能为空",
                    rangelength:"长度2-10"
                }
            }
        })



    })


})

