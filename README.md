# common-watermark

> 一个简单的前端水印插件

### 安装依

```shell
npm i  common-watermark -S
```

### 展示

![image](./images/demo.png)

### 在 vue 中使用

```ts
import { watermark } from 'common-watermark';
export default defineComponent({
  mounted() {
    // 在vue当中就是layout布局的根节点
    const app = document.body;
    watermark.setWatermark('我是水印我是水印', app);
  },
});
```

### 在 react 中使用

```ts
import { watermark } from 'common-watermark';
export default class App extends React.Component {
  componentDidMount() {
    // 在react当中就是layout布局的根节点
    const app = document.body;
    watermark.setWatermark('我是水印我是水印', app);
  }
  render() {
    return <div>我是react</div>;
  }
}
```

### 在 js 中使用

```ts
import { watermark } from 'common-watermark';
const app = document.body;
watermark.setWatermark('我是水印我是水印', app);
```
