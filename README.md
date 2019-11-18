# 网页版印象笔记插件（EvernoteExtension）

为网页版印象笔记加入若干的新功能，更多新功能，陆续更新中。

## 1. 为什么有这个项目

``` TEXT
作为印象笔记的重度用户，一直觉得网页版印象笔记非常难用。

微信截图不能直接粘贴，差评！
重要的文字无法标记高亮，差评！
无法把内容另存为pdf，差评！
甚至，它居然一直不支持撤销，差评！差评！差评！

全网找了N遍，没有人解决这些问题，于是只能自己动手了。
```

## 2. 新功能列表

- [x] 高亮显示文字
- [x] 粘贴图片
- [x] 打印预览
- [x] 撤销
- [x] 重做

## 3. 如何使用

3.1 在浏览器收藏栏中，`一键加载所有新功能`。

在浏览器书签栏的空白处，右键“`添加网页`”输入“`❤印象笔记插件`”，在“网址”文本框中粘贴下面的代码，点击“保存”。然后，在印象笔记网页中，点击该书签即可使用提供的新功能。

``` javascript
javascript:void (function(d) {var e = d.createElement('script');e.byebj=true;e.src = 'https://topcss.github.io/EvernoteExtension/main.js';var b = d.getElementsByTagName('body')[0];b.firstChild ? b.insertBefore(e, b.firstChild) : b.appendChild(e);}(document));
```
