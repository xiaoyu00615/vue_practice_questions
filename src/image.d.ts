// 处理 .js 文件
declare module '*.js' {
    const content: any;
    export default content;
}

// 处理 .vue 文件
declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;

}
declare module '@/utils/utils.js' {
    export function readingArrData(str: string): any; // 按实际参数、返回值类型写
}