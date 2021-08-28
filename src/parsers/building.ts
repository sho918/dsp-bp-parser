import { Parser } from 'binary-parser';

export class Building {
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
