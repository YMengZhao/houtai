jQuery(function ($) {
    let List = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                headers: {
                    token: localStorage.getItem("user_session")
                },
                url: "http://localhost:3000/users/list",
                success(data) {
                    resolve(data);
                }
            });
        });
    }
    (async () => {
        let data = await List();
        console.log(data.status)    
        if(data.status){
            rend(data.data)
        }else{
            location.href="http://localhost:3000/login.html";
        }
    })();


    // 删除
    $("#list").on("click", ".del", function () {
        if (window.confirm('确定要删除数据吗？')) {
            let id = $(this).parent().siblings(".listId").html();
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/users/list",
                data: {
                    _id: id,
                    dele: true
                },
                success(data) {
                    console.log("666")
                }
            });
            (async () => {
                let data = await List();
                rend(data);
            })();

        }
    });

    // 点击修改按钮，传id到修改页面、
    $("#list").on("click", ".alter", function () {
        let id = $(this).parent().siblings(".listId").html();
        location.href = `http://localhost:3000/alter.html?id=${id}`;
    });

    //搜索
    // $("#inputSearch")
    $("#SignOut").on("click",function(){
        if($("#inputSearch").val().trim().length!=0){
            let List = () => {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:3000/users/list",
                        data:{
                            inputSearch:$("#inputSearch").val(),
                            Search:true
                        },
                        success(data) {
                            resolve(data);
                        }
                    });
                });
            }
            (async () => {
                let data = await List();
                rend(data);
                $("#inputSearch").val("")
            })();
        }
    })
    

    //封装渲染函数
    function rend(data) {
        let html = data.map((item, index) => {
            return `<tr>
                    <td width=300 class="listId">${item._id}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.gender}</td>
                    <td>${item.hobby}</td>
                    <td>${item.skill}</td>
                    <td><a class="del">删除</a> / <a class="alter">修改</a></td>
                    </tr>`
        }).join("");
        $("#list").html(html);
    }

});