export class Header {
  [x: string]: string;
  constructor(str: string) {
    const el: Array<string> = str.split(',');

    this.layout = el[1];
    this.icon0 = el[2];
    this.icon1 = el[3];
    this.icon2 = el[4];
    this.icon3 = el[5];
    this.icon4 = el[6];
    this.tick = el[8];
    this.gameVersion = el[9];
    this.shortDesc = unescape(el[10]);
    this.desc = unescape(el[11]);
  }
}
