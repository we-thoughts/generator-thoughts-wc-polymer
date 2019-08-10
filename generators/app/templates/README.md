# \<<%= component_name %>\>

[![<%= component_name %>](https://badge.fury.io/js/<%= component_name%>.svg)](https://npmjs.org/package/<%= package_name %>)

<%= description %>

## 使用方式（How to Use）

目前支持两种使用方式：

- 轻量级使用，适用于简单的页面或者偶尔引用个别组件的情况，选择如下 Html 方式，简单快捷，即引即用；
- 项目级构建，大量引用，推荐使用 NPM 方式，锁死版本号，构建到项目中，优点是当项目体量巨大时，可以通过第三方构建工具减少组件共同模块的重复引用。

### Html

- Use [![](https://data.jsdelivr.com/v1/package/npm/jsdelivr/badge)](https://www.jsdelivr.com/) as npm CDN.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/package@version/file"></script>
  
  <!-- 示例如下 -->
  <script src="https://cdn.jsdelivr.net/npm/<%= package_name %>/dist/<%= component_name %>.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/<%= package_name %>/dist/<%= component_name %>.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/<%= package_name %>@0.0.0/dist/<%= component_name %>.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/<%= package_name %>@0.0.0/dist/<%= component_name %>.min.js"></script>
  ```

### NPM

- 使用 NPM 引入项目中以 ES6 模块或其它方式使用；

  ```bash
  npm install --save @scope/package@version
  
  # 示例如下
  npm install --save <%= package_name %>
  npm install --save <%= package_name %>@latest
  npm install --save <%= package_name %>@0.0.1
  ```

## 开发（For Developers）

### 准备（Prepare）

以下为本人开发环境，其他环境未做测试：

- node 10.16.0 或其它
- npm 6.9.0 或其它
- git 2.19.2.windows.1 或其它

```bash
node -v
npm -v
git --version
```

### 配置（Install）

- 下载组件源码至本地：

  ```bash
  git clone git@github.com:<%= repository %>.git
  ```

- 安装依赖：

  ```bash
  npm install
  # 依赖中已包含 webpack, webpack-cli
  ```

- 组件使用 TypeScript 开发及进行转译处理，确保本地已安装有 TypeScript：

  ```bash
  // 推荐全局安装
  npm install typescript -g
  ```

- 脚手架基于 Polymer 拓展，预览和自动化测试由 Polymer 支持，请确保本地已安装最新版 Polymer：

  ```bash
  npm install polymer-cli -g
  ```

- **如另做发布，勿忘修改 `package.json` !!!**

### 项目结构

```json
| - <%= component_name %>
	| - [build] - tsc 转译之后输出位置
	| - [demo] - polymer 自动生成
		| - index.html
	| - [dist] - webpack 打包输出位置
	| - [node_modules] - npm 模块目录
	| - [src] - typescript 源文件目录
	| - [test] - polymer 自动生成
		| - index.html
		| - <%= component_name %>_test.html
	| - .gitignore - gitignore
	| - index.html - 自动重定向至 demo/index.html
	| - package-lock.json
	| - package.json
	| - polymer.json
	| - README.md
	| - <%= component_name %>.ts
	| - tsconfig.json
	| - webpack.config.js
```

### 命令（npm scripts）

组件项目中已集成常用命令，使用前请确保配置文件合乎预期，如下：

```bash
# Git 仓库初始化，并进行初次提交
npm run init
# Git 仓库链接至 GitHub
npm run push
# 预览组件，实为调用 polymer serve
npm run serve
# 测试组件，实为调用 polymer test -l chrome
npm run test
# typescript 转译
npm run build
# webpack 打包
npm run dist
```

### Polymer [<img src="https://img.shields.io/badge/Polymer-CLI-blue.svg" alt="Polymer-CLI">](https://polymer-library.polymer-project.org/3.0/docs/tools/polymer-cli)

组件基于 Polymer 开发，详细内容请移步 [Polymer Library](https://polymer-library.polymer-project.org/)。

- Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.

## License

GPL-3.0 © [cigaret](https://thoughts.vip)
