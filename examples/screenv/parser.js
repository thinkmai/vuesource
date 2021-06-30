/* eslint-disable no-unused-vars */
// id="app" id='app' id=app
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
//标签名  <my-header></my-header>
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
// <my:header></my:header>
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
// <div
const startTagOpen = new RegExp(`^<${qnameCapture}`);
// > />
const startTagClose = /^\s*(\/?)>/;
// </div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

function parse (html) {

  let text,
      root,
      currentParent,
      stack = [];
  //解析逻辑：边解析，边删除
  //如果html没有解析完，继续解析，知道html为空为止
  while (html) {
    let textEnd = html.indexOf('<');

    if (textEnd === 0) {
      const startTagMatch = parseStartTag();
      
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }

      const endTagMatch = html.match(endTag);

      if (endTagMatch) {
        advance(endTagMatch[0].length);
        end(endTagMatch[1]);
        continue;
      }
    }

    if (textEnd > 0) {
      text = html.substring(0, textEnd);
    }

    if (text) {
      advance(text.length);
      chars(text);
    }
  }


  function parseStartTag () {
    //start: ['<div','div']
    const start = html.match(startTagOpen);
    // console.log("🚀 ~ file: astParser.js ~ line 62 ~ parseStartTag ~ start", start)

    let end,
        attr;
    
    if (start) {
      //匹配到开始标签了<div
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length);
      //没有匹配到结束标签并且还有属性设置
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        /**
         * 0: " id=\"app\""
           1: "id"
           2: "="
           3: "app"
         */
        console.log("🚀 ~ file: astParser.js ~ line 76 ~ parseStartTag ~ attr", attr)
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5]
        });
        advance(attr[0].length);
      }
      //匹配到结束标签
      if (end) {
        advance(end[0].length);
        return match;
      }
    }
  }
  //删除匹配的字符，删除n个资费
  function advance (n) {
    html = html.substring(n);
  }
  
  // currentParent div
  //stack [div]
  function start(tagName, attrs) {
    const element = createASTElement(tagName, attrs);
    
    if (!root) {
      root = element;
    }

    currentParent = element;
    stack.push(element);
  }

  function end(tagName) {
          // span
    const element = stack.pop();
    // div
    currentParent = stack[stack.length - 1];
    if (currentParent) {
      // span => parent => div
      element.parent = currentParent;
      // div => children => push => span
      currentParent.children.push(element);
    }
  }

  function chars(text) {
    text = text.trim();

    if (text.length > 0) {
      currentParent.children.push({
        type: 3,
        text
      })
    }
  }

  function createASTElement(tagName, attrs) {
    return {
      tag: tagName,
      type: 1,
      children: [],
      attrs,
      parent
    }
  }
  return root;
}


export {
  parse
}