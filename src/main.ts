import { Header } from './parsers/header'
import { Content } from './parsers/content'
import { Summary } from './parsers/summary'

export default class DspBpParser {
  raw: string;
  header: Header;
  content: Content;
  summary: Summary;

  constructor(bp: string) {
    if (bp.startsWith('BLUEPRINT:0') === false) {
      throw 'Incorrect blueprint format. Blueprint must start with `BLUEPRINT:0`'
    }

    const [header, content, _hash] = bp.split('"');

    this.raw = bp;
    this.header = new Header(header);
    this.content = new Content(content);
    this.summary = new Summary(this.header, this.content);
  }

  async calc(h: string, c: string) {
    let md5f = await import('../pkg/md5f_bg')
    return md5f.compute(`${h}"${c}`)
  }

  async export() {
    let r: string = "";

    const header = this.header.export();
    const content = this.content.export();
    const hash = await this.calc(header, content)

    r += header
    r += '"';
    r += content
    r += '"';
    r += hash

    return r;
  }
}
