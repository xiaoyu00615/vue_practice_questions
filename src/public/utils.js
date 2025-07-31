/**
 * 单位换算 MB
 * @param num 要转换的字节数据大小
 * @param decimalPlaces 保留几位小数
 */
export function countSize(num,decimalPlaces = 2){
    if (typeof num !== 'number' || num < 0){
        return '0 MB'
    }

    const mb = num / (1024 * 1024);
    return `${mb.toFixed(decimalPlaces)}MB`
}

/**
 * 处理后缀名
 * @param str 文件名称
 */
export function splitFormat(str){
    const strArr = str.toString().split('.')
    return strArr[strArr.length - 1]
}

/**
 * 生成一个验证码
 * @param str 所需的验证字符
 * @param length 验证码长度
 * @returns {string} 验证码
 */
export function randomCode(str = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz',length = 6){
    let code = ''

    for (let i = 0; i < length; i++){
        code += str[Math.floor(Math.random()*str.length)]
    }

    return code
}