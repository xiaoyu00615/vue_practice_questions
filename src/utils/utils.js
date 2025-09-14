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
    const regOption = /([a-zA-Z]+)[,.。、:：]\s*(.*?)(?=[A-Z][,.。、]|$)/gs

    const regAnswer = /答案[：:][a-zA-Z]+/g


    let jsonTopic = []

    for(let i = 0; i < topicBlock.length; i++){

        // 分割
        let title = topicBlock[i].match(regTitle)


        const option = topicBlock[i].match(regOption)

        if(!title && !option) title = topicBlock
        title ?  title = title[0].split('\n')[0] : title = null

        if (!title) title = topicBlock[0].split('\n')[0]

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

    const unArr = new Array(jsonTopic.length).fill(undefined)


    return {
        [fileName] : jsonTopic,
        fileName : fileName,
        explain : {
                explainFile:unArr,
                explainWrite:unArr,
                explainAi:unArr
            }

    }
}


/**
 * 格式化数字 转换时间
 * @param num 数字 Number
 * @returns {string} 返回一个格式化后的字符串
 */
export function timerConvert(num){

    // 计算小时：1小时 = 3600秒
    const hours = Math.floor(num / 3600).toString().padStart(2,'0');
    // 计算剩余秒数中包含的分钟：1分钟 = 60秒
    const minutes = Math.floor((num % 3600) / 60).toString().padStart(2,'0');
    // 剩余的秒数
    const seconds = (num % 60).toString().padStart(2,'0');

    return `${hours}:${minutes}:${seconds}`
}


/**
 * 提取数据项
 * @param jsonList 数据表
 * @param keyName key的名字
 * @returns {*[]} 返回一个数组单项数据
 */
export function extractAnswer(jsonList,keyName){
    let answerJson = []
    jsonList.forEach((item)=>{
        answerJson.push(item[keyName])
    })

    return answerJson
}

/**
 * 映射答案表
 * @param num 数字
 * @returns {string} 返回答案
 */
export function mappingLetter(num){
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'][num];
}


/**
 * 判断选择答案和标准答案
 * @param topicAnswer 题目答案
 * @param standardAnswer 标准答案
 * @return { boolean } 返回布尔值
 */
export function compareAnswerFun(topicAnswer,standardAnswer){
    // console.log(standardAnswer.length)

    if (standardAnswer.length === 1 && topicAnswer === standardAnswer){
        return true;
    }

    if (standardAnswer > 1){
        // return
        console.log("多选")
    }

    return false

}

/**
 * 删除元素类名
 * @param demoName 元素名
 * @param nameArr 类名
 */
export function delDemoClass(demoName,nameArr = 'active'){
    const demos = document.querySelector(demoName).childNodes

    demos.forEach((demo)=>{
        demo.classList.remove(nameArr)
    })
}

export function delDemoClassDemo(demo,nameArr = 'active'){
    const demos = demo.childNodes

    demos.forEach((demo)=>{
        demo.classList.remove(nameArr)
    })
}