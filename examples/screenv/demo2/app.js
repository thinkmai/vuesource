/* eslint-disable no-undef */
new Vue({
    el: '#app',
    data(){
        return {
            msg1:'msg1',
            msg2:'msg2',
            name:'123'
        } 
    },
    computed:{
        msg(){
            return this.msg1+this.msg2;
        }
    },
    methods:{
        change(){
            this.msg1 = Math.random();
            // this.msg1 = 'msg1';
        }
    },
    mounted(){
        console.log('vue mounted---->>%o', this);
    }
})