try {
    console.log(1);

    // 抛出错误 不再往下执行
    throw new Error('出现了错误!');
    console.log(2);
} catch (e) {
    // Error 的对象必须有 message 属性表示错误的信息
    console.log(e.message); // 错误的提示信息
    console.log(e.stack); // 错误的堆栈信息
    console.log(e.name); // 错误的名称
} finally {
    console.log(3);
}


// 自定义错误
function UserError(message)
{
    this.message    = message || '默认的错误消息!';
    this.name       = "UserError";
}

UserError.prototype = new Error();
UserError.prototype.constructor = UserError;

try {
    throw new UserError('this is user error!');
} catch (e) {
    console.log(e.message + e.name);
} finally {

}
