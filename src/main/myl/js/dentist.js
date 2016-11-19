/**
 * Created by Administrator on 2016/11/19.
 */
$(function () {
    var val={
        "code": "00",
        "message": "请求成功",
        "data": {
            "orderBy": "",
            "sort": "asc",
            "result": [
                {
                    "name": "姓名0",
                    "education": "学历0",
                    "grade": "院长",
                    "position": "牙医",
                    "company": "公司0",
                    "experience": "0",
                    "specialty": "修牙"
                },
                {
                    "name": "姓名1",
                    "education": "学历1",
                    "grade": "院长",
                    "position": "牙医",
                    "company": "公司1",
                    "experience": "1",
                    "specialty": "修牙"
                },
                {
                    "name": "姓名2",
                    "education": "学历2",
                    "grade": "院长",
                    "position": "牙医",
                    "company": "公司2",
                    "experience": "2",
                    "specialty": "修牙"
                },
                {
                    "name": "姓名3",
                    "education": "学历3",
                    "grade": "院长",
                    "position": "牙医",
                    "company": "公司3",
                    "experience": "3",
                    "specialty": "修牙"
                },
                {
                    "name": "姓名4",
                    "education": "学历4",
                    "grade": "院长",
                    "position": "牙医",
                    "company": "公司4",
                    "experience": "4",
                    "specialty": "修牙"
                },
                {
                    "name": "姓名5",
                    "education": "学历5",
                    "grade": "院长",
                    "position": "牙医",
                    "company": "公司5",
                    "experience": "5",
                    "specialty": "修牙"
                }
            ],
            "homePage": 1,
            "fristPage": 1,
            "currentPage": 1,
            "prePage": 1,
            "nextPage": 2,
            "lastPage": 10,
            "pageSize": 6,
            "rows": 55,
            "allPages": 10,
            "currentPageIndex": 0,
            "pageBar": [
                1,
                8
            ]
        }
    };
    var result = val.data.result;
    var all = "";
    for(var i=0;i<result.length;i++){
        var person=result[i];
        var name = person.name;
        var education = person.education;
        var grade = person.grade;
        var position = person.position;
        var company = person.company;
        var experience = person.experience;
        var specialty = person.specialty;

        all+= "<div class=info>"+
            "<div class=image></div>"+
            "<p class=job><span title="+name+">"+name+"</span> "+education+" "+grade+" "+position+"</p>"+
            "<p>所属门诊："+company+"</p>"+
            "<p>临床工作年限："+experience+"</p>"+
            "<p>学科专长： "+specialty+"</p>"+
            "</div>";
    }
    $("#people").html(all);



    /* $.ajax({
     type: 'get',
     url: "/test/getPeople.htm",
     success: function(val){
     var result = val.data.result;
     var all = "";
     for(var i=0;i<result.length;i++){
     var person=result[i];
     var name = person.name;
     var education = person.education;
     var grade = person.grade;
     var position = person.position;
     var company = person.company;
     var experience = person.experience;
     var specialty = person.specialty;

     all+= "<div class=info>"+
     "<div class=image></div>"+
     "<p class=job><span>"+name+"</span> "+education+" "+grade+" "+position+"</p>"+
     "<p>所属门诊："+company+"</p>"+
     "<p>临床工作年限："+experience+"</p>"+
     "<p>学科专长： "+specialty+"</p>"+
     "</div>"
     }
     $("#people").html(all);

     },
     error: function (result) {
     alert("error");
     }
     });*/
});