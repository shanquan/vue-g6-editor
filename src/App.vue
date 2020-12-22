<template>
  <div id="app">
    <G6Editor :mode="mode" :data="data" :items="items" @save="onSave"></G6Editor>
  </div>
</template>

<script>
import G6Editor from './components/G6Editor'
import DATA from './flow_data'
const nodeEx = {
  shape: "customNode",
  color: "#1890ff",
  image: process.env.BASE_URL+"images/start.svg"
}
export default {
  name: 'app',
  components:{G6Editor},
  created(){
    this.initData();
  },
  data(){
    return{
      data:null,
      items:[],
      mode: 1 // 0: readonly 1: edit
    }
  },
  methods:{
    initData(){
      this.data = null;
      this.items = [];
      this.getItems();
      this.getData();
    },
    getData(){
      // fetch your model data
      const data = DATA;
      if(data.nodes&&data.nodes.length){
        data.nodes = data.nodes.map(it=>{
          it.x = Number(it.x);
          it.y = Number(it.y);
          Object.assign(it,nodeEx)
          return it;
        })
      }
      if(data.edges&&data.edges.length){
        data.edges = data.edges.map(it=>{
          Object.assign(it,{
            shape: "customEdge"
          })
          return it;
        })
      }
      this.mode = data.mode||0;
      this.data = data.nodes&&data.nodes.length?data:null;
    },
    getItems(){
      // fetch your items
      this.items = [{"label":"测试节点1"},{"label":"测试节点2"}].map(el=>{
        Object.assign(el,nodeEx)
        return el;
      })
    },
    onSave(model){
      console.log(model);
      // send the model to server
    }
  }
}
</script>

<style>
html, body {
    overflow: hidden;
    margin: 0;
    font-size: 12px;
}
#app{
  margin: 0;
  padding: 0;
}
</style>
