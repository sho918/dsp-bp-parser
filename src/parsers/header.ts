export class Header {
  layout: number;
  icon0: number;
  icon1: number;
  icon2: number;
  icon3: number;
  icon4: number;
  tick: number;
  gameVersion: string;
  shortDesc: string;
  desc: string;

  constructor(str: string) {
    const el: string[] = str.split(',');

    this.layout = parseInt(el[1]);
    this.icon0 = parseInt(el[2]);
    this.icon1 = parseInt(el[3]);
    this.icon2 = parseInt(el[4]);
    this.icon3 = parseInt(el[5]);
    this.icon4 = parseInt(el[6]);
    this.tick = parseInt(el[8]);
    this.gameVersion = el[9];
    this.shortDesc = decodeURI(el[10]);
    this.desc = decodeURI(el[11]);
  }
}
