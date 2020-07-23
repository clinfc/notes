
# $.d.ts
<br>

> 全局类型（declare）

```ts
// 全局变量
declare var $: (param: () => void) => void;

// 全局函数
declare function $(param: () => void): void;

declare namespace $ {
  namespace fn {
    class init {};
    function bind(): void;
  }
}

// ES6 模块化
declare module 'jquery' {
  
  interface JqueryInstance {
    html: (html: string) => JqueryInstance;
  }
  
  function $(param: () => void): void;
  
  function $(selector: string): JqueryInstance;
  
  namespace $ {
    namespace fn {
      class init {};
      function bind(): void;
    }
  }
  
  // 导出定义
  export = $
}
```
<br>




