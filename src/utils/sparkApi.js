import CryptoJS from 'crypto-js';
import { Base64 } from "js-base64";
import {readingArrData} from "@/utils/utils.js";
import {localStorageAiConfig} from "@/utils/config.js";

let APP_ID,API_KEY,API_SECRET,API_HOST,API_PATH_WS

// console.log(import.meta.env.VITE_SPARK_APPID)
if(import.meta.env.VITE_SPARK_APPID){
    // 从环境变量获取配置（确保.env文件已正确设置）
    APP_ID = import.meta.env.VITE_SPARK_APPID;
    API_KEY = import.meta.env.VITE_SPARK_APIKEY;
    API_SECRET = import.meta.env.VITE_SPARK_APISECRET;
    API_HOST = import.meta.env.VITE_SPARK_API_URLHOST;
    API_PATH_WS = import.meta.env.VITE_SPARK_API_URL;

}else{
    try{
        const aiConfig = readingArrData(localStorageAiConfig)
        console.log(aiConfig)
        APP_ID = aiConfig.AppId
        API_KEY = aiConfig.ApiKey
        API_SECRET = aiConfig.AplSecret
        API_HOST = aiConfig.AplUrlHost
        API_PATH_WS = aiConfig.AplUrl
    }catch (e) {
        console.log('本地配置出错')
    }
}

console.log(APP_ID,API_KEY,API_SECRET,API_HOST,API_PATH_WS)




/**
 * 生成WebSocket连接URL
 */
const generateWsUrl = () => {
    const date = new Date().toUTCString();
    const signatureOrigin = [
        `host: ${API_HOST}`,
        `date: ${date}`,
        `GET ${API_PATH_WS} HTTP/1.1`
    ].join('\n');

    const signature = CryptoJS.HmacSHA256(signatureOrigin, API_SECRET)
        .toString(CryptoJS.enc.Base64);

    const authorization = `api_key="${API_KEY}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;
    const base64Authorization = Base64.encode(authorization);

    const params = {
        appid: APP_ID,
        authorization: base64Authorization,
        date: date,
        host: API_HOST
    };

    return `wss://${API_HOST}${API_PATH_WS}?${new URLSearchParams(params)}`;
};

/**
 * 流式调用（完全修复版）
 */
export const sparkChatStream = (prompt, history = [], onChunk) => {
    // 生成连接URL
    const wsUrl = generateWsUrl();
    const ws = new WebSocket(wsUrl);
    const uid = `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    // 连接建立后发送请求
    ws.onopen = () => {
        console.log('WebSocket连接已建立');

        // 严格按照官方要求的格式构造请求
        const requestData = {
            "header": {
                "app_id": APP_ID,  // 修正：必须使用app_id（带下划线）
                "uid": uid
            },
            "parameter": {
                "chat": {
                    "domain": "lite",  // 修正：使用允许的值（lite/general/search）
                    "temperature": 0.7,
                    "max_tokens": 2048,
                    "top_k": 4
                }
            },
            "payload": {
                "message": {
                    "text": [
                        // 历史对话
                        ...history.map(({ role, content }) => ({ role, content })),
                        // 当前提问
                        { "role": "user", "content": prompt }
                    ]
                }
            }
        };

        ws.send(JSON.stringify(requestData));
    };

    // 接收消息处理
    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);

            // 处理API返回的错误
            if (data.header?.code !== 0) {
                const errorMsg = `错误码: ${data.header.code} - ${data.header.message}`;
                console.error('API错误:', errorMsg);
                onChunk(`\n[接口错误] ${errorMsg}`);
                ws.close(4000, errorMsg);  // 修正：使用合法的关闭代码
                return;
            }

            // 提取并返回内容片段
            if (data.payload?.choices?.text && data.payload.choices.text.length > 0) {
                const content = data.payload.choices.text[0].content || '';
                if (content) {
                    onChunk(content);
                }
            }

            // 检查对话是否结束
            if (data.header?.status === 2) {
                console.log('对话已完成');
                ws.close(1000, '对话结束');  // 正常关闭
            }
        } catch (e) {
            console.error('消息解析失败:', e, '原始数据:', event.data);
            onChunk('\n[解析错误] 请重试');
            ws.close(4001, '解析失败');  // 合法错误代码
        }
    };

    // 错误处理
    ws.onerror = (error) => {
        console.error('WebSocket错误:', error);
        onChunk('\n[连接错误] 请检查API配置');
    };

    // 关闭处理
    ws.onclose = (event) => {
        console.log('连接关闭:', event.code, event.reason);
    };

    // 返回主动关闭连接的方法
    return () => ws.close(1000, '主动关闭');
};
