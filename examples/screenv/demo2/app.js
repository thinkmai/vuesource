/* eslint-disable no-undef */
new Vue({
  el: "#app",
  data() {
    return {
      msg1: "msg1",
      msg2: "msg2",
      num: 1,
    };
  },
  computed: {
    msg() {
      return this.msg1 + this.msg2;
    },
    numRes:{
        get:function(){
            return this.num;
        },
        set:function(v){
            this.num = v;
        }
    },
  },
  methods: {
    change() {
      this.msg1 = Math.random();
    },
    changeNum(){
        this.numRes = Math.random();
    }
  },
  mounted() {
    console.log("vue mounted---->>%o", this);
  },
});
