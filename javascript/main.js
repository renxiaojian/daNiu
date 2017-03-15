//工资表
var webm = webm || {};
webm = {

    init: function () {
        this.wrap = $('#wrap');
        this.lenNum = this.wrap.find('li').length;
        this.widthCon = this.wrap.find('li').eq(0).width();
        this.count = 0;
        this.wrap.width(this.widthCon * this.lenNum);
        this.bindE();
    },
    bindE: function () {
        var that = this;
        $("#btn").on("click", this.signAjax);
        this.wages();
        $("#prevBtn").on("click",prevBanner);
        function prevBanner() {
            that.count--;
            webm.move();
        };
        $("#nextBtn").on("click",nextBanner);
        function nextBanner() {
            that.count++;
            webm.move();
        };
    },
    signAjax:function () {
        var pxlock = true;
        var userName = $("input[name=username]"),
            Tel = $("input[name=tel]"),
            qq = $("input[name=qq]");

        var reg = {
            empty: function (value) {
                if (value == "") {
                    return false;
                }
                return true;
            },
            tel: function (value) {

                if (!/^1\d{10}$/ig.test(value)) {
                    return false;
                }
                return true;
            }
        };


        if (!reg.empty(userName.val())) {
            alert("用户名不能为空");
            return false;
        }
        //手机
        if (!reg.tel(Tel.val())) {
            alert("手机号输入有误");
            return false;
        }

        if (!pxlock) {
            return false;
        }
        pxlock = false;
        var url = "/newtrain/collectinfo";
        $.ajax({
            type: "post",
            url: url,
            data: {
                'uname': $.trim(userName.val()),
                'tel': $.trim(Tel.val()),
                'class_name': "HTML5线下面授班",
                'slug': "web",
                'type': 2,
                'class_id': 0,
                'source_url': location.href
            },
            dataType: "json",
            success: function (res) {
                if (res.status == 1) {
                    alert('报名成功！')
                } else {
                    alert(res.msg);
                }
                pxlock = true;
            },
            error: function () {
                console.log('异常！');
                pxlock = true;
            }
        })

    },
    wages:function () {
        var myar = setInterval(AutoScroll, 1000);
        var personDataLen = personData.length;
        //动态创建节点添加
        for (var i = 0; i < personDataLen; i++) {
            var html = '<li><span>' + personData[i].name + '</span><span>' + personData[i].sex + '</span><span>' + personData[i].education + '</span><span>' + personData[i].college + '</span><span>' + personData[i].enterprise + '</span><span>' + personData[i].salary + '</span><span>' + personData[i].welfare + '</span></li>';
            $('.person-info ul').append($(html));
        }
        function AutoScroll() {
            $(".person-info").find('ul:first').animate({
                marginTop: "-36px"
            }, 500, 'linear', function () {
                $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
            });
        }
    },


    move:function() {
        // this.count++;
    if (this.count == this.lenNum - 3) {
        this.wrap.css({left: 0})
        this.count = 1;
    }
    if (this.count == -1) {
        this.wrap.css({left: -(this.lenNum - 4) * this.widthCon});
        this.count = this.lenNum - 5;
    }
        this.wrap.stop().animate({left: -this.widthCon * this.count}, 500);
        // alert(this.count);
}
};
$(function(){
    webm.init();

});