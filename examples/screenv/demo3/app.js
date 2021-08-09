/* eslint-disable no-undef */
Vue.component('app-slot',{
  template:`<div>
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>`,
  data:()=>{
    return {

    }
  }
})
new Vue({
  el: "#app",
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  },
});
