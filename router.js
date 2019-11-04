const router = require('koa-router')()
const rp = require('request-promise')
const fs = require('fs')
const JSON5 = require('json5')

let result = []
router.all('*', async (ctx, next) => {
  await rp('https://www.zhihu.com/api/v4/members/xing-xiao-qi-78/followees').then(body => {
    let data = JSON5.parse(body)
    fs.writeFileSync('./body.js', data)
    ctx.body = ''
  })
})
router.use('/abc', router.routes(), router.allowedMethods())

module.exports = router