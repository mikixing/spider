var rp = require('request-promise')
var fs = require('fs')
var cheerio = require('cheerio')
const wz = 'https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=index&fr=&hs=0&xthttps=111111&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=%E6%96%B0%E7%96%86&oq=%E6%96%B0%E7%96%86&rsp=-1'

var strHtml = ''
var results = []
var imageData = ''

rp(wz).then(body => {
    strHtml = body
    strHtml.replace(/\"thumbURL\"\:\s*\"(.*?)\"/g, function ($0, $1) {
        results.push($1 + 'mikimikimikimikimiki')
        return $0
    })
    results.slice(0, 10).forEach(url => {
        saveImage(url)
    })
}).catch(err => console.log(err))
function saveImage(imageUrl) {
    rp.get(imageUrl).then(body => {  //图片加载到内存变量
        imageData = body;
        if(!fs.existsSync("./images")){
            fs.mkdirSync("./images");
        }
        fs.writeFile('images/'+Math.random()+'.png',imageData,'binary',function (err) {  //以二进制格式保存
            if(err) throw err;
            console.log('保存成功');
        });
    })
}
