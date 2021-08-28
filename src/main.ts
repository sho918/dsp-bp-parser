import * as Pako from "pako"

import { Header } from "./parsers/header"
import { Content } from "./parsers/content"

export default class DspBpParser {
  bp: string

  constructor(bp: string) {
    this.bp = bp
  }

  isValid(): void {
    if (!this.bp.startsWith('BLUEPRINT:0')) {
      throw 'Incorrect blueprint format. Blueprint must start with `BLUEPRINT:0`'
    }
  }

  parse() {
    this.isValid()

    const [header, content, hash] = this.bp.split('"');
    const pHeader = new Header(header)
    const pContent = new Content(content)

    return {pHeader, pContent}
  }
}