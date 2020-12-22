# vue-g6-editor

fork自[vue-g6-editor](https://github.com/caoyu48/vue-g6-editor), 为内部系统集成新增如下内容：
- mode设置只读和编辑模式，只读模式下只能修改节点信息，可在`flow_data.js`中设置`mode`;
- 节点增加左右两个连接点，且每个连接点均可作为箭头起点和终点；
- 组件文件目录调整，单一入口文件夹：`components/G6Editor`；
- 模型数据和自定义节点可在组件中配置, 可从接口获取



