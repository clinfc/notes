1. 尽量使用新版本环境 （`webpack`、`node`、`npm`、`yarn`）
2. 缩小 `loader` 使用范围，降低 `loader` 使用频率
  * `babel-loader` => `exclude: /node_modules/` 或 `include: path.resolve(__dirname, '/src')`
3. 合理使用 plugin，使用性能可靠的 plugin（官方推荐、社区推荐）
  * 开发环境下不需要使用 `MiniCssExtractPlugin` 对 `css` 代码进行压缩
4. `resolve.extensions` 中只配置逻辑性代码文件类型