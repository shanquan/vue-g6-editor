import G6 from "@antv/g6/build/g6";
import { uniqueId } from '../utils'
import Shape from '@antv/g/src/shapes'
const customNode = {
  init() {
    G6.registerNode("customNode", {
      draw(cfg, group) {
        let size = cfg.size;
        if(!size){
          size=[170,34]
        }
        // 此处必须是NUMBER 不然bbox不正常
        const width = parseInt(size[0]);
        const height = parseInt(size[1]);
        const color = cfg.color;
        // 此处必须有偏移 不然drag-node错位
        const offsetX = -width / 2
        const offsetY = -height / 2
        const mainId = 'rect' + uniqueId()
        const shape = group.addShape("rect", {
          attrs: {
            id: mainId,
            x: offsetX,
            y: offsetY,
            width: width,
            height: height,
            stroke: "#ced4d9",
            fill: '#fff',//此处必须有fill 不然不能触发事件
            radius: 4
          }
        });
        group.addShape("rect", {
          attrs: {
            x: offsetX,
            y: offsetY,
            width: 4,
            height: height,
            fill: color,
            parent: mainId,
            radius: [4, 0, 0, 4]
          }
        });
        group.addShape("image", {
          attrs: {
            x: offsetX + 16,
            y: offsetY + 8,
            width: 20,
            height: 16,
            img: cfg.image,
            parent: mainId
          }
        });
        group.addShape("image", {
          attrs: {
            x: offsetX + width - 32,
            y: offsetY + 8,
            width: 16,
            height: 16,
            parent: mainId,
            img: cfg.stateImage
          }
        });
        if(cfg.backImage){
          const clip = new Shape.Rect({
            attrs: {
              x: offsetX,
              y: offsetY,
              width: width,
              height: height,
              fill:'#fff',
              radius: 4
            }
        });
          group.addShape("image", {
            attrs: {
              x: offsetX,
              y: offsetY,
              width: width,
              height: height,
              img: cfg.backImage,
              clip: clip
            }
          });
        }
        if (cfg.label) {
           group.addShape("text", {
            attrs: {
              id: 'label' + uniqueId(),
              x: offsetX + width / 2,
              y: offsetY + height / 2,
              textAlign: "center",
              textBaseline: "middle",
              text: cfg.label,
              parent: mainId,
              fill: "#565758"
            }
          });
        }
        // 未设置inPoints和outPoints
        if(!cfg.inPoints&&!cfg.outPoints){
          //let points = [[0,0],[width,0],[0,height],[width,height],[width * 0.5,0],[width * 0.5,height],[0,height * 0.5],[width,height * 0.5]];
          let points = [[width * 0.5,0],[width * 0.5,height],[0,height * 0.5],[width,height * 0.5]]
          points.forEach(el=>{
            const id = 'circle' + uniqueId()
            group.addShape("circle", {
              attrs: {
                id: 'circle' + uniqueId(),
                parent: id,
                x: el[0] + offsetX,
                y: el[1] + offsetY,
                r: 10,
                isInPointOut: true,
                isOutPointOut: true,
                fill: "#1890ff",
                opacity: 0
              }
            });
            group.addShape("circle", {
              attrs: {
                id: id,
                x: el[0] + offsetX,
                y: el[1] + offsetY,
                r: 3,
                isInPoint: true,
                isOutPoint: true,
                fill: "#fff",
                stroke: "#1890ff",
                opacity: 0
              }
            });
          })
        }
        if (cfg.inPoints) {
          for (let i = 0; i < cfg.inPoints.length; i++) {
            let x = 0,
              y = 0;
            //0为顶 1为底 2为左边 3为右边, inPoints: 0,2
            switch(cfg.inPoints[i][0]){
              case 0: x = width * cfg.inPoints[i][1];break;
              case 1: y = height;x = width * cfg.inPoints[i][1];break;
              case 2: y = height * cfg.inPoints[i][1];break;
              case 3: x = width;y= height * cfg.inPoints[i][1];break;
            }
            const id = 'circle' + uniqueId()
            group.addShape("circle", {
              attrs: {
                id: 'circle' + uniqueId(),
                parent: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 10,
                isInPointOut: true,
                fill: "#1890ff",
                opacity: 0
              }
            });
            group.addShape("circle", {
              attrs: {
                id: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 3,
                isInPoint: true,
                fill: "#fff",
                stroke: "#1890ff",
                opacity: 0
              }
            });
          }
        }
        if (cfg.outPoints) {
          for (let i = 0; i < cfg.outPoints.length; i++) {
            let x = 0,
              y = 0;
            //0为顶 1为底 2为左边 3为右边, outPoints: 1,3
            switch(cfg.outPoints[i][0]){
              case 0: x = width * cfg.outPoints[i][1];break;
              case 1: y = height;x = width * cfg.outPoints[i][1];break;
              case 2: y= height * cfg.outPoints[i][1];break;
              case 3: x = width;y= height * cfg.outPoints[i][1];break;
            }
            const id = 'circle' + uniqueId()
            group.addShape("circle", {
              attrs: {
                id: 'circle' + uniqueId(),
                parent: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 10,
                isOutPointOut: true,
                fill: "#1890ff",
                opacity: 0//默認0 需要時改成0.3
              }
            });
            group.addShape("circle", {
              attrs: {
                id: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 3,
                isOutPoint: true,
                fill: "#fff",
                stroke: "#1890ff",
                opacity: 0
              }
            });
          }
        }
        //group.sort()
        // 添加文本、更多图形
        return shape;
      },
      //设置状态
      setState(name, value, item) {
        const group = item.getContainer();
        const shape = group.get("children")[0]; // 顺序根据 draw 时确定

        const children = group.findAll(g => {
          return g._attrs.parent === shape._attrs.id
        });
        const circles = group.findAll(circle => {
          return circle._attrs.isInPoint || circle._attrs.isOutPoint;
        });
        const selectStyles = () => {
          shape.attr("fill", "#f3f9ff");
          shape.attr("stroke", "#6ab7ff");
          shape.attr("cursor", "move");
          children.forEach(child => {
            child.attr("cursor", "move");
          });
          circles.forEach(circle => {
            circle.attr('opacity', 1)
          })
        };
        const unSelectStyles = () => {
          shape.attr("fill", "#fff");
          shape.attr("stroke", "#ced4d9");
          circles.forEach(circle => {
            circle.attr('opacity', 0)
          })
        };
        switch (name) {
          case "selected":
          case "hover":
            if (value) {
              selectStyles()
            } else {
              unSelectStyles()
            }
            break;
        }
      }
    });
  }
}

export default customNode
