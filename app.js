var http = require('http')
var https = require('https')
var fs = require('fs')
var cheerio = require('cheerio')

const wz = 'https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=index&fr=&hs=0&xthttps=111111&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=%E6%96%B0%E7%96%86&oq=%E6%96%B0%E7%96%86&rsp=-1'

var strHtml = ''
var results = []

https.get(wz, function(res) {
    res.on('data', function(chunk) {
        strHtml += chunk
    })
    res.on('end', function () {
        var $ = cheerio.load(strHtml)
        console.log('*****------------------------*****')
        console.log(/tjImgli/.test(strHtml))
        $('img').each((i, item) => {
            console.log(item)
            console.log(i)
        })
        console.log('*****+++++++++++++++++++++++*****')
    })
})

// function saveImage(imageUrl) {
//     http.get(imageUrl, function(res) {

//     })
// }