let {
    connect,
    insert,
    find,
    ObjectId,
    del,
    update
} = require("./mongod.js");
(async () => {
    // let db = await connect();
    // insert("students", [{
    //     name:"小明",
    //     age:18,
    //     gender:"男",
    //     hobby:"学习",
    //     skill:"JAVA"
    // },{
    //     name:"小红",
    //     age:16,
    //     gender:"女",
    //     hobby:"学习",
    //     skill:"JavaScript"
    // },{
    //     name:"小黄",
    //     age:18,
    //     gender:"男",
    //     hobby:"学习",
    //     skill:"C/C++"
    // },{
    //     name:"小绿",
    //     age:18,
    //     gender:"男",
    //     hobby:"学习",
    //     skill:"C#"
    // },{
    //     name:"小白",
    //     age:18,
    //     gender:"男",
    //     hobby:"学习",
    //     skill:"ALL"
    // }])
    // let data = await find('students', {
    //     $or:[
    //         {name:{$regex:"小",$options:"$i"}},
    //         {age:{$regex:"小",$options:"$i"}},
    //         {skill:{$regex:"小",$options:"$i"}},
    //         {gender:{$regex:"小",$options:"$i"}},
    //         {hobby:{$regex:"小",$options:"$i"}}
    //     ]
    // });

    del('students', {
        name: "小明"
    });
    // update('students', {
    //     name: 'lemon'
    // }, {
    //         age: 19
    //     },true);
    // let data = await find("students", {
    //     _id: ObjectId("5c3069c073a0041b80251c67")
    // })
})()