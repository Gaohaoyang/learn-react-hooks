# useEffect

## 生命周期中写逻辑的问题

旧的生命周期可能会有副作用，比如页面的 title 要展示点击次数时，代码如下：

``` js
componentDidMount() {
  document.title = `${this.state.count} times`
}
componentDidUpdate() {
  document.title = `${this.state.count} times`
}
```

在 componentDidMount 和 componentDidUpdate 中都写了同样的代码，我们不能在组件的生命周期中挂载一次，这就导致了代码重复的问题。

另一个例子，timer

``` js
componentDidMount() {
  this.interval = setInterval(this.tick, 1000)
}
componentWillUnmount() {
  clearInterval(this.interval)
}
```

如果这个组件比较复杂，同时包含了上述的两种逻辑，那么代码如下：

``` js
componentDidMount() {
  document.title = `${this.state.count} times`
  this.interval = setInterval(this.tick, 1000)
}
componentDidUpdate() {
  document.title = `${this.state.count} times`
}
componentWillUnmount() {
  clearInterval(this.interval)
}
```

我们看到2个问题

1. 代码重复。设置标题的代码重复了1遍
2. 代码分散。逻辑看起来就分散在了组件生命周期的各个地方

因此，我们需要更好的方法解决

## useEffect

- EffectHook 用于函数式组件中副作用，执行一些相关的操作，解决上述的问题
- 可以认为是 componentDidMount, componentDidUpdate, componentWillUnmount 的替代品

下一节学习如何使用 useEffect。
