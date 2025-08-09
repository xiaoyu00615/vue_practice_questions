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
export function randomCode(str = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz',length = 6) {
    let code = ''

    for (let i = 0; i < length; i++) {
        code += str[Math.floor(Math.random() * str.length)]
    }

    return code
}

/**
 * 保存数据
 * @param key 保存的关键值
 * @param data 保存的复杂数据
 */
export const saveArrData = (key,data)=> {
    try{
        localStorage.setItem(key,JSON.stringify(data))
    }catch (error){
        console.log(error+'： 保存失败')
        return false
    }
    return true
}


/**
 * 获取数据
 * @param str 获取的数据 key
 * @returns {string}
 */
export function readingArrData(str){
    const data = localStorage.getItem(str);
    return data ? JSON.parse(data) : null;
}


export function handleTopic(topics,fileName){

    // console.log(topics)
    const [questionsPart] = topics.split(/\n\n(?=:)/);
    const regex = /(?=(?:^|\n)\d+[.、）])/gm;
    const topicBlock = questionsPart.split(regex).filter(q => q.trim());
    console.log(topicBlock)

    // 有没有正则
    const reg = /^\d+[,.。、]/
    const regTitle = /^(\d+)[,.。、]\s*(.*?)(?=[A-Z][,.。、]|$)/s
    const regOption = /([A-Z])[,.。、]\s*(.*?)(?=[A-Z][,.。、]|$)/gs

    const regAnswer = /答案[：:][a-zA-Z]+/g


    let jsonTopic = []

    for(let i = 0; i < topicBlock.length; i++){

        // 分割
        let title = topicBlock[i].match(regTitle)

        const option = topicBlock[i].match(regOption)

        if(!title && !option) title = topicBlock
        title ?  title = title[0].split('\n')[0] : title = null

        let answers = topicBlock[i].match(regAnswer)

        answers ?  answers = answers.toString().match(/[a-zA-Z]+/) : answers = null

        if (answers) answers = answers[0]

        console.log(answers)
        const obj = {
            index:i,
            title:title,
            options:option,
            answer:answers,
            type:'topic'
        }


        if(!reg.test(topicBlock[i])){
            obj.type = 'explain'
        }


        jsonTopic.push(obj)
    }
    console.log(jsonTopic)

    return {
        [fileName] : jsonTopic,
        fileName : fileName
    }
}