jQuery(function ($) {
    //获取URL里面的参数值
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if(r != null) return unescape(r[2]);
        return null; //返回参数值
    }
    //拿到id参数
    let _id = getUrlParam("id");
    let Alter = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://132.232.131.67:3000/users/alter",
                data:{
                    _id,
                },
                success(data) {
                    resolve(data);
                }
            });
        });
    }
    (async () => {
        let data = await Alter();
        $("#name").val(data[0].name);
        $("#age").val(data[0].age);
        $("#gender").val(data[0].gender);
        $("#skill").val(data[0].skill);
        $("#hobby").val(data[0].hobby);
    })();

    let namebool = false;
    let agebool = false;
    let genderbool = false;
    let hobbybool = false;
    let skillbool = false;
    $("#xiugai").on("click", () => {
        if ($("#name").val().trim().length == 0) {
            $("#name-tip").css("display", "block");
            namebool = false;
        } else {
            $("#name-tip").css("display", "none");
            namebool = true;
        }
        if ($("#age").val().trim().length == 0) {
            $("#age-tip").css("display", "block");
            agebool = false;
        } else if (!/^\d{1,3}$/.test($("#age").val())) {
            $("#age-tip").css("display", "block");
            agebool = false;
        } else {
            $("#age-tip").css("display", "none");
            agebool = true;
        }
        if ($("#gender").val().trim() == "Choose...") {
            $("#gender-tip").css("display", "block");
            genderbool = false;
        } else {
            $("#gender-tip").css("display", "none");
            genderbool = true;
        }
        if ($("#skill").val().trim().length == 0) {
            $("#skill-tip").css("display", "block");
            skillbool = false;
        } else {
            $("#skill-tip").css("display", "none");
            skillbool = true;
        }
        if ($("#hobby").val().trim().length == 0) {
            $("#hobby-tip").css("display", "block");
            hobbybool = false;
        } else {
            $("#hobby-tip").css("display", "none");
            hobbybool = true;
        }
        if (namebool && agebool && genderbool && hobbybool & skillbool) {
            $("#hobby-tip").css("display", "none");
            if (window.confirm('确定要修改数据吗？')) {
                $.ajax({
                    type: "POST",
                    url: "http://132.232.131.67:3000/users/alter",
                    data: {
                        _id,
                        name: $("#name").val(),
                        age: $("#age").val(),
                        gender: $("#gender").val(),
                        hobby: $("#hobby").val(),
                        skill: $("#skill").val(),
                        upda:true
                    },
                    success(data) {
                        if (data == "succes") {
                            alert("修改成功！")
                        }
                    }
                });
                (async () => {
                    let data = await Alter();
                    $("#name").val(data[0].name);
                    $("#age").val(data[0].age);
                    $("#gender").val(data[0].gender);
                    $("#skill").val(data[0].skill);
                    $("#hobby").val(data[0].hobby);
                })();
            }
        } else {
            alert("输入格式有误！")
        }


    })
})