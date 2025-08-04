// tailwind.config.js
module.exports = {
    content: [
        './src/**/*.{html,js,jsx,ts,tsx}',
        './utils/index.html',
    ],
    // Preflight 默认启用
    corePlugins: {
        preflight: true, // 这是默认值
    },
    theme: {
        extend: {},
    },
    plugins: [],
}