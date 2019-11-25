/**
 *  Author: topcss
 * version: v1.0
 *    Time: 2019-11-18
 * Website: https://github.com/topcss/
 */
//#region Common
Object.assign(Number.prototype, {
  /**
   * 数字千分位显示
   */
  qfw () {
    return this.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
  }
})
/**
 * 自动切换开发环境与生产环境的资源路径
 * @param {*} path 
 */
const getPath = (path) => (location.href.includes('http') ? "https://topcss.github.io/EvernoteExtension/" : '') + path
const getMceNode = () => document.querySelector('.mce-container iframe')
const getMceDoc = () => getMceNode().contentDocument
const getMceWin = () => getMceNode().contentWindow

// 需要配合合并工具来使用
// ref https://www.zhangxinxu.com/sp/svgo/
const loadSvgSprite = () => {
  let el = createEl('', null, 'display: none')
  el.innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="display:none;"><symbol id="brush" viewBox="0 0 22 22"><path d="M11.75 11.489V13h.75v4.078L9.5 19v-6h1v-2h.008l-.001-.001 1.02-.999H4.5a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-4.23l-1.52 1.489zM5.25 5.25v3.5h11.5v-3.5H5.25z" fill="#5C5C5C" fill-rule="nonzero"/></symbol><symbol id="clear" viewBox="0 0 22 22"><path d="M6.493 17h3.997l2.485-4.233-4.917-2.792-3.484 5.935L6.494 17zm5.487 0H18v1.25H6.114l-2.856-1.622a.503.503 0 0 1-.189-.693L9.78 4.504a.52.52 0 0 1 .705-.186l6.258 3.554c.247.14.331.45.189.693L11.98 17z" fill="#5C5C5C" fill-rule="evenodd"/></symbol><symbol id="help" viewBox="0 0 18 18"><g fill="none" fill-rule="evenodd"><path d="M0 0h18v18H0z"/><g fill="#999" fill-rule="nonzero"><path d="M8.937 12.113h-.882a.278.278 0 0 1-.209-.086.277.277 0 0 1-.084-.207 9.386 9.386 0 0 1 .179-2.297c.09-.371.278-.71.544-.98.242-.261.503-.492.764-.737.26-.245.572-.515.867-.76.58-.491.51-1.345-.215-1.747a1.67 1.67 0 0 0-1.37-.111c-.45.161-.814.51-.999.957-.059.15-.107.304-.145.461-.058.214-.154.29-.372.263l-1.723-.211a.303.303 0 0 1-.228-.12.313.313 0 0 1-.057-.253C5.17 4.683 6.367 3.39 7.93 3.12a4.942 4.942 0 0 1 3.043.285 3.313 3.313 0 0 1 1.85 1.963 2.627 2.627 0 0 1-.402 2.59c-.414.51-.88.973-1.392 1.381-.162.143-.317.295-.483.435-.264.219-.411.55-.4.895 0 .375-.023.748-.033 1.124.01.09-.022.18-.086.244a.287.287 0 0 1-.24.076h-.851zM10.184 14.773c0 .678-.541 1.227-1.209 1.227-.667 0-1.208-.55-1.208-1.227s.541-1.226 1.208-1.226c.668 0 1.209.549 1.209 1.226z"/></g></g></symbol><symbol id="highlight" viewBox="0 0 22 22"><path d="M11.708 15.967l-.934 1.619H5l2.378-4.119-1.963-1.133a.46.46 0 0 1-.168-.629L9.85 3.73a.46.46 0 0 1 .629-.168l7.974 4.604a.46.46 0 0 1 .169.629l-4.604 7.975a.46.46 0 0 1-.63.168l-1.681-.97zM10.538 5.04l-3.814 6.607 6.607 3.815 3.815-6.607-6.607-3.815z" fill="#636363" fill-rule="nonzero"/></symbol><symbol id="print" viewBox="0 0 1024 1024"><path d="M821.704 295.224h-83.168v-67.008c0-30.56-15.552-62.112-46.08-62.112H360.072c-30.56 0-64.256 31.552-64.256 62.112v67.04h-65.024c-30.528 0-64.128 31.712-64.128 62.24v203.136c0 30.56 33.6 48.224 64.128 48.224h64.992v207.072c0 30.56 33.696 48 64.256 48h332.384c30.56 0 46.08-17.44 46.08-48V608.824h83.168c30.56 0 46.752-17.696 46.752-48.224V357.496c.032-30.56-16.16-62.272-46.72-62.272m-488.992-67.008c0-10.176 17.216-26.016 27.36-26.016h332.384c10.176 0 9.216 15.84 9.216 26.016v67.04h-368.96v-67.04m368.928 580.64c0 10.176-8 18.944-18.176 18.944H351.048a18.784 18.784 0 0 1-18.336-18.944v-273.76c0-10.208 8.16-18.464 18.336-18.464h332.416a18.24 18.24 0 0 1 18.176 18.464v273.76M830.792 560.6c0 10.176 1.152 11.36-9.056 11.36h-83.168v-29.792c0-30.56-15.552-62.432-46.08-62.432H360.072c-30.56 0-64.256 31.872-64.256 62.432v29.792h-65.024c-10.176 0-27.232-1.152-27.232-11.36V357.496c0-10.176 17.056-25.344 27.232-25.344h590.912c10.176 0 9.056 15.168 9.056 25.344l.032 203.104m-182.464 37.824H389.8c-10.176 0-18.464 7.84-18.464 18.048s8.288 18.048 18.464 18.048h258.528c10.208 0 18.464-7.84 18.464-18.048s-8.288-18.048-18.464-18.048m0 106.688H389.8a18.432 18.432 0 1 0 0 36.864h258.528a18.432 18.432 0 1 0 0-36.864m111.968-327.136zm-27.2 0a27.168 27.168 0 1 0 54.336 0 27.168 27.168 0 0 0-54.336 0" fill="#636363"/></symbol><symbol id="redo" viewBox="0 0 22 22"><path d="M13 7H7v.003l-.002-.004-3 2.002.002.004V18h1.25V9.665L7.371 8.25H13V11l6-3.424v-.07L13 4v3z" fill="#5C5C5C" fill-rule="nonzero"/></symbol><symbol id="screenshot" viewBox="0 0 1024 1024"><path d="M840.3 253.9v522.3H193.7V253.9h646.6m49.8-49.8H143.9v621.8H890V204.1h.1zm-746.2-99.5v99.5H69.3v49.8h124.4V104.6zm746.2 820.8v-99.5h74.6v-49.8H840.3v149.3zM516 708.4H302.5c-7.8 0-20.4-2.9-23.3-7.8-2.9-4.9 1.9-16.5 5.8-23.3 26.2-39.8 53.4-79.6 79.6-119.4 8.7-12.6 17.5-13.6 31.1-7.8 44.6 21.4 90.3 42.7 135.9 64.1 12.6 5.8 28.1 1.9 35.9-9.7 24.3-37.9 49.5-74.7 75.7-111.6 4.9-6.8 13.6-17.5 20.4-17.5 7.8 0 13.6 12.6 16.5 20.4 24.3 60.2 47.6 121.3 70.9 181.5 9.7 25.2 5.8 31.1-23.3 31.1H516zm-78.6-298c0 29.1-25.2 52.4-54.4 51.4-29.1-1-51.4-23.3-51.4-51.4 0-29.1 24.3-52.4 54.4-51.4 27.1.9 51.4 24.2 51.4 51.4z" fill="#636363"/></symbol><symbol id="undo" viewBox="0 0 22 22"><path d="M9 7h6v.003l.002-.004 3 2.002-.002.004V18h-1.25V9.665L14.629 8.25H9V11L3 7.576v-.07L9 4v3z" fill="#5C5C5C" fill-rule="nonzero"/></symbol></svg>'

  document.querySelector('body').appendChild(el)
}

