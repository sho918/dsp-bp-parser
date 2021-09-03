import { Parser } from 'binary-parser';
import { concatArrayBuffers } from '../utils';

export class Building {
  index: number;
  areaIndex: number;
  localOffsetX: number;
  localOffsetY: number;
  localOffsetZ: number;
  localOffsetX2: number;
  localOffsetY2: number;
  localOffsetZ2: number;
  yaw: number;
  yaw2: number;
  itemId: number;
  modelIndex: number;
  tempOutputObjIdx: number;
  tempInputObjIdx: number;
  outputToSlot: number;
  inputFromSlot: number;
  outputFromSlot: number;
  inputToSlot: number;
  outputOffset: number;
  inputOffset: number;
  recipeId: number;
  filterId: number;
  num: number;
  parameters: number[];

  constructor(data: Record<string, number | number[]>) {
    Object.assign(this, data);
  }

  static BuildingParser(): Parser {
    return new Parser()
      .endianess('little')
      .int32('index')
      .int8('areaIndex')
      .floatle('localOffsetX')
      .floatle('localOffsetY')
      .floatle('localOffsetZ')
      .floatle('localOffsetX2')
      .floatle('localOffsetY2')
      .floatle('localOffsetZ2')
      .floatle('yaw')
      .floatle('yaw2')
      .int16('itemId')
      .int16('modelIndex')
      .int32('tempOutputObjIdx')
      .int32('tempInputObjIdx')
      .int8('outputToSlot')
      .int8('inputFromSlot')
      .int8('outputFromSlot')
      .int8('inputToSlot')
      .int8('outputOffset')
      .int8('inputOffset')
      .int16('recipeId')
      .int16('filterId')
      .int16('num')
      .array('parameters', { type: 'int32le', length: 'num' });
  }

  export() {
    const r = new ArrayBuffer(61 + 4 * this.num);
    const dv = new DataView(r);

    dv.setInt32(0, this.index, true);
    dv.setInt8(4, this.areaIndex);
    dv.setFloat32(5, this.localOffsetX, true);
    dv.setFloat32(9, this.localOffsetY, true);
    dv.setFloat32(13, this.localOffsetZ, true);
    dv.setFloat32(17, this.localOffsetX2, true);
    dv.setFloat32(21, this.localOffsetY2, true);
    dv.setFloat32(25, this.localOffsetZ2, true);
    dv.setFloat32(29, this.yaw, true);
    dv.setFloat32(33, this.yaw2, true);
    dv.setInt16(37, this.itemId, true);
    dv.setInt16(39, this.modelIndex, true);
    dv.setInt32(41, this.tempOutputObjIdx, true);
    dv.setInt32(45, this.tempInputObjIdx, true);
    dv.setInt8(49, this.outputToSlot);
    dv.setInt8(50, this.inputFromSlot);
    dv.setInt8(51, this.outputFromSlot);
    dv.setInt8(52, this.inputToSlot);
    dv.setInt8(53, this.outputOffset);
    dv.setInt8(54, this.inputOffset);
    dv.setInt16(55, this.recipeId, true);
    dv.setInt16(57, this.filterId, true);
    dv.setInt16(59, this.num, true);

    for (let i = 0; i < this.num; i++) {
      dv.setInt32(61 + 4 * i, this.parameters[i], true);
    }

    return r;
  }
}
