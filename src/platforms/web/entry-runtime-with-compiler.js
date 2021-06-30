/* eslint-disable no-unused-vars */
/* @flow */

import config from 'core/config'
import { warn, cached } from 'core/util/index'
import { mark, measure } from 'core/util/perf'

import Vue from './runtime/index'
import { query } from './util/index'
import { compileToFunctions } from './compiler/index'
import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat'

const idToTemplate = cached(id => {
  const el = query(id)
  return el && el.innerHTML
})

const mount = Vue.prototype.$mount
//入口文件的$mount
//1.获取模板
//2.模板->ast->render函数
//3.调用lifecycle中的mount方法，走生命周期方法
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)
  //el不能是body，和html节点
  if (el === document.body || el === document.documentElement) {
    return this
  }

  const options = this.$options
  // 如果是不存在render函数，则处理template和el情况
  //vue处理的优先顺序为render>template>el
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        //template:'<div></div>' 这种情况
        return this
      }
    } else if (el) {
      //el:'#app'
      template = getOuterHTML(el)
    }
    if (template) {
      //compileToFunctions的作用是 tempalte->render函数
      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns
    }
  }
  return mount.call(this, el, hydrating)
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el: Element): string {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions

export default Vue
