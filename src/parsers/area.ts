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

  export() {
    const r = new ArrayBuffer(14);
    const dv = new DataView(r);

    dv.setInt8(0, this.index);
    dv.setInt8(1, this.parentIndex);
    dv.setInt16(2, this.tropicAnchor, true);
    dv.setInt16(4, this.areaSegments, true);
    dv.setInt16(6, this.anchorLocalOffsetX, true);
    dv.setInt16(8, this.anchorLocalOffsetY, true);
    dv.setInt16(10, this.width, true);
    dv.setInt16(12, this.height, true);

    return r;
  }
}
