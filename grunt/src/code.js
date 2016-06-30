
define(function () {

    var UtilCode = {
        decodeBase64: function (e) {
            if (!e) return "";
            var t = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";
            var i = "",
                a, s, n, r, o, c, l = 0,
                d;
            e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            do {
                r = t.indexOf(e.charAt(l++));
                o = t.indexOf(e.charAt(l++));
                c = t.indexOf(e.charAt(l++));
                d = t.indexOf(e.charAt(l++));
                a = r << 2 | o >> 4;
                s = (o & 15) << 4 | c >> 2;
                n = (c & 3) << 6 | d;
                i = i + String.fromCharCode(a);
                if (c != 64) {
                    i = i + String.fromCharCode(s)
                }
                if (d != 64) {
                    i = i + String.fromCharCode(n)
                }
            } while (l < e.length);
            return this.utf8To16(i)
        },
        encode64: function (str) {
            if (!str) {
                return '';
            }
            str = str.toString();
            var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
            var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
            var out, i, len;
            var c1, c2, c3;
            len = str.length;
            i = 0;
            out = '';
            while (i < len) {
                c1 = str.charCodeAt(i++) & 0xff;
                if (i === len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                    out += '==';
                    break;
                }
                c2 = str.charCodeAt(i++);
                if (i === len) {
                    out += c.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                    out += '=';
                    break;
                }
                c3 = str.charCodeAt(i++);
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                out += base64EncodeChars.charAt(c3 & 0x3F);
            }
            return out;
        },
        utf8To16: function (e) {
            var t, i, a;
            var s, n;
            var r = [];
            i = e.length;
            t = 0;
            while (t < i) {
                a = e.charCodeAt(t++);
                switch (a >> 4) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        r.push(e.charAt(t - 1));
                        break;
                    case 12:
                    case 13:
                        s = e.charCodeAt(t++);
                        r.push(String.fromCharCode((a & 31) << 6 | s & 63));
                        break;
                    case 14:
                        s = e.charCodeAt(t++);
                        n = e.charCodeAt(t++);
                        r.push(String.fromCharCode((a & 15) << 12 | (s & 63) << 6 | (n & 63) << 0));
                        break
                }
            }
            return r.join("")
        },


        encodeUid: function (uid) {
            if (!uid) return '';
            if (uid << 2 > 0) {
                var enUid = 'U' + this.encode64(uid << 2);
            } else {
                //uid超过限制
                var enUid = 'U' + this.encode64(uid * 4);
            }
            return enUid;
        }
    }

    return UtilCode;
});
