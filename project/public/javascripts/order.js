jQuery(function ($) {
    let namebool = false;
    let agebool = false;
    let genderbool = false;
    let hobbybool = false;
    let skillbool = false;
    $("#tianjia").on("click", () => {
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
            if (window.confirm('确定要添加数据吗？')) {
                $.ajax({
                    type: "POST",
                    url: "http://132.232.131.67:3000/users/order",
                    data: {
                        name: $("#name").val(),
                        age: $("#age").val(),
                        gender: $("#gender").val(),
                        hobby: $("#hobby").val(),
                        skill: $("#skill").val(),
                    },
                    success(data) {
                        if (data == "succes") {
                            alert("添加成功！")
                        }
                    }
                });
            }
        } else {
            alert("输入格式有误！")
        }


    })
})