function loadCss (url, doc = document) {
  let link = doc.createElement("link")
  link.rel = "stylesheet"
  link.type = "text/css"
  link.href = url
  let head = doc.getElementsByTagName("head")[0]
  head.appendChild(link)
}

let loadJs = (url, doc = document) => {
  let script = doc.createElement("script")
  script.byebj = true
  script.type = "text/javascript"
  script.src = url
  let head = doc.getElementsByTagName("head")[0]
  head.appendChild(script)
}

function createEl (className, nodeName = '', style = '') {
  let el = document.createElement(nodeName || 'div')
  el.className = className
  if (style.length > 0) { el.style = style }
  return el
}

function createButton (src, className = '', tipText = '') {
  // let img = createEl('', 'img')
  // img.src = getPath("icons/" + src + ".svg")

  let tbic = createEl('toolbar-button-icon-container')
  let db = createEl('dui-badge', 'span')
  let tbw = createEl('toolbar-button-wrapper ' + (className ? className : ''))
  if (tipText.length > 0) {
    tbw.title = tipText
  }

  // tbic.appendChild(img)
  tbic.innerHTML = '<svg class="icon-sprite"><use xlink:href="#' + src + '"/></svg>'
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
      let html = getMceDoc().body.innerHTML;
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
    const targetDom = getMceDoc().body

    getMceWin().html2canvas(targetDom).then(canvas => {
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

// 格式刷
class FormatPainterButton extends BaseButton {
  constructor() {
    super()

    // 加入监听其他按钮按下的列表
    this.btnClickListenner = true

    // 模式：0 默认,1 一次性,2 重复
    this.mode = 0

    // 包含bind的事件，会返回一个新函数
    this.escHandler = null

    // 记录选中的样式
    this.wrapperNode = null

    this.selectingHandler = null

    this.render()
  }
  //#region 事件处理
  render () {
    this.el = createButton('brush', null, '格式刷，双击可重复使用')
    this.el.addEventListener('click', this.toggleOnce.bind(this))
    this.el.addEventListener('dblclick', this.toggleRepeately.bind(this))
  }
  OnButtonClicked (event) {
    // 不是自己点的，就退出格式刷
    if (event.target.outerHTML.includes('brush') === false) {
      this.toggleDefault()
    }
  }
  onPressEsc (event) {
    if (event.keyCode === 27) {
      this.toggleDefault()
    }
  }
  /**
   * 切换按钮显示状态
   * @param {模式的序号} modeNum 
   */
  toggleMode (modeNum, tipText) {
    this.mode = modeNum
    this.el.title = tipText

    let el = this.el

    if (this.mode !== 0) {
      if (el.className.indexOf('checked') === -1) {
        el.className += ' checked';
      }
    } else {
      el.className = el.className.replace(' checked', '');
    }
  }
  startHandler (modeNum) {
    // 先清除一下事件
    this.toggleDefault()

    // 再设置新的事件
    this.toggleMode(modeNum, '退出格式刷(Esc)')

    this.escHandler = this.onPressEsc.bind(this);

    // 监听窗口
    window.addEventListener('keydown', this.escHandler)

    // 监听编辑器
    getMceWin().addEventListener('keydown', this.escHandler)

    // 设置编辑器的焦点
    tinyMCE.activeEditor.focus()

    // 修改鼠标
    let mceBody = getMceDoc().querySelector('body')
    if (mceBody.className.indexOf('format-painter-active') === -1) {
      mceBody.className += ' format-painter-active';
    }

    // 记录样式
    let node = tinymce.activeEditor.selection.getNode()
    if (node.nodeName === 'BODY') { node = node.children[0] }
    this.wrapperNode = node.cloneNode()
  }
  toggleDefault () {
    this.toggleMode(0, '格式刷，双击可重复使用')

    // 解绑事件
    window.removeEventListener('keydown', this.escHandler)
    getMceWin().removeEventListener('keydown', this.escHandler)

    // 回收
    this.escHandler = null

    // 退出修改
    let mceBody = getMceDoc().querySelector('body')
    if (mceBody.className.indexOf('format-painter-active') > -1) {
      mceBody.className = mceBody.className.replace(' format-painter-active', '');
    }

    getMceDoc().removeEventListener('selectionchange', this.selectingHandler)

    // 清空选中样式
    this.wrapperNode = null

    // console.log('退出格式刷')
  }
  //#endregion
  onSelected (event) {
    let text = tinymce.activeEditor.selection.getContent()
    if (text.length > 0) {
      if (this.wrapperNode !== null) {
        this.wrapperNode.innerHTML = text

        tinymce.activeEditor.execCommand('delete')
        tinymce.activeEditor.insertContent(this.wrapperNode.outerHTML)
      }

      // 一次性，要移除事件
      if (this.mode === 1) {
        this.toggleDefault()
      }
      // console.log('选择完成')
    }

    // 清除
    getMceWin().removeEventListener('mouseup', this.selectedHandler)
    window.removeEventListener('mouseup', this.selectedHandler)
  }
  onSelecting (event) {
    // 先清除之前的
    getMceWin().removeEventListener('mouseup', this.selectedHandler)
    window.removeEventListener('mouseup', this.selectedHandler)

    // 重新添加事件
    this.selectedHandler = this.onSelected.bind(this)
    getMceWin().addEventListener('mouseup', this.selectedHandler)
    window.addEventListener('mouseup', this.selectedHandler)
  }
  toggleOnce () {
    // 已经选中了，再次点击就退出
    if (this.mode !== 0) {
      this.toggleDefault()
    } else {
      this.startHandler(1)

      this.selectingHandler = this.onSelecting.bind(this)
      getMceDoc().addEventListener('selectionchange', this.selectingHandler)

      // console.log('一次性使用，格式刷')
    }
  }
  toggleRepeately () {
    this.startHandler(2)

    this.selectingHandler = this.onSelecting.bind(this)
    getMceDoc().addEventListener('selectionchange', this.selectingHandler)

    // console.log('重复使用，格式刷')
  }
}

// 字数统计
class WordCountButton extends BaseButton {
  constructor() {
    super()

    this.render()
  }
  render () {
    this.totalEl = createEl('')
    this.selectionEl = createEl('')

    this.container = createEl('toolbar-button-text-container', null, 'width:auto')
    let el = createEl('toolbar-button-wrapper')
    el.appendChild(this.container)

    this.el = el
    this.update()
  }
  update () {
    this.totalEl.innerHTML = tinyMCE.activeEditor.getContent()
    this.selectionEl.innerHTML = tinyMCE.activeEditor.selection.getContent()

    let totalText = this.totalEl.innerText.replace(/[\n\r\s]/g, '')
    let selectionText = this.selectionEl.innerText.replace(/[\n\r\s]/g, '')

    let text = ''
    // 千分位显示
    if (selectionText.length > 0) {
      text = selectionText.length.qfw() + '/'
    }
    if (totalText.length > 0) {
      text += totalText.length.qfw() + ' 个字'
    }
    if (text.length === 0) {
      text = '没有内容'
    }
    this.container.innerText = text
    this.el.title = text
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
    this.clickNotifies = []

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
    // 每个工具栏的按钮加一个时间，用于监听事件
    btn.el.addEventListener('click', this.OnButtonClick.bind(this), false)

    if (btn.btnClickListenner === true) {
      this.clickNotifies.push(btn)
    }

    this.buttons.appendChild(btn.el)
  }
  OnButtonClick (event) {
    // 没有禁用时触发
    if (event.currentTarget.className.includes('disabled') === false) {
      this.clickNotifies.forEach(n => { n.OnButtonClicked(event) })
    }
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

  // 使用 svg sprite 来提高图标显示速度
  loadSvgSprite()

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
  toolbar.addButton(new dividerButton())

  // 格式刷
  var brushBtn = new FormatPainterButton()
  toolbar.addButton(brushBtn)

  // 清除格式
  var rfBtn = new RfButton()
  toolbar.addButton(rfBtn)

  // 设置标题
  var titleBtn = new TitleButton()
  toolbar.addButton(titleBtn)

  // 高亮
  var highlightBtn = new HightlightButton()
  toolbar.addButton(highlightBtn)

  // 分隔符
  toolbar.addButton(new dividerButton())

  // 字数统计
  var wcBtn = new WordCountButton()
  toolbar.addButton(wcBtn)

  // 分隔符 
  toolbar.addButton(new dividerButton())

  // 截屏
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
  subject.addSub(wcBtn)

  // 载入css
  loadCss(getPath('style.css'))

  // 追加到 body
  document.querySelector('body').appendChild(toolbar.el)

  tinymce.activeEditor.on("NodeChange", () => {
    subject.notify()
  })

  tinymce.activeEditor.on("Paste", (event) => {
    pasteImage(event)
  });

  // 用于支持格式刷的鼠标样式
  loadCss(getPath('tinymce.css'), getMceDoc())

  // 用于截图
  loadJs(getPath('html2canvas.min.js'), getMceDoc())
}

// main
const interval = setInterval(() => {
  if (tinymce !== undefined && tinymce.activeEditor !== null) {
    clearInterval(interval)
    addToolbar()
  }
}, 20)
//#endregion
