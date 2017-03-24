
* ViewModel(Model of View视图的模型)理解为页面上所显示内容的数据抽象。
* 调用关系和MVP一样，ViewModel替换了Presenter。
* 在ViewModel当中会有一个Binder，双向数据绑定。

> MVVM把View和Model的同步逻辑自动化了。以前Presenter负责的View和Model同步不再手动地进行操作，而是交由框架所提供的Binder进行负责