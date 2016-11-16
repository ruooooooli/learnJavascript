
/**
 * 在这里定义了一个私有变量 并在 exports 对象导出了一个共有方法 count
 *
 * 一个模块中的 js 代码仅在第一次被使用的时候执行一次,并在执行的过成功初始化导出的对象.之后,缓存起来的导出对象被重复使用
 */

var i = 0;

function count() {
    return ++i;
}

exports.count = count;
