/**
 * Created by maguoqiang on 2016/11/12.
 *
 */
$(function(){
    $("#log").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        console.log("username:"+username+";password:"+password);
        $.ajax({
            type: 'get',
            url: "/test/testLogin.htm",
            data: {"username":username,"password":password},
            success: function(data){
                var retCode=data.code;
                var retMessage=data.message;
                if("00"!=retCode){
                    $("#wrong").html(retMessage).css("display","block");
                }else{
                    window.location.href="verifyMobile.htm";
                }
            },
            error: function (data) {
                alert("error");
            }
        });
        /*$("#login_form").submit();*/
    })
});