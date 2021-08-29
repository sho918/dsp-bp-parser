import * as Pako from 'pako';
import { Parser } from 'binary-parser';

import { Area } from './area';
import { Building } from './building';

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
}
