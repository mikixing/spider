var request = require('request')
var fs = require('fs')
var cheerio = require('cheerio')
var Promise = require("bluebird");
const wz = 'https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=index&fr=&hs=0&xthttps=111111&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=%E6%96%B0%E7%96%86&oq=%E6%96%B0%E7%96%86&rsp=-1'

var strHtml = ''
var results = []
var imageData = ''
request.get(wz).on('data', function(chunk) {
    strHtml += chunk
}).on('end', function () {
    // var $ = cheerio.load(strHtml)
    strHtml.replace(/\"thumbURL\"\:\s*\"(.*?)\"/g, function ($0, $1) {
        results.push($1)
        return $0
    })
    console.log(results)
    results.slice(0, 10).forEach(url => {
        saveImage(url)
    })
    // Promise.map(results, saveImage, {concurrency: 1})
})

function saveImage(imageUrl){
    request.get(imageUrl).on('data',function(data){  //图片加载到内存变量
        imageData += data;
    }).on('end',function(){        //加载完毕保存图片
        if(!fs.existsSync("./images")){
            fs.mkdirSync("./images");
        }
        fs.writeFile('images/'+Math.random()+'.png',imageData,'binary',function (err) {  //以二进制格式保存
            if(err) throw err;
            console.log('保存成功');
        });
    });
}


var fn = function (res) {
    // res.setEncoding('binary');      //二进制(binary)

    var imageData ='';
    res.on('data',function(data){  //图片加载到内存变量
        imageData += data;
    }).on('end',function(){        //加载完毕保存图片
        if(!fs.existsSync("./images")){
            fs.mkdirSync("./images");
        }
        fs.writeFile('images/'+Math.random()+'.png',imageData,'binary',function (err) {  //以二进制格式保存
            if(err) throw err;
            console.log('保存成功');
        });
    });
}



// [a, b, c], [d, e, f, g, h, i]

// [1, 'fa', new Promise()]


// function pEach (list, fn, concurrency = 3) {

    // 判断list, fn

    // var arr = list.slice(0, concurrency)

    // arr.forEach((e, i) => {
    //     var p = fn(e, i, arr)
    //     if (p instanceof Promise) {
    //         p.then(d => {

    //         })
    //     } else {

    //     }
    // })



// }