// https://gist.github.com/72lions/4528834#gistcomment-3187198
export function concatArrayBuffers(bufs) {
  let offset = 0;
  let bytes = 0;

  const bufs2 = bufs.map((buf, total) => {
    bytes += buf.byteLength;
    return buf;
  });

  const buffer = new ArrayBuffer(bytes);
  const store = new Uint8Array(buffer);

  bufs2.forEach((buf) => {
    store.set(new Uint8Array(buf.buffer || buf, buf.byteOffset), offset);
    offset += buf.byteLength;
  });

  return buffer;
}
