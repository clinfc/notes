### 插件

```
npm i typescript nodemon concurrently -D
```

### package.json

```json
{
  "scripts": {
    // "dev": "concurrently npm run dev:ts & npm run dev:js",
    "dev": "tsc && concurrently npm:dev:*",
    "dev:ts": "tsc -w",
    "dev:js": "nodemon node index.js"
  },
  "nodemonConfig": {
    // 该目录下的文件将不被监控
    "ignore": [
      "data/*",
      "node_modules/*"
    ]
  }
}
```