<template>
  <div class="page" :class="mode?'edit':''">
    <div :id="pageId" class="graph-container" style="position: relative;"></div>
  </div>
</template>


<script>
import G6 from "@antv/g6";
import { initBehavors } from "../behavior";
export default {
  data() {
    return {
      pageId: "graph-container",
      graph: null
    };
  },
  props: {
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      default: () => {}
    },
    mode: {
      type: Number,
      default: 0
    }
  },
  created() {
    initBehavors();
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  watch:{
    data(){
      this.readData();
    },
    mode(){
      this.setMode()
    }
  },
  methods: {
    init() {
      const height =  this.height - 45
      const width =  this.width - 400

      this.graph = new G6.Graph({
        container: "graph-container",
        height: height,
        width: width,
        modes: {
          // 支持的 behavior
          default: [
            "drag-canvas",
            "zoom-canvas",
            "hover-node",
            "select-node",
            "hover-edge",
            "keyboard",
            "customer-events",
            "add-menu"
          ],
          mulitSelect: ["mulit-select"],
          addEdge: ["add-edge"],
          moveNode:[ "drag-item"],
          readOnly: [
            "drag-canvas",
            "zoom-canvas",
            "select-node",
            "hover-edge"
          ]
        }
      });
      const { editor, command } = this.$parent;
      editor.emit("afterAddPage", { graph: this.graph, command });
      this.setMode();
      this.readData();
    },
    readData() {
      let data = this.data;
      if (data&&data.nodes&&data.nodes.length) {
        this.graph.read(data);
      }else{
        this.graph.clear()
      }
    },
    setMode(){
      if(this.mode){
        this.graph.setMode('default');
      }else{
        this.graph.setMode('readOnly');
        this.graph.changeSize(this.graph.get("width")+200,this.graph.get("height"));
      }
    }
  }
};
</script>

<style scoped>
.page{
  margin-right: 200px;
}
.page.edit{
  margin-left:200px;
}
</style>