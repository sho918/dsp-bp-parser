import { Parser } from 'binary-parser';

export class Area {
  index: number;
  parentIndex: number;
  tropicAnchor: number;
  areaSegments: number;
  anchorLocalOffsetX: number;
  anchorLocalOffsetY: number;
  width: number;
  height: number;

  constructor(data: Record<string, number>) {
    Object.assign(this, data);
  }

  static AreaParser(): Parser {
    return new Parser()
      .endianess('little')
      .int8('index')
      .int8('parentIndex')
      .int16('tropicAnchor')
      .int16('areaSegments')
      .int16('anchorLocalOffsetX')
      .int16('anchorLocalOffsetY')
      .int16('width')
      .int16('height');
  }
}
