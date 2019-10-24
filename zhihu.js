const Koa = require('koa');
const app = new Koa();
const router = require('./router.js');

app.use(router.routes()).use(router.allowedMethods());
   
app.listen(3001, function() {
    console.log('listening: 3001')
})