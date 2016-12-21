<head>
    <meta charset="UTF-8">
    <title>登录页面</title>
    <link rel="stylesheet" href="index.css"/>
    <script src="../static/js/jquery%201.7.js"></script>
    <script src="../static/js/index.js"></script>
    <script src=""></script>
    <#--<script>-->
        <#--$(function(){-->

            <#--$("#log").click(function(){-->
                <#--var username = $("#username").val();-->
                <#--var password = $("#password").val();-->
                <#--console.log("username:"+username+";password:"+password);-->
                <#--$.ajax({-->
                    <#--type: 'get',-->
                    <#--url: "/test/testLogin.htm",-->
                    <#--data: {"username":username,"password":password},-->
                    <#--success: function(data){-->
                        <#--var retCode=data.code;-->
                        <#--var retMessage=data.message;-->
                        <#--if("00"!=retCode){-->
                            <#--$("#wrong").html(retMessage).css("display","block");-->
                        <#--}-->
                    <#--},-->
                    <#--error: function (data) {-->
                        <#--alert("error");-->
                    <#--}-->
                <#--});-->
                <#--/*$("#login_form").submit();*/-->
            <#--})-->
        <#--});-->
    <#--</script>-->

</head>
<body>
<div class="nav">
    <div class="w">
        <div class="logo">
            <img src="" alt=""/>
        </div>
    </div>
</div>
<div class="banner">
    <div class="w">
        <div class="iform">
            <div class="validate">
                <p>会员-帐号登录</p>
                <div class="wrong" id="wrong">111</div>
                <form id="login_form" action="/test/testLogin.htm" method="get">
                    <input class="username" name="username" id="username" placeholder="请填写邮箱">
                    <input class="password" name="password" id="password" placeholder="请输入密码">
                </form>
                <span class="forget"><a href="#">忘记密码？</a></span>
                <span class="login"><a href="#">没有帐号？立即注册免费注册</a></span>

                <div class="entry" id="log">登录</div>

            </div>
        </div>
    </div>
</div>
<div class="footer">
    <div class="w">
        <p>© 2003-2016 ShopEx,Inc.All rights reserved.</p>
    </div>
</div>
</body>