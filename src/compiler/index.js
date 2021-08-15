/* eslint-disable no-unused-vars */
/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  console.log("🚀 ~ file: index.js ~ line 14 ~ template", template)
  const ast = parse(template.trim(), options)
  // console.log("🚀 ~ file: index.js ~ line 17 ~ ast", ast)
  removeKey(ast)
  console.log("🚀 ~ file: index.js ~ line 16 ~ ast", JSON.stringify(ast))
  
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  const code = generate(ast, options)
  console.log("🚀 ~ file: index.js ~ line 20 ~ code", JSON.stringify(code.render))
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})

function removeKey(obj){
  Object.keys(obj).forEach((k)=>{
    if(k == 'parent'){
      delete obj['parent']
    }else if(obj[k] && typeof obj[k] == 'object'){
      removeKey(obj[k])
    }
  
  })
}