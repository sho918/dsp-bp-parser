import * as Pako from 'pako';
import { Parser } from 'binary-parser';

import { Area } from './area';
import { Building } from './building';

import { concatArrayBuffers } from '../utils';

export class Content {
  version: number;
  cursorOffsetX: number;
  cursorOffsetY: number;
  cursorTargetArea: number;
  dragBoxSizeX: number;
  dragBoxSizeY: number;
  primaryAreaIdx: number;
  num: number;
  areas: Area[];
  num2: number;
  buildings: Building[];

  constructor(data: string) {
    const dData: Uint8Array = Pako.inflate(atob(data));
    const pData = Content.ContentParser().parse(dData);

    this.version = pData.version;
    this.cursorOffsetX = pData.cursorOffsetX;
    this.cursorOffsetY = pData.cursorOffsetY;
    this.cursorTargetArea = pData.cursorTargetArea;
    this.dragBoxSizeX = pData.dragBoxSizeX;
    this.dragBoxSizeY = pData.dragBoxSizeY;
    this.primaryAreaIdx = pData.primaryAreaIdx;
    this.num = pData.num;
    this.areas = pData.areas.map((el: Record<string, number>) => new Area(el));
    this.num2 = pData.num2;
    this.buildings = pData.buildings.map(
      (el: Record<string, number>) => new Building(el),
    );
  }

  static ContentParser(): Parser {
    return new Parser()
      .endianess('little')
      .int32('version')
      .int32('cursorOffsetX')
      .int32('cursorOffsetY')
      .int32('cursorTargetArea')
      .int32('dragBoxSizeX')
      .int32('dragBoxSizeY')
      .int32('primaryAreaIdx')
      .uint8('num')
      .array('areas', { type: Area.AreaParser(), length: 'num' })
      .int32('num2')
      .array('buildings', { type: Building.BuildingParser(), length: 'num2' });
  }

  export() {
    let r = new ArrayBuffer(29);
    const rdv = new DataView(r);

    rdv.setInt32(0, this.version, true);
    rdv.setInt32(4, this.cursorOffsetX, true);
    rdv.setInt32(8, this.cursorOffsetY, true);
    rdv.setInt32(12, this.cursorTargetArea, true);
    rdv.setInt32(16, this.dragBoxSizeX, true);
    rdv.setInt32(20, this.dragBoxSizeY, true);
    rdv.setInt32(24, this.primaryAreaIdx, true);
    rdv.setUint8(28, this.num);

    this.areas.forEach((area, i) => {
      const buf = area.export();
      r = concatArrayBuffers([r, buf]);
    });

    const rr = new ArrayBuffer(4);
    const rrdv = new DataView(rr);
    rrdv.setInt32(0, this.num2, true);

    r = concatArrayBuffers([r, rr]);

    this.buildings.forEach((building, i) => {
      const buf = building.export();
      r = concatArrayBuffers([r, buf]);
    });

    const gz = Pako.gzip(new Uint8Array(r));

    // Force replace OS_TYPE header
    // OS_UNIX(3) -> OS_NTFS(11)
    gz[9] = 11;

    return btoa(String.fromCharCode(...gz));
  }
}
