<html>
<head>
    <base href="<%=basePath%>">
    <script type="text/javascript" src="../../static/js/jquery 1.7.js"></script>
    <title>My RabbitMq Test</title>
    <script type="text/javascript">

    </script>
</head>

<body>
${routingKey}

<form id="rabbitForm" action="/rabbitMq/execute.htm" method="get">
    姓名:<input type="text" name="userName"><br/>
    性别:<input name="sex" type="text"><br/>
    年龄:<input name="age" type="text"><br/>
    <input type="submit" value="提交">
</form>

</body>
</html> 