MVP模式的JavaScript Demo(Passive View)

> MVP打破了View原来对于Model的依赖，其余的依赖关系和MVC模式一致。Model执行完业务逻辑以后，也是通过观察者模式把自己变更的消息传递出去，但是是传给Presenter而不是View。Presenter获取到Model变更的消息以后，通过View提供的接口更新界面。

### 关键点
* View不再负责同步的逻辑，而由Presenters负责。Presenter既有应用程序逻辑，又有同步逻辑。
* View需要提供操作界面的接口给Presenter调用。（关键）

### 优缺点
* Presenter便于测试，View可组件化。
* Presenter比较笨重


