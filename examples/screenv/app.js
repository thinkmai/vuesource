// eslint-disable-next-line no-undef
new Vue({
    el: '#app',
    data(){
        return {
            msg:"Hi，大家好，欢迎参加此次Vue源码分享",
            frameworks:[
                'Vue',
                'React',
                'Angular'
            ],
            name:'分享者:screenv'
        } 
    },
    mounted(){
        console.log('vue mounted---->>%o', this);
    }
})