/**
 *  Author: topcss
 * version: v1.0
 *    Time: 2019-11-18
 * Website: https://github.com/topcss/
 */

//#region Common
function loadStyles (url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(link);
}

function createEl (className, name = 'div') {
  let el = document.createElement(name)
  el.className = className
  return el
}

function createButton (src, className = '') {
  let img = createEl('', 'img')
  img.src = getPath("icons/" + src + ".svg")

  let tbic = createEl('toolbar-button-icon-container')
  let db = createEl('dui-badge', 'span')
  let tbw = createEl('toolbar-button-wrapper ' + className)

  tbic.appendChild(img)
  db.appendChild(tbic)
  tbw.appendChild(db)

  return tbw
}

function getPath (filePath) {
  // publish
  return "https://topcss.github.io/EvernoteExtension/" + filePath;
  // dev
  // return filePath
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
    this.el = createButton('undo', 'disabled')

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
    this.el = createButton('redo', 'disabled')
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
    this.el = createButton('clear')
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
    this.el = createButton('highlight')
    this.el.addEventListener('click', function () {
      tinyMCE.activeEditor.execCommand('hilitecolor', false, 'yellow')
    })
  }
}

class PreviewButton extends BaseButton {
  constructor() {
    super()

    this.render()
  }
  render () {
    this.el = createButton('print')
    this.el.addEventListener('click', this.preview)
  }
  preview () {
    try {
      let html = document.querySelector('.mce-container iframe').contentDocument.body.innerHTML;
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

class HelpButton extends BaseButton {
  constructor() {
    super()

    this.render()
  }
  render () {
    this.el = createButton('help')
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

  // 分隔符
  var dividerBtn = new dividerButton()
  toolbar.addButton(dividerBtn)

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
  document.getElementsByTagName('body')[0].appendChild(toolbar.el)

  tinymce.activeEditor.on("NodeChange", () => {
    subject.notify()
  })

  tinymce.activeEditor.on("Paste", (event) => {
    pasteImage(event)
  });
}

// main
const interval = setInterval(() => {
  if (tinymce !== undefined && tinymce.activeEditor !== null) {
    clearInterval(interval)
    addToolbar()
  }
}, 20)
//#endregion
