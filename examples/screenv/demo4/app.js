/* eslint-disable no-undef */
Vue.component('comp1',{
  template:`<div>
  comp1-----{{pdata.c}}
  </div>`,
  props:{
    pdata:{
      type: Object,
      default: ()=>{
        return {
          a:0
        }
      }

    }
  },
  beforeUpdate(){
    console.log('comp1 update---->>%o');
  }
})
Vue.component('comp2',{
  template:`<div>
    comp2---{{pdata.b}}
  </div>`,
  props:{
    pdata:{
      type: Object,
      default: ()=>{
        return {
          b:0
        }
      }

    }
  },
  data:()=>{
    return {

    }
  },
  beforeUpdate(){
    console.log('comp2 update---->>%o');
  }
})
new Vue({
  el: "#app",
  data() {
    return {
      resData:{
        a:1,
        b:2
      }
    };
  },
  computed: {
    
  },
  mounted(){
    this.resData = {
      a:123,
      b:456,
      c:789
    }
  },
  methods: {
    onChange(){
      if(!this.resData['c']){
        this.resData['c'] = 100
      }
      this.resData.c = Math.random()
      this.resData.a = Math.random()
    }
  },
  beforeUpdate(){
    console.log('app update---->>%o');
  },
});
