### patch入口文件
    src/platforms/web/runtime/patch.js
        真正调用是 /core/vdom/patch里的createPatchFunction高阶函数，返回的是一个真正patch
### patch何时调用，以及在哪调用
    _update /core/instance/lifecycle/lifecycleMinx
    在render函数生成后，_update方法里调用的__patch__
    __patch__ 在 /plantforms/web/runtime下定义