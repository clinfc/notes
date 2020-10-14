# DOM 节点测试

> main.js

```js
import $ from 'jquery'

export function insert() {
  $('body').append('<div>like</div>')
}
```

> main.test.js

```js
import $ from 'jquery'
import { insert } from './main.js'

test('dom', () => {
  insert()
  expect($('body').find('div').length).toBe(1)
}) 
```