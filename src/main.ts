import * as Pako from "pako"

import { Header } from "./parsers/header"
import { Content } from "./parsers/content"
import { Summary } from "./parsers/summary"

export default class DspBpParser {
  header: Header
  content: Content
  summary: Summary

  constructor(bp: string) {
    if (bp.startsWith('BLUEPRINT:0') === false) {
      throw 'Incorrect blueprint format. Blueprint must start with `BLUEPRINT:0`'
    }

    const [header, content, _hash] = bp.split('"');
    this.header = new Header(header)
    this.content = new Content(content)
    this.summary = new Summary(this.header, this.content)
  }
}
