/**
 *  Author: topcss
 * version: v1.0
 *    Time: 2019-11-18
 * Website: https://github.com/topcss/
 */
//#region Common
function getPath (filePath) {
  if (location.href.includes('http')) {// for publish
    return "https://topcss.github.io/EvernoteExtension/" + filePath
  } else {// for dev
    return filePath
  }
}

function getMceNode () {
  return document.querySelector('.mce-container iframe')
}

function loadStyles (url) {
  let link = document.createElement("link")
  link.rel = "stylesheet"
  link.type = "text/css"
  link.href = url
  let head = document.getElementsByTagName("head")[0]
  head.appendChild(link)
}

let loadJs = (url) => {
  let doc = getMceNode().contentDocument
  let script = doc.createElement("script")
  script.byebj = true
  script.type = "text/javascript"
  script.src = url
  let head = doc.getElementsByTagName("head")[0]
  head.appendChild(script)
}

function createEl (className, name = '', style = '') {
  let el = document.createElement(name || 'div')
  el.className = className
  if (style.length > 0) { el.style = style }
  return el
}

function createButton (src, className = '', tipText = '') {
  let img = createEl('', 'img')
  img.src = getPath("icons/" + src + ".svg")

  let tbic = createEl('toolbar-button-icon-container')
  let db = createEl('dui-badge', 'span')
  let tbw = createEl('toolbar-button-wrapper ' + (className ? className : ''))
  if (tipText.length > 0) {
    tbw.title = tipText
  }

  tbic.appendChild(img)
  db.appendChild(tbic)
  tbw.appendChild(db)

  return tbw
}

// 新窗口打开
function openPage (url, param) {
  var form = '<form action="' + url + '"  target="_blank"  id="windowOpen" style="display:none">';
  for (var key in param) {
    form += '<input name="' + key + '" value="' + param[key] + '"/>';
  }
  form += '</form>';
  document.querySelector('body').insertAdjacentHTML('afterend', form);
  document.querySelector('#windowOpen').submit();
  document.querySelector('#windowOpen').remove();
}

// 处理图片粘贴问题
function pasteImage (event) {
  if (event.clipboardData || event.originalEvent) {
    var clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
    if (clipboardData.items) {
      var items = clipboardData.items,
        len = items.length,
        blob = null;
      for (var i = 0; i < len; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          blob = items[i].getAsFile();
        }
      }
      if (blob !== null) {
        var reader = new FileReader();
        reader.onload = function (event) {
          var base64_str = event.target.result;
          let imgHtml = ('<br><img src="' + base64_str + '"><br>')

          if (document.querySelector('.RichTextArea-entinymce') !== null) {
            // 印象笔记需要绕一圈
            let pId = 'id_' + Math.random().toString(36).substr(2, 4)
            tinymce.activeEditor.insertContent('<p id="' + pId + '"></p>')

            let doc = document.querySelector('.RichTextArea-entinymce').contentDocument
            doc.getElementById(pId).innerHTML = imgHtml
          } else {
            tinymce.activeEditor.insertContent(imgHtml)
          }
        }
        reader.readAsDataURL(blob);
      }
    }
  }
}

//获取元素的纵坐标
function getTop (e) {
  var offset = e.offsetTop;
  if (e.offsetParent != null) offset += getTop(e.offsetParent);
  return offset;
}

//获取元素的横坐标
function getLeft (e) {
  var offset = e.offsetLeft;
  if (e.offsetParent != null) offset += getLeft(e.offsetParent);
  return offset;
}

//#endregion

//#region Controls

class BaseButton {
  constructor() {
  }
}

class UndoButton extends BaseButton {
  constructor() {
    super()

    this.render()
  }
  render () {
    this.el = createButton('undo', 'disabled', '撤销')

    this.el.addEventListener('click', function () {
      tinyMCE.activeEditor.execCommand('undo')
    })
  }
  update () {
    var el = this.el

    if (tinyMCE.activeEditor.undoManager.hasUndo()) {
      el.className = el.className.replace(' disabled', '');
    } else {
      if (el.className.indexOf('disabled') === -1) {
        el.className += ' disabled';
      }
    }
  }
}

class RedoButton extends BaseButton {
  constructor() {
    super()

    this.render()
  }
  render () {
    this.el = createButton('redo', 'disabled', '重做')
    this.el.addEventListener('click', function () {
      tinyMCE.activeEditor.execCommand('redo')
    })
  }
  update () {
    var el = this.el

    if (tinyMCE.activeEditor.undoManager.hasRedo()) {
      el.className = el.className.replace(' disabled', '');
    } else {
      if (el.className.indexOf('disabled') === -1) {
        el.className += ' disabled';
      }
    }
  }
}

class RfButton extends BaseButton {
  constructor() {
    super()

    this.render()
  }
  render () {
    this.el = createButton('clear', null, '清除格式')
    this.el.addEventListener('click', function () {
      tinyMCE.activeEditor.execCommand('removeformat')
    })
  }
}

