<template>
  <div id="mountNode" :style="{width:width}">
    <div class="editor" >
      <context-menu />
      <!--toolbar-->
      <toolbar :mode="mode"/>
      <div style="height: 42px;"></div>
      <div class="bottom-container">
        <!--itempannel-->
        <item-panel :items="items" v-if="mode"/>
        <!--detailpannel-->
        <detail-panel />
        <!--miniMap-->
        <minimap />
        <!--page-->
        <page :height="height" :width="width" :data="data" :mode="mode"/>
      </div>
    </div>
    <Flow />
  </div>
</template>

<script>
import Toolbar from "./Toolbar";
import ItemPanel from "./ItemPanel";
import DetailPanel from "./DetailPanel";
import Minimap from "./Minimap";
import Page from "./Page";
import Flow from "./Flow"
import ContextMenu from "./ContextMenu";
import Editor from "./Base/Editor";
import command from "./command";
import eventBus from "./utils/eventBus";
export default {
  name: "G6Editor",
  components: {
    Toolbar,
    ItemPanel,
    DetailPanel,
    Minimap,
    Page,
    ContextMenu,
    Flow
  },
  props: {
    height: {
      type: Number,
      default: document.documentElement.clientHeight
    },
    width: {
      type: Number,
      default: document.documentElement.clientWidth
    },
    mode: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      default: () => {}
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  created() {
    this.init();
  },
  data() {
    return {
      editor: {},
      command: null
    };
  },
  methods: {
    init() {
      this.editor = new Editor();
      this.command = new command(this.editor);
      eventBus.$on('saveModel',model=>{
        this.$emit('save',model);
      });
      eventBus.$on('nodeChange',data=>{
        this.$emit('nodeChange',data);
      });
    }
  }
};
</script>

<style scoped>
.editor {
  position: relative;
  width: 100%;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.bottom-container {
  position: relative;
}
</style>