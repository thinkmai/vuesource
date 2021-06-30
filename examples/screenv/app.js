// eslint-disable-next-line no-undef
new Vue({
    el: '#app',
    data(){
        return {
            msg:"Hi，大家好，欢迎参加此次Vue源码分享",
            frameworks:[
                '中国Vue,发展势头很好',
                '国际React,Vdom先驱者,社区很强大',
                '国际Angular,真正工程化框架'
            ],
            name:'分享者:screenv'
        } 
    },
    mounted(){
        console.log('vue mounted---->>%o', this);
    }
})