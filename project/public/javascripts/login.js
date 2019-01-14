jQuery(function ($) {
    $("#signIn").click(async () => {
        let inputEmail = $("#inputEmail").val();
        let inputPassword = $("#inputPassword").val();
        let data = await login(inputEmail, inputPassword);
        if (data.success === 'success') {
            alert('登录成功');
            console.log(data.crypto);
            localStorage.setItem("user_session", data.crypto);
            location.href="http://localhost:3000/list.html";
        } else {
            alert('账号或密码错误');
        }
    });
    let login = (inputEmail, inputPassword) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/users/login",
                data: {
                    inputEmail,
                    inputPassword
                },
                success(data) {
                    resolve(data);
                }
            })
        })
    }
});