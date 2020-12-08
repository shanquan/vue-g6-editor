const model = {
    "nodes": [
      {
        "name": "测试节点",
        "label": "测试节点",
        "size": [
          "170",
          "34"
        ],
        "type": "node",
        "x": 204,
        "y": 83,
        "shape": "customNode",
        "color": "#1890ff",
        "image": "images/start.svg",
        "stateImage": "images/ok.svg",
        "inPoints": [
          [
            0,
            0.5
          ]
        ],
        "outPoints": [
          [
            1,
            0.5
          ]
        ],
        "offsetX": 69,
        "offsetY": 18,
        "id": "node2"
      },
      {
        "name": "双输出节点",
        "label": "双输出节点",
        "size": [
          "170",
          "34"
        ],
        "type": "node",
        "x": 178,
        "y": 213,
        "shape": "customNode",
        "color": "#1890ff",
        "image": "images/start.svg",
        "stateImage": "images/close.svg",
        "inPoints": [
          [
            0,
            0.5
          ]
        ],
        "outPoints": [
          [
            1,
            0.4
          ],
          [
            1,
            0.6
          ]
        ],
        "offsetX": 54,
        "offsetY": 11,
        "id": "node9"
      }
    ],
    "edges": [
      {
        "id": "edge67",
        "source": "node2",
        "target": "node9",
        "sourceId": "node2",
        "targetId": "node9",
        "start": {
          "x": 0,
          "y": 17
        },
        "end": {
          "x": 0,
          "y": -17
        },
        "shape": "customEdge",
        "type": "edge",
        "startPoint": {
          "x": 200.5,
          "y": 100.5
        },
        "endPoint": {
          "x": 181.5,
          "y": 195.5
        }
      }
    ],
    "groups": []
  }

export default model