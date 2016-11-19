/**
 * Created by Administrator on 2016/11/19.
 *
 */
var page_bar_size=4;
$(function () {

     turnpage(1);


});
/**
 * page query
 * @param num
 */
function turnpage(num){
    /*var val={
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
     */
    $.ajax({
        type: 'get',
        url: "/test/getPeople.htm",
        data: {"pageIndex":num},
        success: function(val){
            var result = val.data.result;
            var allPages = val.data.allPages;
            var lastPage = val.data.lastPage;
            var prePage = val.data.prePage;
            var nextPage = val.data.nextPage;
            var currentpage=val.data.currentPage;
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
            var page_bar="<ul>"+
                        "<li onclick='turnpage(1)'>首页</li>"+
                        "<li onclick='turnpage("+prePage+")'>上一页</li>";
            var start_page=1;
            var end_page=page_bar_size;
            if(num>page_bar_size){
                start_page=num-page_bar_size+1;
                end_page=num;
            }
            for(var j=start_page;j<=end_page;j++){
                if(num==j){
                    page_bar+= '<li class=cur>'+j+'</li>';
                }else{
                    page_bar+= "<li class=number onclick=turnpage("+j+");>"+j+"</li>";
                }
            }
            if(currentpage==lastPage){
                page_bar+="<li> 下一页</li>"+
                            "<li> 尾页</li>";
            }else{
                page_bar+="<li onclick='turnpage("+nextPage+")'>下一页</li>"+
                    "<li onclick='turnpage("+lastPage+")'>尾页</li>";
            }
            page_bar+="<li>共"+allPages+"页</li>"+
                        "<li>到第 <input type=text id=toPage> 页</li>"+
                        "<li onclick='toPage()'>确定</li>"+
                        "</ul>";
            console.log(page_bar);
            $("#pageBar").html(page_bar);
        },
        error: function (result) {
            alert("error");
        }
    });
}

function toPage(){
    var num=$("#toPage").val();
    if(num==undefined || num==0){
        return;
    }
    turnpage(num);

}