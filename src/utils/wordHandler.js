import mammoth from 'mammoth'

export const extractTextFromWord = (file) => {

    // 使用异步处理
    return new Promise((resolve,reject)=>{
        const reader = new FileReader()

        reader.onload = ((e)=>{
            const arrayBuffer = e.target.result
            // console.log(arrayBuffer)
            mammoth.extractRawText({arrayBuffer})
                .then((result)=>{
                    resolve(result.value)
                }).catch((error)=>{
                    reject(new Error (`解析失败：${error.message}`))
            })
        })

        // 处理读取错误
        reader.onerror = (()=>{
            reject(new Error('文件读取失败'))
        })
        reader.readAsArrayBuffer(file)
    })
}