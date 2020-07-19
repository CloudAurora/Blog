---
title: JS DOM API分析
date: '2016-11-03T05:07:21+08:00'
categories:
    - Web
tags:
    - javascirpt
    - dom
    - html
---

## Element.classList

返回 DOMTokenList,IE version>=10 不完全支持。

1. 不支持 classList.contains 的第二个参数(force)
2. add 和 remove 方法不支持多参数
3. SVG,MathML 结点没有 classList 属性

<!--more-->

## Node 种类

### Node.nodeName

| Interface        | nodeName           |
| :--------------- | :----------------- |
| Comment          | #comment           |
| Document         | #document          |
| DocumentFragment | #document-fragment |

## Node 的树遍历

Node 树遍历普遍要考虑空白文字结点。(whitespace textNode)。

### Node.childNodes

返回一个 NodeList，表示该结点的所有子结点，包括文字结点和注释，该 NodeList 里面全部是 object，并没有 string。可以使用 ParentNode.children 来获得所有纯 Element 结点集合。

### Node.firstChild

返回结点的第一个子结点。可能是 whitespace textNode。
可以使用 Element.firstElementChild 来获得 Element 结点。

### Node.lastChild

返回结点的最后一个子结点。可能是 whitespace textNode。
可以使用 Element.lastElementChild 来获得 Element 结点。

### Node.nextSibling

返回下一个兄弟结点，可能是 whitespace textNode。可以使用 Element.nextElementSibling 获得 Element 结点。

### Node.previousSibling

返回前一个兄弟结点，可能 whitespace textNode。可以使用 Element.previousElementSibling 获得 Element 结点。

## Node.innerText

是一个非标准的属性，返回当前结点包括其子结点的所有文字。可以使用标准方法 Node.textContent 代替。

## Node.textContent

## Node.parentElement

返回当前 Node 的父 Element 元素，如果没有父 Element 元素，返回 null。

## Node.parentNode

一个元素的 parentNode 可能是另一个元素、Document 或者 DocumentFragment。
Document 和 DocumentFragment 的 parentNode 是 null，同样，一个刚刚创建的 node，如果还没有加到 dom 树里面，它的 parentNode 同样是 null。

```javascript
//移除某element：
ele.parentNode.removeChild(ele)
```
