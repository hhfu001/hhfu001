function TodoInputPresenter(view, model) {
    this.view = view
    this.model = model
    this.init()
}

TodoInputPresenter.prototype.init = function () {
    this.view.setPresenter(this)
    this.view.build() // 操作view
}

TodoInputPresenter.prototype.onAddNewTodo = function () {
    var content = this.view.getInput() // // 利用View的接口
    if (content.length === 0) return

    var todos = this.model.getTodos()
    todos.unshift({ content: content, done: false })
    this.model.setTodos(todos)

    this.view.setInput("") // // 利用view的接口操作view
}

module.exports = TodoInputPresenter