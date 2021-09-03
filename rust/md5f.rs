use wasm_bindgen::prelude::*;

const S11: i32 = 7;
const S12: i32 = 12;
const S13: i32 = 17;
const S14: i32 = 22;
const S21: i32 = 5;
const S22: i32 = 9;
const S23: i32 = 14;
const S24: i32 = 20;
const S31: i32 = 4;
const S32: i32 = 11;
const S33: i32 = 16;
const S34: i32 = 23;
const S41: i32 = 6;
const S42: i32 = 10;
const S43: i32 = 15;
const S44: i32 = 21;

fn f(x: u32, y: u32, z: u32) -> u32 {
    (x & y) | (!x & z)
}

fn g(x: u32, y: u32, z: u32) -> u32 {
    (x & z) | (y & !z)
}

fn h(x: u32, y: u32, z: u32) -> u32 {
    x ^ y ^ z
}

fn i(x: u32, y: u32, z: u32) -> u32 {
    y ^ (x | !z)
}

fn ff(a: u32, b: u32, c: u32, d: u32, mj: u32, s: i32, ti: u32) -> u32 {
    let mut r: u32;

    r = ((a.wrapping_add(f(b, c, d))).wrapping_add(mj)).wrapping_add(ti);
    r = (r << s) | (r >> 32 - s);
    r = r.wrapping_add(b);
    r
}

fn gg(a: u32, b: u32, c: u32, d: u32, mj: u32, s: i32, ti: u32) -> u32 {
    let mut r: u32;

    r = ((a.wrapping_add(g(b, c, d))).wrapping_add(mj)).wrapping_add(ti);
    r = (r << s) | (r >> 32 - s);
    r = r.wrapping_add(b);
    r
}

fn hh(a: u32, b: u32, c: u32, d: u32, mj: u32, s: i32, ti: u32) -> u32 {
    let mut r: u32;

    r = ((a.wrapping_add(h(b, c, d))).wrapping_add(mj)).wrapping_add(ti);
    r = (r << s) | (r >> 32 - s);
    r = r.wrapping_add(b);
    r
}

fn ii(a: u32, b: u32, c: u32, d: u32, mj: u32, s: i32, ti: u32) -> u32 {
    let mut r: u32;

    r = ((a.wrapping_add(i(b, c, d))).wrapping_add(mj)).wrapping_add(ti);
    r = (r << s) | (r >> 32 - s);
    r = r.wrapping_add(b);
    r
}

fn md5_append(input: Vec<u8>) -> Vec<u32> {
    let num2: i32 = input.len() as i32;
    let num3: i32 = num2 % 64;
    let num4: i32;
    let num5: i32;

    if num3 < 56 {
        num4 = 55 - num3;
        num5 = num2 - num3 + 64;
    } else if num3 == 56 {
        num4 = 63;
        num5 = num2 + 8 + 64;
    } else {
        num4 = 63 - num3 + 56;
        num5 = num2 + 64 - num3 + 64;
    }

    let mut array = input;
    array.push(128u8);

    let mut counter: i32 = 0;
    while counter < num4 {
        array.push(0u8);
        counter += 1;
    }

    let num6: i64 = (num2 as i64) * (8 as i64);
    array.push((num6 & 0xFF) as u8);
    array.push((((num6 as u64) >> 8) & 0xFF) as u8);
    array.push((((num6 as u64) >> 16) & 0xFF) as u8);
    array.push((((num6 as u64) >> 24) & 0xFF) as u8);
    array.push((((num6 as u64) >> 32) & 0xFF) as u8);
    array.push((((num6 as u64) >> 40) & 0xFF) as u8);
    array.push((((num6 as u64) >> 48) & 0xFF) as u8);
    array.push(((num6 as u64) >> 56) as u8);

    let mut array2: Vec<u32> = vec![];
    let mut num7: i64 = 0;

    while num7 < (num5 as i64) {
        array2.push(
            ((array[num7 as usize] as i32)
                | (array[(num7 + 1) as usize] as i32) << 8
                | (array[(num7 + 2) as usize] as i32) << 16
                | (array[(num7 + 3) as usize] as i32) << 24) as u32,
        );
        num7 += 4;
    }

    array2
}

