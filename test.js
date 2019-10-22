
/** 
 *input: array, function, number
 * output: array
*/
function pMap(list, concurrency ) {
    var n = concurrency || 3
    var len = list.length
    var arr = list.slice(0, n)
    var res = new Array(list.len)
    return new Promise((r, j) => {
        function check(item, i) {
            Promise.resolve(item).then(e => {
                res[i] = e
                n++
                if (n >= len) {
                    r(res)
                    return
                }
                res.shift() && check(res.shift(), n++)
            })
        }
        arr.forEach((item, i) => {
            check()
        })
    })
}
