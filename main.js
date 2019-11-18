
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

function createButton (src, className) {
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
  return "https://topcss.github.io/EvernoteExtension/" + filePath;
}

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

  // 加入观察
  subject.addSub(undoBtn)
  subject.addSub(redoBtn)

  // 载入css
  loadStyles(getPath('style.css'))

  // 追加到 body
  document.getElementsByTagName('body')[0].appendChild(toolbar.el)

  // tb.appendChild(createButton('redo'))
  // tb.appendChild(createButton('undo', 'disabled'))
  // toolbar.appendChild(createEl('toolbar-button-divider'))
  // toolbar.appendChild(createButton('brush', 'checked'))
  // toolbar.appendChild(createButton('fold'))
  // toolbar.appendChild(createButton('unfold'))
  // toolbar.appendChild(createEl('toolbar-button-divider'))
  // toolbar.appendChild(createButton('highlight'))

  tinymce.activeEditor.on("NodeChange", function (e) {
    subject.notify()
  });
}

// var editor = tinyMCE.activeEditor;

// tinyMCE.activeEditor.undoManager.hasRedo()


setTimeout(function () {

  addToolbar();

}, 1000)
