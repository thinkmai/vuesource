/* eslint-disable no-undef */
Vue.component('comp1',{
  template:`<div>
  comp1-----{{pdata.a}}
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
  methods: {
    onChange(){
      this.resData.a = Math.random()
    }
  },
  beforeUpdate(){
    console.log('app update---->>%o');
  },
});
