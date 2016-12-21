<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="../../test/testo4.css"/>
    <script src="../static/js/jquery%201.7.js"></script>
    <script>
        $(function(){

            var a=1;
            $.ajax({
                type: 'get',
                url: "/test/getCity.htm",
                success: function(val){
                    //[{"cityId":"0","cityName":"城市名称0"},
                    // {"cityId":"1","cityName":"城市名称1"}]

                    //{"message":null,
                    // "data":[{"cityId":"0","cityName":"城市名称0"},
                    // {"cityId":"1","cityName":"城市名称1"}],
                    // "code":"00"}

                    //{"message":"成功",
                    // "data":{"message":null,"data":[{"cityId":"0","cityName":"城市名称0"},{"cityId":"1","cityName":"城市名称1"}
                    //],"code":"00"},"code":"00"}


                    var code = val.data.code;
                    var data1= val.data;
                    var data = data1.data;
                    var cities = "<li>";
                    /*for(var i = 0;i<data.length;i++){
                        var cityName = data[i].cityName;
                        var cityId = data[i].cityId;
                        cities+="<span title="+cityName+">"+cityName+"</span>";
                    }*/

                    $.each(data,function(k,v){
                        var cityName =v.cityName;
                        var cityId =v.cityId;
                        cities+="<span title="+cityName+">"+cityName+"</span>";
                    });
                    cities+="</li>";

                    $("#cities").html(cities);
                },
                error: function (data) {
                    alert("error");
                }
            });
        })
    </script>
    <script>



    </script>
</head>
<body>
<div class="whole">
    <div class="w">
        <div class="city">
            <div class="tit">切换城市</div>
            <hr/>
            <div class="change">
                <p>您好，欢迎来到乐牙网!选择城市，为您提供更精准的门诊信息。</p>
                <p>点击进入<span>上海</span>or 切换到以下城市</p>
            </div>

            <div class="checkbox">
                <ul class="multi" id="cities">
                    <#--<li>-->
                        <#--<#list cities as city>-->
                        <#--<span title="${city.cityName}">${city.cityName}</span>-->
                        <#--</#list>-->
                    <#--</li>-->

                    <#--<li>-->
                        <#--<span>北京</span><span>上海</span><span>广州</span><span>深圳</span><span>杭州</span><span>南京</span><span>天津</span>-->
                    <#--</li>-->
                    <#--<li>-->
                        <#--<span>北京</span><span>上海</span><span>广州</span><span>深圳</span><span>杭州</span><span>南京</span><span>天津</span>-->
                    <#--</li>-->
                    <#--<li>-->
                        <#--<span>北京</span><span>上海</span><span>广州</span><span>深圳</span><span>杭州</span><span>南京</span><span>天津</span>-->
                    <#--</li>-->
                    <#--<li>-->
                        <#--<span>北京</span><span>上海</span><span>广州</span><span>深圳</span><span>杭州</span><span>南京</span><span>天津</span>-->
                    <#--</li>-->
                    <#--<li>-->
                        <#--<span>北京</span><span>上海</span><span>广州</span><span>深圳</span><span>杭州</span><span>南京</span><span>天津</span>-->
                    <#--</li>-->
                    <#--<li>-->
                        <#--<span>北京</span><span>上海</span><span>广州</span><span>深圳</span><span>杭州</span><span>南京</span><span>天津</span>-->
                    <#--</li>-->
                </ul>

            </div>



        </div>
    </div>

</div>

</body>
</html>