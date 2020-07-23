```ts
class Demo {
  
  private static demo: Demo;
  
  private constructor() {}
  
  static instance() {
    if (!this.demo) {
      this.demo = new Demo()
    }
    return this.demo
  }
  
}
```