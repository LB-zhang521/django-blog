$(".update_img").on("click", function () {
    $('#avaterForm').submit();
});
$("#new_avatar").change(function () {//上传文件表单
    var file = this.files[0];  // 获取input上传的图片数据;
    if (file) {
        var url = window.URL.createObjectURL(file);  // 得到file对象路径，可当成普通的文件路径一样使用，赋值给src;
        $('.new_avatar_pre').attr('src', url);
    } else {
        $('.new_avatar_pre').attr('src', "");
    }

});
$('.update_avatar').click(function () {
    $('#new_avatar').click()
});

$('.update_password').click(function () {
    console.log("niahi ")
    password = $('#new_pwd').val();
    re_password = $('#re_new_pwd').val();
    if (password == "") {
        bs4pop.notice("请您填写表单呢~", {type: 'danger', position: 'topcenter'});
    } else if (password != re_password) {
        bs4pop.notice("两次密码输入不一样呢~", {type: 'danger', position: 'topcenter'});
    } else {
        bs4pop.notice("正在提交...", {type: 'success', position: 'topcenter'});
        $('.update_password_form').submit();
    }
});
var countdown = 30;
function settime(obj) {
    if (countdown == 0) {
        $(obj).on('click', send_yzm);
        $(obj).text("获取验证码");
        countdown = 60;
        return;
    } else {
        $(obj).off('click');

        $(obj).text(countdown + "s");
        countdown--;
    }
    setTimeout(function () {
        settime(obj);
    }, 1000);
}
function send_yzm() {
    settime(this);
    var email_type = "email_change";
    var token = $('[name="csrfmiddlewaretoken"]').attr("value");
    $.ajax({
        url: '/accounts/email_result/',
        type: 'post',
        data: {
            "email_type": email_type,
            "csrfmiddlewaretoken": token
        },
        success: function (data) {
            bs4pop.notice(data.msg, {type: data.flag ? 'success' : 'danger', position: 'topcenter'});
        },
        error: function () {
            bs4pop.notice('网络异常，请刷新页面重试', {type: 'info', position: 'topcenter'});
        }
    });

}
$('.send_update_email_yzm').on('click', send_yzm);

$('.update_email').click(function () {
    var new_email = $('#new_email').val();
    var yzm = $('#yzm').val();
    var token = $('[name="csrfmiddlewaretoken"]').attr("value");
    var EmailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (new_email != "" && yzm != "") {
        if (EmailReg.test(new_email)) {
            if (yzm.length == 6) {
                $.ajax({
                    url: '/accounts/update_email/',
                    type: 'post',
                    data: {
                        "new_email": new_email,
                        "yzm": yzm,
                        "csrfmiddlewaretoken": token
                    },
                    success: function (data) {
                        bs4pop.notice(data.msg, {
                            type: data.flag ? 'success' : 'danger',
                            position: 'topcenter'
                        });
                    },
                    error: function () {
                        bs4pop.notice('网络异常，请刷新页面重试', {type: 'info', position: 'topcenter'});
                    }
                });
            } else {
                bs4pop.notice("验证码位数不够哦~", {type: 'danger', position: 'topcenter'});
            }
        } else {
            bs4pop.notice("您的邮箱格式不对呢~", {type: 'danger', position: 'topcenter'});
        }
    } else {
        bs4pop.notice("请正确填写表单呢~", {type: 'danger', position: 'topcenter'});
    }
});
