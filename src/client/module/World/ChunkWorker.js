// Generated by CoffeeScript 2.5.1
var State, TerrainManager, handlers, terrain, time;

import {
  CellTerrain
} from './CellTerrain.js';

import {
  Block
} from './../build/Block.js';

console.log("CHUNK WORKER STARTED!");

TerrainManager = class TerrainManager {
  constructor(options) {
    this.toxelSize = options.toxelSize;
    this.q = 1 / this.toxelSize;
    this.blocks = options.blocks;
    this.blocksMapping = options.blocksMapping;
    this.cellSize = options.cellSize;
    this.models = options.models;
    this.cellTerrain = new CellTerrain({
      cellSize: this.cellSize
    });
  }

  getToxel(x, y) {
    var x1, x2, y1, y2;
    x -= 1;
    y -= 1;
    x1 = this.q * x;
    y1 = 1 - this.q * y - this.q;
    x2 = this.q * x + this.q;
    y2 = 1 - this.q * y;
    return [[x1, y1], [x1, y2], [x2, y1], [x2, y2]];
  }

  genBlockFace(type, block, pos) {
    var toxX, toxY, uv;
    if (block.name === "water") {
      toxX = this.blocksMapping["water_flow"]["x"];
      toxY = this.blocksMapping["water_flow"]["y"];
    } else if (this.blocksMapping[block.name]) {
      toxX = this.blocksMapping[block.name]["x"];
      toxY = this.blocksMapping[block.name]["y"];
    } else {
      toxX = this.blocksMapping["debug"]["x"];
      toxY = 28 - this.blocksMapping["debug"]["y"];
    }
    uv = this.getToxel(toxX, toxY);
    switch (type) {
      case "pz":
        return {
          pos: [-0.5 + pos[0], -0.5 + pos[1], 0.5 + pos[2], 0.5 + pos[0], -0.5 + pos[1], 0.5 + pos[2], -0.5 + pos[0], 0.5 + pos[1], 0.5 + pos[2], -0.5 + pos[0], 0.5 + pos[1], 0.5 + pos[2], 0.5 + pos[0], -0.5 + pos[1], 0.5 + pos[2], 0.5 + pos[0], 0.5 + pos[1], 0.5 + pos[2]],
          norm: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
          uv: [...uv[0], ...uv[2], ...uv[1], ...uv[1], ...uv[2], ...uv[3]]
        };
      case "nx":
        return {
          pos: [0.5 + pos[0], -0.5 + pos[1], 0.5 + pos[2], 0.5 + pos[0], -0.5 + pos[1], -0.5 + pos[2], 0.5 + pos[0], 0.5 + pos[1], 0.5 + pos[2], 0.5 + pos[0], 0.5 + pos[1], 0.5 + pos[2], 0.5 + pos[0], -0.5 + pos[1], -0.5 + pos[2], 0.5 + pos[0], 0.5 + pos[1], -0.5 + pos[2]],
          norm: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
          uv: [...uv[0], ...uv[2], ...uv[1], ...uv[1], ...uv[2], ...uv[3]]
        };
      case "nz":
        return {
          pos: [0.5 + pos[0], -0.5 + pos[1], -0.5 + pos[2], -0.5 + pos[0], -0.5 + pos[1], -0.5 + pos[2], 0.5 + pos[0], 0.5 + pos[1], -0.5 + pos[2], 0.5 + pos[0], 0.5 + pos[1], -0.5 + pos[2], -0.5 + pos[0], -0.5 + pos[1], -0.5 + pos[2], -0.5 + pos[0], 0.5 + pos[1], -0.5 + pos[2]],
          norm: [0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1],
          uv: [...uv[0], ...uv[2], ...uv[1], ...uv[1], ...uv[2], ...uv[3]]
        };
      case "px":
        return {
          pos: [-0.5 + pos[0], -0.5 + pos[1], -0.5 + pos[2], -0.5 + pos[0], -0.5 + pos[1], 0.5 + pos[2], -0.5 + pos[0], 0.5 + pos[1], -0.5 + pos[2], -0.5 + pos[0], 0.5 + pos[1], -0.5 + pos[2], -0.5 + pos[0], -0.5 + pos[1], 0.5 + pos[2], -0.5 + pos[0], 0.5 + pos[1], 0.5 + pos[2]],
          norm: [-1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0],
          uv: [...uv[0], ...uv[2], ...uv[1], ...uv[1], ...uv[2], ...uv[3]]
        };
      case "py":
        return {
          pos: [0.5 + pos[0], 0.5 + pos[1], -0.5 + pos[2], -0.5 + pos[0], 0.5 + pos[1], -0.5 + pos[2], 0.5 + pos[0], 0.5 + pos[1], 0.5 + pos[2], 0.5 + pos[0], 0.5 + pos[1], 0.5 + pos[2], -0.5 + pos[0], 0.5 + pos[1], -0.5 + pos[2], -0.5 + pos[0], 0.5 + pos[1], 0.5 + pos[2]],
          norm: [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
          uv: [...uv[0], ...uv[2], ...uv[1], ...uv[1], ...uv[2], ...uv[3]]
        };
      case "ny":
        return {
          pos: [0.5 + pos[0], -0.5 + pos[1], 0.5 + pos[2], -0.5 + pos[0], -0.5 + pos[1], 0.5 + pos[2], 0.5 + pos[0], -0.5 + pos[1], -0.5 + pos[2], 0.5 + pos[0], -0.5 + pos[1], -0.5 + pos[2], -0.5 + pos[0], -0.5 + pos[1], 0.5 + pos[2], -0.5 + pos[0], -0.5 + pos[1], -0.5 + pos[2]],
          norm: [0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0],
          uv: [...uv[0], ...uv[2], ...uv[1], ...uv[1], ...uv[2], ...uv[3]]
        };
    }
  }

  genCellGeo(cellX, cellY, cellZ) {
    var _this, addFace, addGeo, i, j, k, l, m, n, normals, pos, positions, ref, ref1, ref2, uvs;
    _this = this;
    positions = [];
    normals = [];
    uvs = [];
    addFace = function(type, pos) {
      var faceVertex;
      faceVertex = _this.genBlockFace(type, _this.cellTerrain.getBlock(...pos), pos);
      positions.push(...faceVertex.pos);
      normals.push(...faceVertex.norm);
      uvs.push(...faceVertex.uv);
    };
    addGeo = function(geo, pos) {
      var i, l, norm, posi, ref, uv;
      posi = geo.position.array;
      norm = geo.normal.array;
      uv = geo.uv.array;
      for (i = l = 0, ref = posi.length - 1; (0 <= ref ? l <= ref : l >= ref); i = 0 <= ref ? ++l : --l) {
        positions.push(posi[i] + pos[i % 3]);
      }
      normals.push(...norm);
      uvs.push(...uv);
    };
    for (i = l = 0, ref = this.cellSize - 1; (0 <= ref ? l <= ref : l >= ref); i = 0 <= ref ? ++l : --l) {
      for (j = m = 0, ref1 = this.cellSize - 1; (0 <= ref1 ? m <= ref1 : m >= ref1); j = 0 <= ref1 ? ++m : --m) {
        for (k = n = 0, ref2 = this.cellSize - 1; (0 <= ref2 ? n <= ref2 : n >= ref2); k = 0 <= ref2 ? ++n : --n) {
          pos = [cellX * this.cellSize + i, cellY * this.cellSize + j, cellZ * this.cellSize + k];
          if (this.cellTerrain.getBlock(...pos).boundingBox === "block") {
            if (this.cellTerrain.getBlock(pos[0] + 1, pos[1], pos[2]).boundingBox !== "block") {
              addFace("nx", pos);
            }
            if (this.cellTerrain.getBlock(pos[0] - 1, pos[1], pos[2]).boundingBox !== "block") {
              addFace("px", pos);
            }
            if (this.cellTerrain.getBlock(pos[0], pos[1] - 1, pos[2]).boundingBox !== "block") {
              addFace("ny", pos);
            }
            if (this.cellTerrain.getBlock(pos[0], pos[1] + 1, pos[2]).boundingBox !== "block") {
              addFace("py", pos);
            }
            if (this.cellTerrain.getBlock(pos[0], pos[1], pos[2] + 1).boundingBox !== "block") {
              addFace("pz", pos);
            }
            if (this.cellTerrain.getBlock(pos[0], pos[1], pos[2] - 1).boundingBox !== "block") {
              addFace("nz", pos);
            }
          } else if (this.cellTerrain.getBlock(...pos).name === "water") {
            if (this.cellTerrain.getBlock(pos[0] + 1, pos[1], pos[2]).name === "air") {
              addFace("nx", pos);
            }
            if (this.cellTerrain.getBlock(pos[0] - 1, pos[1], pos[2]).name === "air") {
              addFace("px", pos);
            }
            if (this.cellTerrain.getBlock(pos[0], pos[1] - 1, pos[2]).name === "air") {
              addFace("ny", pos);
            }
            if (this.cellTerrain.getBlock(pos[0], pos[1] + 1, pos[2]).name === "air") {
              addFace("py", pos);
            }
            if (this.cellTerrain.getBlock(pos[0], pos[1], pos[2] + 1).name === "air") {
              addFace("pz", pos);
            }
            if (this.cellTerrain.getBlock(pos[0], pos[1], pos[2] - 1).name === "air") {
              addFace("nz", pos);
            }
          }
        }
      }
    }
    return {positions, normals, uvs};
  }

};

addEventListener("message", function(e) {
  var fn;
  fn = handlers[e.data.type];
  if (!fn) {
    throw new Error('no handler for type: ' + e.data.type);
  }
  fn(e.data.data);
});

State = {
  init: null,
  world: {}
};

terrain = null;

time = 0;

handlers = {
  init: function(data) {
    State.init = data;
    terrain = new TerrainManager({
      models: data.models,
      blocks: data.blocks,
      blocksMapping: data.blocksMapping,
      toxelSize: data.toxelSize,
      cellSize: data.cellSize
    });
  },
  setVoxel: function(data) {
    return terrain.cellTerrain.setVoxel(...data);
  },
  genCellGeo: function(data) {
    var geo;
    if (((terrain.cellTerrain.vec3(...data)) in terrain.cellTerrain.cells) === true) {
      geo = terrain.genCellGeo(...data);
      return postMessage({
        cell: geo,
        info: data
      });
    }
  },
  setCell: function(data) {
    terrain.cellTerrain.setCell(data[0], data[1], data[2], data[3]);
    return terrain.cellTerrain.setBiome(data[0], data[1], data[2], data[4]);
  }
};