class HightlightButton extends BaseButton {
  constructor() {
    super()

    this.render()
  }
  render () {
    this.el = createButton('highlight', null, '文字高亮')
    this.el.addEventListener('click', function () {
      tinyMCE.activeEditor.execCommand('hilitecolor', false, 'yellow')
    })
  }
}

class TitleButton extends BaseButton {
  constructor() {
    super()

    this.isChecked = false
    this.dropdown = null

    this.render()
  }
  render () {
    let tbtc = createEl('toolbar-button-text-container', null)
    tbtc.innerText = '正文'

    let tbac = createEl('toolbar-button-arrow-container')
    let tba = createEl('toolbar-button-arrow')
    tbac.appendChild(tba)

    let db = createEl('dui-badge', 'span')
    let tbw = createEl('toolbar-button-wrapper', null, 'width:54px;')
    tbw.title = '设置标题'

    db.appendChild(tbtc)
    db.appendChild(tbac)

    tbw.appendChild(db)

    this.el = tbw
    this.el.addEventListener('click', (event) => {
      this.checked.call(this, event)
    })
  }
  checked (event) {
    this.isChecked = !this.isChecked

    this.openDropdown()

    // 修改选中状态
    this.toggle()
  }
  openDropdown () {
    let el = this.el

    // 创建下拉菜单的容器
    let dropdown = new Dropdown()
    // 将tabIndex的值设为-1，则可获取焦点
    dropdown.el.tabIndex = -1
    dropdown.el.style.left = parseInt(getLeft(el) - 5) + 'px'
    dropdown.el.style.top = parseInt(getTop(el) + parseInt(document.defaultView.getComputedStyle(el, true).height) + 4) + 'px'

    // 创建下拉菜单的子项
    let tmpStr = 'padding: 10px 20px 10px 26px; line-height: 100%; font-weight: 700;'
    dropdown.addItem(new DropdownItem('正文', '', () => {
      tinyMCE.activeEditor.execCommand('mceToggleFormat', false, 'p')
      this.closeDropdown()
    }))
    // dropdown.addItem(new DropdownItem('标题', 'font-size: 22pt;' + tmpStr))
    // dropdown.addItem(new DropdownItem('副标题', 'font-size: 16pt; color: rgb(132, 132, 132);' + tmpStr))
    dropdown.addItem(new DropdownItem('标题1', 'font-size: 22pt;' + tmpStr, () => {
      tinyMCE.activeEditor.execCommand('mceToggleFormat', false, 'h1')
      this.closeDropdown()
    }))
    dropdown.addItem(new DropdownItem('标题2', 'font-size: 18pt;' + tmpStr, () => {
      tinyMCE.activeEditor.execCommand('mceToggleFormat', false, 'h2')
      this.closeDropdown()
    }))
    dropdown.addItem(new DropdownItem('标题3', 'font-size: 16pt;' + tmpStr, () => {
      tinyMCE.activeEditor.execCommand('mceToggleFormat', false, 'h3')
      this.closeDropdown()
    }))
    dropdown.addItem(new DropdownItem('标题4', 'font-size: 15pt;' + tmpStr, () => {
      tinyMCE.activeEditor.execCommand('mceToggleFormat', false, 'h4')
      this.closeDropdown()
    }))
    dropdown.addItem(new DropdownItem('标题5', 'font-size: 14pt;' + tmpStr, () => {
      tinyMCE.activeEditor.execCommand('mceToggleFormat', false, 'h5')
      this.closeDropdown()
    }))
    dropdown.addItem(new DropdownItem('标题6', 'font-size: 12pt;' + tmpStr, () => {
      tinyMCE.activeEditor.execCommand('mceToggleFormat', false, 'h6')
      this.closeDropdown()
    }))

    // 加入到body
    document.querySelector('body').appendChild(dropdown.el)

    // 离开事件
    dropdown.el.addEventListener('blur', this.closeDropdown.bind(this))
    dropdown.el.focus()

    // 加入到当前对象中
    this.dropdown = dropdown
  }
  closeDropdown () {
    if (this.isChecked === true) {
      // 取消选中
      this.isChecked = false
      this.toggle()

      // 移除节点
      if (this.dropdown != null) {
        this.dropdown.el.remove()
        // 回收对象
        this.dropdown = null
      }
    }
  }
  toggle () {
    let el = this.el

    if (this.isChecked) {
      if (el.className.indexOf('checked') === -1) {
        el.className += ' checked';
      }
    } else {
      el.className = el.className.replace(' checked', '');
    }
  }
}

