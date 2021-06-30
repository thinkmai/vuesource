/* eslint-disable no-unused-vars */
function Component(){
    this._c = (tag,attrs,children)=>{
        console.log("🚀 ~ file: with.js ~ line 4 ~ Component ~ tag,attrs", tag,attrs)
    }
    this._s = (value)=>{
        console.log("🚀 ~ file: with.js ~ line 10 ~ Component ~ value", value)
    }
}
let comp = new Component();
let render = new Function('comp1',`with(this){_c('div','attrs:{"id":"123"}',[_c('span',null,_s('test'))])}`)
render.call(comp)