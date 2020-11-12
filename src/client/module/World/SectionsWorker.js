// Generated by CoffeeScript 2.5.1
(function() {
  var BitArray, ChunkDecoder, cd, handlers,
    modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

  console.log("SECTIONS WORKER STARTED!");

  BitArray = class BitArray {
    constructor(options) {
      var length, valueMask, valuesPerLong;
      if (options === null) {
        return;
      }
      if (!options.bitsPerValue > 0) {
        console.error('bits per value must at least 1');
      }
      if (!(options.bitsPerValue <= 32)) {
        console.error('bits per value exceeds 32');
      }
      valuesPerLong = Math.floor(64 / options.bitsPerValue);
      length = Math.ceil(options.capacity / valuesPerLong);
      if (!options.data) {
        options.data = Array(length * 2).fill(0);
      }
      valueMask = (1 << options.bitsPerValue) - 1;
      this.data = options.data;
      this.capacity = options.capacity;
      this.bitsPerValue = options.bitsPerValue;
      this.valuesPerLong = valuesPerLong;
      this.valueMask = valueMask;
      return;
    }

    get(index) {
      var endBitOffset, endLong, indexInLong, indexInStartLong, result, startLong, startLongIndex;
      if (!(index >= 0 && index < this.capacity)) {
        console.error('index is out of bounds');
      }
      startLongIndex = Math.floor(index / this.valuesPerLong);
      indexInLong = (index - startLongIndex * this.valuesPerLong) * this.bitsPerValue;
      if (indexInLong >= 32) {
        indexInStartLong = indexInLong - 32;
        startLong = this.data[startLongIndex * 2 + 1];
        return (startLong >>> indexInStartLong) & this.valueMask;
      }
      startLong = this.data[startLongIndex * 2];
      indexInStartLong = indexInLong;
      result = startLong >>> indexInStartLong;
      endBitOffset = indexInStartLong + this.bitsPerValue;
      if (endBitOffset > 32) {
        endLong = this.data[startLongIndex * 2 + 1];
        result |= endLong << (32 - indexInStartLong);
      }
      return result & this.valueMask;
    }

    length() {
      return this.data.length / 2;
    }

    getBitsPerValue() {
      return this.bitsPerValue;
    }

  };

  ChunkDecoder = class ChunkDecoder {
    constructor(options) {}

    //NOTHING
    getBlockIndex(pos) {
      return (pos.y << 8) | (pos.z << 4) | pos.x;
    }

    cvo(voxelX, voxelY, voxelZ) {
      var x, y, z;
      x = modulo(voxelX, 16) | 0;
      y = modulo(voxelY, 16) | 0;
      z = modulo(voxelZ, 16) | 0;
      return y * 16 * 16 + z * 16 + x;
    }

    computeSections(packet) {
      var biome, cell, data, i, j, k, l, len, m, num, palette, pos, result, sections, solidBlockCount, x, y, z;
      sections = packet.sections;
      num = 0;
      result = [];
      for (j = 0, len = sections.length; j < len; j++) {
        i = sections[j];
        num += 1;
        if (i !== null) {
          solidBlockCount = i.solidBlockCount;
          palette = i.palette;
          data = new BitArray(i.data);
          pos = {
            x: 0,
            y: 0,
            z: 0
          };
          cell = new Uint8Array(16 * 16 * 16);
          biome = new Uint8Array(16 * 16 * 16);
          for (x = k = 0; k <= 15; x = ++k) {
            for (y = l = 0; l <= 15; y = ++l) {
              for (z = m = 0; m <= 15; z = ++m) {
                // ct.setVoxel packet.x+x,num+y,packet.z+z
                cell[this.cvo(x, y, z)] = palette[data.get(this.getBlockIndex({x, y, z}))];
                // base.push(palette[data.get(@getBlockIndex({x,y,z}))])
                biome[this.cvo(x, y, z)] = packet.biomes[(((num + y) >> 2) & 63) << 4 | (((packet.z + z) >> 2) & 3) << 2 | (((packet.x + x) >> 2) & 3)];
              }
            }
          }
          result.push({
            x: packet.x,
            y: num,
            z: packet.z,
            cell,
            biome
          });
        } else {
          result.push(null);
        }
      }
      return result;
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

  cd = new ChunkDecoder();

  handlers = {
    computeSections: function(data) {
      return postMessage({
        result: cd.computeSections(data)
      });
    }
  };

}).call(this);
