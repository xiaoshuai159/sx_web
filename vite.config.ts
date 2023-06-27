import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
//export default(把default看成变量)
export default defineConfig({
	base: './',
	plugins: [
		vue(),
		VueSetupExtend(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		})
	],
	optimizeDeps: {
		include: ['schart.js']
	},
	server:{
		host:'0.0.0.0',
		proxy: {
			'/api': {
			  target: 'http://172.17.18.1:9998', // 将请求代理到目标主机
			  changeOrigin: true,           // 修改请求头中的 Origin
			  rewrite: (path) => path.replace(/^\/api/, '') // 将请求路径中的 '/api' 替换为空字符串
			}
		  }
	}
});
