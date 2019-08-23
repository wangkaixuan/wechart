###安装px2rem或postcss-px2rem-exclude后，再使用px上有些不同 font-size:12px;/*no*/
  直接写px，编译后会直接转化成rem ---- 除开下面两种情况，其他长度用这个
  在px后面添加/no/，不会转化px，会原样输出。 — 一般border需用这个
  在px后面添加/px/,会根据dpr的不同，生成三套代码。---- 一般字体需用这个
#####################################################################
### 目录：
- src 代码
    	- api 接口
        - assets 静态文件
            - image 图片
        - components 公用组件文件夹
        	- definedFooter 自定义底部
        - directives  自定义vue指令
        	- vClamp.js 文字超出两行...  使用方式v-clamp.number="2"
        	- vFoucs.js 自动聚焦
        - helpers  工具类
        	- fetch.js fetch封装
        	- util.js 公共js
        - router 路由文件夹
        	- index.js 根路由文件
        - store 储存
        	- modules 模块文件夹
        		- home.js 首页 store
        	- index.js 全局store
		- pages 视图文件夹

			- judgment  舆情研判
			    - list 列表

		- App 页面入口

		- main.js 入口js

    - package.json 一些配置

    - package-lock.json 锁

    - yarn.lock 版本锁