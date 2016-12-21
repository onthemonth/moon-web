/**
 * Created by Administrator on 2016/11/16.
 */
$(function () {
    // // 点击箭头记录索引
    // var $banner = $("#banner");
    // var ul = $banner.children("ul");
    // var li = ul.children("li");
    // var arr = $banner.children("#arr");
    // var arrLeft = arr.children("#left");
    // var arrRight = arr.children("#right");
    // var imgWidth = $banner.offsetWidth;
    // var index = 0;
    // var count = ul.children.length;
    // //显示箭头
    // $banner.mouseover(function () {
    //     arr.css("display", "block");
    // });
    // $banner.mouseout(function () {
    //     arr.css("display", "none");
    // });
    // arrRight.click(function () {
    //     if (index === count) {
    //         index = 0;
    //     }
    //     index++;
    //     ul.animate({
    //         left: -index * imgWidth
    //     }, 500);
    // });

    $("#banner").slide({
        titCell: ".hd ul",
        mainCell: ".bd ul",
        interTime: 2000,
        effect: "fold",
        autoPlay: true,
        autoPage: true,
        trigger: "click"
    });

        $(".all>.all-one").mouseover(function () {
            $(this).css("width","534px").children().eq(2).css("display","block");
        });
        $(".all>.all-one").mouseout(function () {
            $(this).css("width","232px").children().eq(2).css("display","none");
        });

    });


