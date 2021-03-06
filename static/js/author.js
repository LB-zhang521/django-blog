$('.delete').click(function (e) {
    bs4pop.confirm('你确定删除此篇文章吗？<br>如果当前文章在回收站，就彻底删除了哦~', function (sure) {
        console.log('操作结果', sure, e.target.id);
        let token = $('[name="csrfmiddlewaretoken"]').attr("value");
        if (sure) {

            $.ajax({
                url: '/blog/blog-delete/',
                type: 'post',
                data: {
                    'id': e.target.id,
                    "csrfmiddlewaretoken": token,
                },
                success: function (data) {
                    bs4pop.notice(data.msg, {type: data.flag ? 'success' : 'danger', position: 'topcenter'});

                    if (data.flag) {

                        setTimeout(function () {
                            window.location.reload()
                        }, 1000)

                    }
                }
            });
        } else {

        }
    }, {
        title: '删除提示',
        hideRemove: true,
    });

});
