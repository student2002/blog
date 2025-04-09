

export default {
    uuid() {
        var s = [];
        var hexDigits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (var i = 0; i < 8; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x30), 1);
        }
        var uuid = s.join("");
        return uuid;
    },
    // 获取浏览器可视区域的高度
    getViewPortHeight() {
        return document.documentElement.clientHeight || document.body.clientHeight;
      }
}