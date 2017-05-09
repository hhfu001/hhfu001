MVC模式的JavaScript Demo
---

### 关键点
* View是把控制权交移给Controller，Controller执行应用程序相关的应用逻辑（对来自View数据进行预处理、决定调用哪个Model的接口等等）。
* Controller操作Model，Model执行业务逻辑对数据进行处理。但不会直接操作View，可以说它是对View无知的。
* View和Model的同步消息是通过观察者模式进行，而同步操作是由View自己请求Model的数据然后对视图进行更新。

> MVC模式的精髓在于第三点：Model的更新是通过观察者模式告知View的，具体表现形式可以是Pub/Sub或者是触发Events。

### 优缺点
* 业务逻辑和展示逻辑分开，模块化程度高。 业务逻辑变更是只需要更改controller就行。
* 观察者模式可以做到多个View同时更新。
* Controller测试困难，View无法组件化。

