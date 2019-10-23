const rp = require('request-promise')
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router')
const router = new Router();
// const url = process.argv[2]

router.get('/', (ctx, next) => {
    const url = 'https://www.zhihu.com/people/xing-xiao-qi-78/following'
    rp(url).then(body => {
        ctx.body = body
    })
  });

app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000, function() {
    console.log('listening: 3000')
})