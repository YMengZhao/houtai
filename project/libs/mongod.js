const { MongoClient, ObjectId } = require('mongodb');

// 连接数据库地址
const url = 'mongodb://localhost:27017';

// 数据库名称
const dbName = '1810';

//连接数据库
let connect = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, client) => {
            if (err) {
                reject(err);
            } else {
                console.log("成功连接到服务器");
                const db = client.db(dbName);
                resolve({
                    db,
                    client
                });
            }
        });
    });
}

// 插入数据
let insert = (col, arr) => {
    return new Promise(async (resolve, reject) => {
        let {
            db,
            client
        } = await connect();
        const collection = db.collection(col);
        collection.insertMany(arr, (err, result) => {
            if (err) {
                console.log('插入失败');
                reject(err);
                client.close();
            } else {
                console.log('插入成功');
                resolve(result);
                client.close();
            }
        });
    });
}

// 查询数据
let find = (col, obj) => {
    return new Promise(async (resolve, reject) => {
        let {
            db,
            client
        } = await connect();
        const collection = db.collection(col);
        collection.find({
            ...obj
        }).toArray(function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
                client.close();
            }
        });
    });
}

// 删除数据
let del = (col, obj) => {
    return new Promise(async (resolve, reject) => {
        let {
            db,
            client
        } = await connect();
        const collection = db.collection(col);
        collection.remove({
            ...obj
        }, function (err, result) {
            if (err) {
                console.log('删除失败');
                reject(err);
            } else {
                console.log('删除成功');
                resolve(result);
            }
        });
    });
}

// 更新数据
let update = (col, obj1, obj2,bool) => {
    return new Promise(async (resolve, reject) => {
        let {
            db,
            client
        } = await connect();
        const collection = db.collection(col);
        collection.update({
            ...obj1
        }, {
            $set: {
            ...obj2
            }
        }, {
            multi: bool
        }, function (err, result) {
                if (err) {
                    console.log('更新失败');
                    reject(err);
                } else {
                    console.log('更新成功');
                    client.close();
                }
            });
    });
}


module.exports = {
    connect,
    insert,
    find,
    ObjectId,
    del,
    update
}

// 经过测试，读取大于100条的时候会出现报错官网解释，可以尝试用forEach代替
// MongoClient.connect(url, function (err, client) {
//     console.log("连接成功！");
//     const db = client.db(dbName);
//     const collection = db.collection(config.collection);
//     //用find方法把结果集拿回来进行处理
//     collection.find({}).forEach((item) => {
//         console.log(item);
//     });
//     client.close();
// });