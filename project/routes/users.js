var express = require('express');
var router = express.Router();
let {
    connect,
    insert,
    find,
    del,
    ObjectId,
    update
} = require("../libs/mongod.js");
var token = require("../libs/token.js");
var multer = require("multer");
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        //给图片加上时间戳格式防止重名名
        //比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
var upload = multer({
    storage: storage
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.post('/login', async (req, res, next) => {
    let {
        inputEmail,
        inputPassword
    } = req.body
    let data = await find('user', {
        Email: inputEmail
    });
    if (data[0]) {
        if (data[0].Password === inputPassword) {
            let crypto = token.createToken({
                Email: data[0].Email,
                Password: data[0].Password
            }, 600)
            res.send({
                success: "success",
                crypto,
            });
        } else {
            res.send("fail");
        }
    } else {
        res.send("fail");
    }
});

router.post('/list', async (req, res, next) => {
    let {
        _id,
        dele,
        inputSearch,
        Search
    } = req.body
    if (dele == "true") {
        del("students", {
            _id: ObjectId(_id)
        });
    } else if (Search == "true") {
        let data = await find('students', {
            $or: [
                { name: { $regex: inputSearch, $options: "$i" } },
                { age: { $regex: inputSearch, $options: "$i" } },
                { skill: { $regex: inputSearch, $options: "$i" } },
                { gender: { $regex: inputSearch, $options: "$i" } },
                { hobby: { $regex: inputSearch, $options: "$i" } }
            ]
        });
        res.send(data);
    } else {
        let data = await find('students', {});
        res.send({
            status: token.checkToken(req.headers.token),
            data
        });
    }
});

router.post('/order', async (req, res, next) => {
    let {
        name,
        age,
        gender,
        hobby,
        skill,
    } = req.body
    insert("students", [{
        name,
        age,
        gender,
        hobby,
        skill
    }]);
    res.send("succes")
});

router.post('/alter', async (req, res, next) => {
    let {
        _id,
        name,
        age,
        gender,
        hobby,
        skill,
        upda
    } = req.body
    if (upda == "true") {
        update('students', {
            _id: ObjectId(_id)
        }, {
                name,
                age,
                gender,
                hobby,
                skill
            }, true);
        res.send("succes")
    } else {
        let data = await find('students', {
            _id: ObjectId(_id)
        });
        res.send(data)
    }
});


router.post('/autoLogin', async (req, res, next) => {
    res.send({
        status: token.checkToken(req.headers.token)
    })
});

router.post('/upload', upload.single('logo'), function (req, res, next) {
    res.json({
        status: "success",
        file: req.file
    });
});

module.exports = router;