class PreviewButton extends BaseButton {
  constructor() {
    super()

    this.render()
  }
  render () {
    this.el = createButton('print', null, '打印预览')
    this.el.addEventListener('click', this.preview)
  }
  preview () {
    try {
      let html = getMceNode().contentDocument.body.innerHTML;
      var mainView = window.open('', "mainView");
      var doc = mainView.document;
      doc.write(html);
      doc.close();
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }
}

class ScreenshotButton extends BaseButton {
  constructor() {
    super()

    this.render()
  }
  render () {
    this.el = createButton('screenshot', null, '截图')
    this.el.addEventListener('click', this.exportImage)
  }
  exportImage () {
    const targetDom = getMceNode().contentDocument.body

    getMceNode().contentWindow.html2canvas(targetDom).then(canvas => {
      document.body.appendChild(canvas)

      const dataImg = new Image()
      dataImg.src = canvas.toDataURL('image/png')
      document.body.appendChild(dataImg)

      const alink = document.createElement('a')
      alink.href = dataImg.src
      alink.download = '印象笔记·截图.jpg'
      alink.click()

      document.body.removeChild(canvas)
      document.body.removeChild(dataImg)
    })
  }
}

class HelpButton extends BaseButton {
  constructor() {
    super()

    this.render()
  }
  render () {
    this.el = createButton('help', null, '帮助')
    this.el.addEventListener('click', this.gotohelp)
  }
  gotohelp () {
    var url = 'https://github.com/topcss/EvernoteExtension'
    var param = { rd: 1 };
    openPage(url, param);
  }
}

class dividerButton extends BaseButton {
  constructor() {
    super()

    this.render()
  }
  render () {
    this.el = createEl('toolbar-button-divider')
  }
}

class Toolbar {
  constructor() {
    this.render()
  }
  render () {
    this.buttons = createEl('toolbar-buttons')

    let tc = createEl('toolbar-container')
    tc.appendChild(this.buttons)

    this.el = createEl('toolbar-wrapper')
    this.el.appendChild(tc)
  }
  addButton (btn) {
    this.buttons.appendChild(btn.el)
  }
}

class Dropdown {
  constructor() {
    this.render()
  }
  render () {
    this.listBox = createEl('select-list-box', null, 'width:152px;max-height:800px;')

    let lw = createEl('select-list-wrapper')
    lw.appendChild(this.listBox)

    this.el = createEl(
      'dui-dropdown-content dui-dropdown-content-bottom dui-dropdown-content-visible',
      null,
      'z-index: 9999; margin-left: 0px; ')
    this.el.appendChild(lw)
  }
  addItem (item) {
    this.listBox.appendChild(item.el)
  }
}

class DropdownItem {
  constructor(text, style, event) {
    this.render(text, style, event)
  }
  render (text, style, event) {
    this.item = createEl('select-list-item-box')
    this.item.style = style
    this.item.innerText = text

    let iw = createEl('select-list-item-wrapper')
    iw.appendChild(this.item)

    this.el = createEl('select-list-item')
    this.el.addEventListener('click', event, false)
    this.el.appendChild(iw)

  }
}


//#endregion

//#region Main
class Subject {
  constructor() {
    this.subs = [];
  }
  addSub (sub) {
    this.subs.push(sub);
  }
  notify () {
    this.subs.forEach(sub => { sub.update(); });
  }
}

function addToolbar () {

  // 观察者
  const subject = new Subject();

  // 工具条
  var toolbar = new Toolbar()

  // 重做
  var undoBtn = new UndoButton()
  toolbar.addButton(undoBtn)

  // 撤销
  var redoBtn = new RedoButton()
  toolbar.addButton(redoBtn)

  // 分隔符
  var dividerBtn = new dividerButton()
  toolbar.addButton(dividerBtn)

  // 清除格式
  var rfBtn = new RfButton()
  toolbar.addButton(rfBtn)

  // 高亮
  var highlightBtn = new HightlightButton()
  toolbar.addButton(highlightBtn)

  // 设置标题
  var titleBtn = new TitleButton()
  toolbar.addButton(titleBtn)

  // 分隔符
  var dividerBtn = new dividerButton()
  toolbar.addButton(dividerBtn)

  var screenshot = new ScreenshotButton()
  toolbar.addButton(screenshot)

  // 打印预览
  var previewBtn = new PreviewButton()
  toolbar.addButton(previewBtn)

  // 帮助
  var helpBtn = new HelpButton()
  toolbar.addButton(helpBtn)

  // 加入观察
  subject.addSub(undoBtn)
  subject.addSub(redoBtn)

  // 载入css
  loadStyles(getPath('style.css'))

  // 追加到 body
  document.querySelector('body').appendChild(toolbar.el)

  tinymce.activeEditor.on("NodeChange", () => {
    subject.notify()
  })

  tinymce.activeEditor.on("Paste", (event) => {
    pasteImage(event)
  });

  // 用于截图
  loadJs(getPath('html2canvas.min.js'))
}

// main
const interval = setInterval(() => {
  if (tinymce !== undefined && tinymce.activeEditor !== null) {
    clearInterval(interval)
    addToolbar()
  }
}, 20)
//#endregion
