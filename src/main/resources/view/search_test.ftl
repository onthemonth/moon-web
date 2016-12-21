
<head>
    <meta charset="UTF-8">
    <title>search</title>
    <style type="text/css">
        *{padding: 0;margin: 0}
        .search-box{
            width: 800px;
            margin: 40px auto;
        }
        .search-tab{
            height: 26px;
        }
        .search-tab a{
            display: inline-block;
            width: 86px;
            height: 26px;
            line-height: 26px;
            color: #165ff2;
            font-size: 12px;
            text-align: center;
            text-decoration: none;
        }
        .search-tab a:hover{
            background: #dae6fd;
        }
        .search-tab a.active{
            background: #165ff2;
            color: #ffffff;
        }
        .search-all{
            border: 2px solid #165ff2;
            height: 36px;
        }
        .search-form{
            overflow: hidden;zoom:1;
        }
        .search-form-left{
            width: 538px;
            float: left;
        }
        .search-all input[type='text']{
            width: 430px;
            height: 36px;
            line-height: 36px;
            font-size: 14px;
            color: #434343;
            border: 0;
            outline: none;
            padding: 0 15px;
        }
        .search-all button{
            width: 100px;
            height: 36px;
            color: #ffffff;border: 0;
            background: #165ff2;
            outline: none;
            cursor: pointer;
            font-size: 14px;

        }
        .search-release{
            float: right;
        }
        .search-release a{
            width: 98px;
            height: 36px;
            color: #165ff2;
            display: block;
            line-height: 36px;
            text-align: center;
            text-decoration: none;
            font-size: 14px;
        }
        .service-list{
            margin-top: 10px;
        }
        .service-list a{
            font-size: 12px;
            padding-right: 20px;
            text-decoration: none;
            line-height: 21px;
            color: #434343;
        }
    </style>
</head>
<body>
<div class="search-box">
    <div class="search-tab">
        <a href="javascript:void (0)" class="service">服务</a>
        <a href="javascript:void (0)" class="provider">服务商</a>
    </div>
    <div class="search-form">
        <form method="post" action="/test/toSearch.htm">
            <div class="search-form-left">
                <div class="search-all">
                    <input type="text" name="content">
                    <input type="hidden" id="type" name="type" value="${type}">
                    <button type="submit">搜索</button>
                </div>
                <div class="service-list" style="display: none;">
                    <a href="#">无限视频</a>
                    <a href="#">服务定制</a>
                    <a href="#">旺铺智能版</a>
                    <a href="#">自动补库存</a>
                    <a href="#">进销货</a>
                    <a href="#">限时打折</a>
                    <a href="#">实时绩效</a>
                </div>
            </div>
        </form>

        <div class="search-release search-all">
            <a href="#">发布需求</a>
        </div>
    </div>
</div>
<script src="../static/js/jquery%201.7.js"></script>
<script type="text/javascript">
    $(function(){
        var type=$("#type").val();
        if(1==type){
            searchTab($(".service"),'搜索你需要的服务',true);
        }else if(2==type){
            searchTab($(".provider"),'搜索你需要的服务商',false);
        }else{
            searchTab($(".service"),'搜索你需要的服务',true);
        }
        $('.search-tab')
                .on('click','.service',function(){
                    searchTab($(this),'搜索你需要的服务',true);
                    $("#type").val(1);

                })
                .on('click','.provider',function(){
                    searchTab($(this),'搜索你需要的服务商',false);
                    $("#type").val(2);

                })

    });
    function searchTab(obj,content,isShow){
        obj.addClass('active').siblings().removeClass('active');
        obj.parents('.search-box').find('input[type="text"]').attr('placeholder',content);
        if(isShow){
            obj.parents('.search-box').find('.service-list').show();
        }else{
            obj.parents('.search-box').find('.service-list').hide();
        }

    }
</script>
</body>
