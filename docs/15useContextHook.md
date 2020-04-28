# use Context Hook

## 什么是 Context Api

考虑这样一种场景，如果组件树结构如下，现在想从根节点传递一个 userName 的属性到叶子节点 A D F，通过 props 的方式传递，会不可避免的传递通过 B C E，即使这些组件也没有使用这个 userName 属性。

![](https://gw.alicdn.com/tfs/TB1Nl38AAT2gK0jSZFkXXcIQFXa-1432-870.png)

如果这样的嵌套树形结构有5层或10层，那么将是灾难式的开发维护体验。如果能不经过中间的节点直接到达需要的地方就可以避免这种问题，这时 Context api 就是来解决这个问题的。

Context api 是在组件树中传递数据但不用每层都经过的一种 api。下面我们一起看看 Context Hook 的使用方法。