fn md5_transform(x: Vec<u32>, aa: u32, bb: u32, cc: u32, dd: u32) -> [u32; 4] {
    let mut a: u32 = aa;
    let mut b: u32 = bb;
    let mut c: u32 = cc;
    let mut d: u32 = dd;

    let mut i = 0;
    while i < x.len() {
        let mut aaa = a;
        let mut bbb = b;
        let mut ccc = c;
        let mut ddd = d;

        aaa = ff(aaa, bbb, ccc, ddd, x[i], S11, 3614090360);
        ddd = ff(ddd, aaa, bbb, ccc, x[i + 1], S12, 3906451286);
        ccc = ff(ccc, ddd, aaa, bbb, x[i + 2], S13, 606105819);
        bbb = ff(bbb, ccc, ddd, aaa, x[i + 3], S14, 3250441966);
        aaa = ff(aaa, bbb, ccc, ddd, x[i + 4], S11, 4118548399);
        ddd = ff(ddd, aaa, bbb, ccc, x[i + 5], S12, 1200080426);
        ccc = ff(ccc, ddd, aaa, bbb, x[i + 6], S13, 2821735971);
        bbb = ff(bbb, ccc, ddd, aaa, x[i + 7], S14, 4249261313);
        aaa = ff(aaa, bbb, ccc, ddd, x[i + 8], S11, 1770035416);
        ddd = ff(ddd, aaa, bbb, ccc, x[i + 9], S12, 2336552879);
        ccc = ff(ccc, ddd, aaa, bbb, x[i + 10], S13, 4294925233);
        bbb = ff(bbb, ccc, ddd, aaa, x[i + 11], S14, 2304563134);
        aaa = ff(aaa, bbb, ccc, ddd, x[i + 12], S11, 1805586722);
        ddd = ff(ddd, aaa, bbb, ccc, x[i + 13], S12, 4254626195);
        ccc = ff(ccc, ddd, aaa, bbb, x[i + 14], S13, 2792965006);
        bbb = ff(bbb, ccc, ddd, aaa, x[i + 15], S14, 968099873);
        aaa = gg(aaa, bbb, ccc, ddd, x[i + 1], S21, 4129170786);
        ddd = gg(ddd, aaa, bbb, ccc, x[i + 6], S22, 3225465664);
        ccc = gg(ccc, ddd, aaa, bbb, x[i + 11], S23, 643717713);
        bbb = gg(bbb, ccc, ddd, aaa, x[i], S24, 3384199082);
        aaa = gg(aaa, bbb, ccc, ddd, x[i + 5], S21, 3593408605);
        ddd = gg(ddd, aaa, bbb, ccc, x[i + 10], S22, 38024275);
        ccc = gg(ccc, ddd, aaa, bbb, x[i + 15], S23, 3634488961);
        bbb = gg(bbb, ccc, ddd, aaa, x[i + 4], S24, 3889429448);
        aaa = gg(aaa, bbb, ccc, ddd, x[i + 9], S21, 569495014);
        ddd = gg(ddd, aaa, bbb, ccc, x[i + 14], S22, 3275163606);
        ccc = gg(ccc, ddd, aaa, bbb, x[i + 3], S23, 4107603335);
        bbb = gg(bbb, ccc, ddd, aaa, x[i + 8], S24, 1197085933);
        aaa = gg(aaa, bbb, ccc, ddd, x[i + 13], S21, 2850285829);
        ddd = gg(ddd, aaa, bbb, ccc, x[i + 2], S22, 4243563512);
        ccc = gg(ccc, ddd, aaa, bbb, x[i + 7], S23, 1735328473);
        bbb = gg(bbb, ccc, ddd, aaa, x[i + 12], S24, 2368359562);
        aaa = hh(aaa, bbb, ccc, ddd, x[i + 5], S31, 4294588738);
        ddd = hh(ddd, aaa, bbb, ccc, x[i + 8], S32, 2272392833);
        ccc = hh(ccc, ddd, aaa, bbb, x[i + 11], S33, 1839030562);
        bbb = hh(bbb, ccc, ddd, aaa, x[i + 14], S34, 4259657740);
        aaa = hh(aaa, bbb, ccc, ddd, x[i + 1], S31, 2763975236);
        ddd = hh(ddd, aaa, bbb, ccc, x[i + 4], S32, 1272893353);
        ccc = hh(ccc, ddd, aaa, bbb, x[i + 7], S33, 4139469664);
        bbb = hh(bbb, ccc, ddd, aaa, x[i + 10], S34, 3200236656);
        aaa = hh(aaa, bbb, ccc, ddd, x[i + 13], S31, 681279174);
        ddd = hh(ddd, aaa, bbb, ccc, x[i], S32, 3936430074);
        ccc = hh(ccc, ddd, aaa, bbb, x[i + 3], S33, 3572445317);
        bbb = hh(bbb, ccc, ddd, aaa, x[i + 6], S34, 76029189);
        aaa = hh(aaa, bbb, ccc, ddd, x[i + 9], S31, 3654602809);
        ddd = hh(ddd, aaa, bbb, ccc, x[i + 12], S32, 3873151461);
        ccc = hh(ccc, ddd, aaa, bbb, x[i + 15], S33, 530742520);
        bbb = hh(bbb, ccc, ddd, aaa, x[i + 2], S34, 3299628645);
        aaa = ii(aaa, bbb, ccc, ddd, x[i], S41, 4096336452);
        ddd = ii(ddd, aaa, bbb, ccc, x[i + 7], S42, 1126891415);
        ccc = ii(ccc, ddd, aaa, bbb, x[i + 14], S43, 2878612391);
        bbb = ii(bbb, ccc, ddd, aaa, x[i + 5], S44, 4237533241);
        aaa = ii(aaa, bbb, ccc, ddd, x[i + 12], S41, 1700485571);
        ddd = ii(ddd, aaa, bbb, ccc, x[i + 3], S42, 2399980690);
        ccc = ii(ccc, ddd, aaa, bbb, x[i + 10], S43, 4293915773);
        bbb = ii(bbb, ccc, ddd, aaa, x[i + 1], S44, 2240044497);
        aaa = ii(aaa, bbb, ccc, ddd, x[i + 8], S41, 1873313359);
        ddd = ii(ddd, aaa, bbb, ccc, x[i + 15], S42, 4264355552);
        ccc = ii(ccc, ddd, aaa, bbb, x[i + 6], S43, 2734768916);
        bbb = ii(bbb, ccc, ddd, aaa, x[i + 13], S44, 1309151649);
        aaa = ii(aaa, bbb, ccc, ddd, x[i + 4], S41, 4149444226);
        ddd = ii(ddd, aaa, bbb, ccc, x[i + 11], S42, 3174756917);
        ccc = ii(ccc, ddd, aaa, bbb, x[i + 2], S43, 718787259);
        bbb = ii(bbb, ccc, ddd, aaa, x[i + 9], S44, 3951481745);

        a = a.wrapping_add(aaa);
        b = b.wrapping_add(bbb);
        c = c.wrapping_add(ccc);
        d = d.wrapping_add(ddd);
        i += 16;
    }

    [a, b, c, d]
}

fn md5_array(input: Vec<u8>) -> [u8; 16] {
    let a = 1732584193;
    let b = 4024216457;
    let c = 2562383102;
    let d = 271734598;

    let array: [u32; 4] = md5_transform(md5_append(input), a, b, c, d);
    let mut array2: [u8; 16] = [0; 16];

    let mut num: i32 = 0;
    let mut num2: i32 = 0;

    while num < 4 {
        array2[num2 as usize] = (array[num as usize] & 0xFF) as u8;
        array2[(num2 + 1) as usize] = ((array[num as usize] >> 8) & 0xFF) as u8;
        array2[(num2 + 2) as usize] = ((array[num as usize] >> 16) & 0xFF) as u8;
        array2[(num2 + 3) as usize] = ((array[num as usize] >> 24) & 0xFF) as u8;
        num += 1;
        num2 += 4;
    }

    array2
}

fn array_to_hex_string(array: [u8; 16]) -> String {
    let s: Vec<String> = array.iter().map(|b| format!("{:02X}", b)).collect();
    s.join("")
}

#[wasm_bindgen]
pub fn compute(s: String) -> String {
    array_to_hex_string(md5_array(s.as_bytes().to_vec())).into()
}
