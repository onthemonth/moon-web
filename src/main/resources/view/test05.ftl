<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="../../test/test05.css"/>
    <#-- /test/getPeople.htm -->



    <#--

       {"code":"00","message":"请求成功",
       "data":
           [
               {"name":"姓名0","education":"学历0","grade":"院长","position":"牙医","company":"公司0","experience":"0","specialty":"修牙"},
               {"name":"姓名1","education":"学历1","grade":"院长","position":"牙医","company":"公司1","experience":"1","specialty":"修牙"},
               {"name":"姓名2","education":"学历2","grade":"院长","position":"牙医","company":"公司2","experience":"2","specialty":"修牙"},
               {"name":"姓名3","education":"学历3","grade":"院长","position":"牙医","company":"公司3","experience":"3","specialty":"修牙"},
               {"name":"姓名4","education":"学历4","grade":"院长","position":"牙医","company":"公司4","experience":"4","specialty":"修牙"},
               {"name":"姓名5","education":"学历5","grade":"院长","position":"牙医","company":"公司5","experience":"5","specialty":"修牙"}
           ]
       }


       -->
    <script src="../static/js/jquery%201.7.js"></script>
    <script>
        $(function(){
            $.ajax({
                type: 'get',
                url: "/test/getPeople.htm",
                data:{}
                success: function(val){
                    var code = val.code;
                    if(code=="00"){
                        var data = val.data;
                        var all = "";
                        for(var i = 0 ; i<data.length;i++){
                            var person = data[i];
                            var name = person.name;
                            var education = person.education;
                            var grade = person.grade;
                            var position = person.position;
                            var company = person.company;
                            var experience = person.experience;
                            var specialty = person.specialty;

                             all += "<div class=info>"+
                            "<div class=image></div>"+
                             "<p class=job><span>"+name+"</span> "+education+" "+grade+" "+position+"</p>"+
                            "<p>所属门诊："+company+"</p>"+
                            "<p>临床工作年限："+experience+"</p>"+
                            "<p>学科专长： "+specialty+"</p>"+
                            "</div>";

                        }
                        $("#people").html(all);
                    }else{
                        alert("error");
                    }


                },
                error: function (data) {
                    alert("error");
                }
            });
        })
    </script>
</head>
<body>
<div class="page">
    <div class="w">
        <div class="people" id="people">
            <div class="info">
                <div class="image"></div>
                <p class="job"><span>闫鹏</span> 硕士 院长 主任医师</p>
                <p>所属门诊： 上海乐雅口腔门诊部</p>
                <p>临床工作年限：25年</p>
                <p>学科专长： 口腔正畸及种植专业</p>
            </div>

            <div class="info">
                <div class="image"></div>
                <p class="job"><span>闫鹏</span> 硕士 院长 主任医师</p>
                <p>所属门诊： 上海乐雅口腔门诊部</p>
                <p>临床工作年限：25年</p>
                <p>学科专长： 口腔正畸及种植专业</p>
            </div>
            <hr/>
            <div class="info">
                <div class="image"></div>
                <p class="job"><span>闫鹏</span> 硕士 院长 主任医师</p>
                <p>所属门诊： 上海乐雅口腔门诊部</p>
                <p>临床工作年限：25年</p>
                <p>学科专长： 口腔正畸及种植专业</p>
            </div>

            <div class="info">
                <div class="image"></div>
                <p class="job"><span>闫鹏</span> 硕士 院长 主任医师</p>
                <p>所属门诊： 上海乐雅口腔门诊部</p>
                <p>临床工作年限：25年</p>
                <p>学科专长： 口腔正畸及种植专业</p>
            </div>
            <hr/>
            <div class="info">
                <div class="image"></div>
                <p class="job"><span>闫鹏</span> 硕士 院长 主任医师</p>
                <p>所属门诊： 上海乐雅口腔门诊部</p>
                <p>临床工作年限：25年</p>
                <p>学科专长： 口腔正畸及种植专业</p>
            </div>

            <div class="info">
                <div class="image"></div>
                <p class="job"><span>闫鹏</span> 硕士 院长 主任医师</p>
                <p>所属门诊： 上海乐雅口腔门诊部</p>
                <p>临床工作年限：25年</p>
                <p>学科专长： 口腔正畸及种植专业</p>
            </div>
        </div>
    </div>
    <hr/>
</div>
</body>
</html>