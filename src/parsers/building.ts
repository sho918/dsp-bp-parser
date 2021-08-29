import { Parser } from 'binary-parser';

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
}
