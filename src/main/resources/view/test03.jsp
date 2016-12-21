<html>
<head>
    <meta charset="UTF-8">
    <title>登录页面</title>
    <link rel="stylesheet" href="index.css"/>
    <script src="../static/js/jquery%201.7.js"></script>
    <script>
        $(function(){
            $("#log").click(function(){
                var username = $("#username").val();
                var password = $("#password").val();
                console.log("username:"+username+";password:"+password);
                $.ajax({
                    type: 'POST',
                    url: "localhost:8089/test/testLogin.htm",
                    data: {"username":username,"password":password},
                    success: function(data){
                        alert(data);
                    },
                    error: function (data) {
                        alert("error");
                    }
                });
            })

        })


    </script>
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
                <p>帐号登录</p>
                <input class="username" id="username" placeholder="请填写邮箱">
                <input class="password" id="password" placeholder="请输入密码">

                <span class="forget">忘记密码？</span>
                <span class="login">没有帐号？立即注册免费注册</span>

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
</html>
