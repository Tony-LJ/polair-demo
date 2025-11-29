# polair-demo

---

## 介绍
```.text
技术栈：Vue3+Pinia+Tailwincss+TypeScript+

项目结构：
polair-demo/
|-- public/                   # 公共文件，如 index.html
|-- src/
|   |-- assets/               # 静态资源，如图片、字体等
|   |-- components/           # Vue 组件
|   |-- router/               # Vue Router 配置
|   |-- store/                # Vuex 或 Pinia 状态管理
|   |-- views/                # 页面组件
|   |-- App.vue               # 根组件
|   |-- main.ts               # 入口文件
|-- .env                      # 环境变量
|-- .env.local                # 本地环境变量
|-- .env.production           # 生产环境变量
|-- tsconfig.json             # TypeScript 配置文件
|-- vue.config.js             # Vue CLI 配置文件（如果你使用 Vue CLI）
|-- package.json              # 项目依赖和脚本
|-- README.md                 # 项目说明文档
```



### 项目主要依赖库介绍
```.text

```


## 项目架构设计
```.text

```



## 功能模块介绍
```.text

```

## 代码格式化
```.text
（1）EsLint 提供编码规范；
（2）Prettier 是一个 Opinionated 的代码格式化工具。

1.原理：
安装：eslint
npm i -D eslint eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin
这四个依赖分别是：
- `eslint`: EsLint的核心代码
- `eslint-plugin-vue`：[为Vue使用Eslint的插件](https://eslint.vuejs.org/)
- `@typescript-eslint/parser`：ESLint的解析器，用于解析typescript，从而检查和规范Typescript代码
- `@typescript-eslint/eslint-plugin`：这是一个ESLint插件，包含了各类定义好的检测Typescript代码的规范 

生成配置文件:.eslint.config.ts
npx eslint --init

安装：Prettier
npm i --save-dev prettier eslint-config-prettier eslint-plugin-prettier
这三个依赖分别是：
- `prettier`：prettier插件的核心代码
- `eslint-config-prettier`：解决ESLint中的样式规范和prettier中样式规范的冲突，以prettier的样式规范为准，使ESLint中的样式规范自动失效
- `eslint-plugin-prettier`：将prettier作为ESLint规范来使用
手动创建文件：.prettierrc.ts

将Prettier添加到EsLint中
修改`.eslintrc.ts`文件，在extends中增加
'prettier',
'plugin:prettier/recommended'
其中：
- `prettier/@typescript-eslint`：使得@typescript-eslint中的样式规范失效，遵循prettier中的样式规范
- `plugin:prettier/recommended`：使用prettier中的样式规范，且如果使得ESLint会检测prettier的格式问题，同样将格式问题以error的形式抛出

使用husky和lint-staged构建代码
修改package.json

```





## 项目常用命令
```.text
1.安装依赖


```


## 参考资料
- [Vue3](https://cn.vuejs.org/guide/introduction)
- [VueUse中文网](https://vueuse.nodejs.cn/)
- [Vitest](https://cn.vitest.dev/)
- [TanStack](https://tanstack.com/)
- [Tailwincss](https://tailwindcss.com/)
- [Pinia](https://pinia.vuejs.org/)
- [TypeScript](https://typescript.p2hp.com/)











