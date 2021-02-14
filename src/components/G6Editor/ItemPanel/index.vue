<template>
  <div class="itempannel">
    <el-input
      placeholder="请输入内容"
      clearable
      size="small"
      prefix-icon="el-icon-search"
      v-model="qs">
    </el-input>
    <ul>
      <li
        v-for="(item,index) in filterList"
        :key="index"
        class="getItem"
        :data-shape="item.shape"
        :data-type="item.type"
        :data-size="item.size"
        :draggable="item.draggable"
        @dragstart="handleDragstart"
        @dragend="handleDragEnd($event,item)"
      >
        <span class="pannel-type-icon" :style="{background:'url('+item.image+')'}"></span>
        {{item.label}}
      </li>
    </ul>
  </div>
</template>

<script>
import eventBus from "../utils/eventBus";
import bgImg from "@/assets/bg.jpg";
const SIZE="170*34"; // 170*34
export default {
  data() {
    return {
      page: null,
      command:null,
      qs: "",
      offsetX: 0,
      offsetY: 0,
    };
  },
  props:{
    items: {
      type: Array,
      default: () => []
    }
  },
  created() {
    this.bindEvent();
  },
  computed:{
    filterList(){
      let qs = this.qs.trim();
      let list = this.items.map(el=>{
        el.size = SIZE;
        return el;
      })
      return qs?list.filter(el=>{
        return el.label.indexOf(qs)>-1
      }):list
    }
  },
  methods: {
    handleDragstart(e) {
      this.offsetX = e.offsetX;
      this.offsetY = e.offsetY;
    },
    handleDragEnd(e, item) {
      let data = {};
      Object.assign(data, item);
      data.offsetX = this.offsetX;
      data.offsetY = this.offsetY;
      if (this.page) {
        const graph = this.page.graph;
        // const size = e.target.dataset.size.split("*");
        const xy = graph.getPointByClient(e.x, e.y);
        data.x = xy.x;
        data.y = xy.y;
        data.size = item.size.split("*");
        data.type = "node";
        this.command.executeCommand("add", [data]);
      }
    },
    bindEvent() {
      eventBus.$on("afterAddPage", page => {
        this.page = page;
        this.command = page.command;
      });
    },
  }
};
</script>

<style scoped>
.itempannel {
  /* top: 0px;
  bottom: 0; */
  height: 100%;
  position: absolute;
  left: 0px;
  z-index: 2;
  background: #f7f9fb;
  width: 200px;
  padding-top: 8px;
  border-right: 1px solid #e6e9ed;
}
.itempannel ul {
  padding: 0px;
  padding-left: 16px;
}
.itempannel li {
  color: rgba(0, 0, 0, 0.65);
  border-radius: 4px;
  width: 160px;
  height: 28px;
  line-height: 26px;
  padding-left: 8px;
  border: 1px solid rgba(0, 0, 0, 0);
  list-style-type: none;
}
.itempannel li:hover {
  background: white;
  border: 1px solid #ced4d9;
  cursor: move;
}

.itempannel .pannel-type-icon {
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
}
.itempannel .el-input{margin-bottom:8px}
.getItem[draggable="false"]{
  cursor: default!important;
}
</style>