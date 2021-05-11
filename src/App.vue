<template>
  <div id="app">
    <G6Editor :mode="mode" :data="data" :items="items" @nodeChange="onNodeChange" @save="onSave"></G6Editor>
  </div>
</template>

<script>
import G6Editor from './components/G6Editor'
import DATA from './flow_data'
import { defaultsDeep } from 'lodash';
const nodeEx = {
  shape: "customNode",
  color: "#1890ff",
  image: process.env.BASE_URL+"images/start.svg"
}
const pos = [{x:-85,y:0},{x:0,y:-17},{x:85,y:0},{x:0,y:17}]
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
        data.edges = data.edges.filter(it=>it.source!=it.target).map(it=>{
          Object.assign(it,{
            start: pos[it.start],
            end: pos[it.end],
            shape: "customEdge"
          })
          return it;
        })
      }
      this.mode = data.mode || 0;
      this.data = data;
      this.onNodeChange(this.data);
    },
    getItems(){
      // fetch your items
      this.items = [{"label":"测试节点1"},{"label":"测试节点2"}].map(el=>{
        Object.assign(el,nodeEx)
        return el;
      })
      this.onNodeChange();
    },
    /**
     * 判断是否存在箭头被隐藏的连线
     */
    edgesHidden(el){
      let res = false;
      if(el.start==3&&el.end==1&&el.endPoint.y<el.startPoint.y){
        res = true;
      }else if(el.start==1&&el.end==3&&el.endPoint.y>el.startPoint.y){
        res = true;
      }else if(el.start==2&&el.end==0&&el.endPoint.x<el.startPoint.x){
        res = true;
      }else if(el.start==0&&el.end==2&&el.endPoint.x>el.startPoint.x){
        res = true;
      }
      return res;
    },
    onSave(obj){
      let hiddenEdges = [];
      let model={};
      defaultsDeep(model,obj.model);
      model.edges = model.edges.filter(it=>it.source!=it.target).map(el=>{
        el.start = pos.findIndex(it=>it.x==el.start.x&&it.y==el.start.y);
        el.end = pos.findIndex(it=>it.x==el.end.x&&it.y==el.end.y);
        if(this.edgesHidden(el))
        hiddenEdges.push(el.id)
        return el
      })
      console.log(model);
      if(hiddenEdges.length){
        // 高亮隐藏箭头的连线
        model.edges.forEach(el=>{
          let edge = obj.graph.findById(el.id);
          if(hiddenEdges.includes(el.id)){
            obj.graph.setItemState(edge, 'selected', true);
          }else{
            obj.graph.setItemState(edge, 'selected', false);
          }
        })
        this.$message.error("存在隐藏箭头的连线，请优化布局后保存！");
      }else{
        // send the model to server
      }
    },
    onNodeChange(data){
      // 画布已有节点，不能再添加
      data = data?data:this.data;
      if(this.items&&this.items.length)
      this.items = this.items.map(el=>{
        let findNode;
        if(data&&data.nodes&&data.nodes.length)
        findNode = data.nodes.find(it=>it.label==el.label);
        el.draggable = !findNode;
        return el;
      })
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
