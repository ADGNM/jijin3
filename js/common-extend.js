String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                var reg = new RegExp("({" + key + "})", "g");
                result = result.replace(reg, args[key] || "");
            }
        }
        else {
            var arg_count = result.match(/\{\d+\}/g).length;
            for (var i = 0; i < arg_count; i++) {
                var reg = new RegExp("({)" + i + "(})", "g");
                result = result.replace(reg, arguments[i] || "");
            }
        }
    }
    return result;
}

Array.prototype.searchObj = function (key, value)
{
    for (var i = 0; i < this.length; i++)
    {
        if (this[i][key] === value)
            return this[i];
    }
    return null;
}

/**
 * description : 得到字符串的字节长度;
 * @version 0.2;
 * @return 返回字符串的字节长度(eg:"一二12"的字节长度是6);
 */
String.prototype.getLength = function () {
    var text = this.replace(/[^\x00-\xff]/g, "**");
    return text.length;
}

/**
 * description : 按字节长度截取字符串,并添加后缀.
 * @param len 需要截取的长度,字符串长度不足返回本身;
 * @param alt 添加后缀(非必要),默认为"......";
 * @return 返回截取后的字符串;
 * @requires getLength;
 */
String.prototype.getShort = function (len, alt) {
    var tempStr = this;
    if (this.getLength() > len) {
        if (!alt) {
            alt = "...";
        }
        var i = 0;
        for (var z = 0; z < len; z++) {
            if (tempStr.charCodeAt(z) > 255) {
                i = i + 2;
            } else {
                i = i + 1;
            }
            if (i >= len) {
                tempStr = tempStr.slice(0, (z + 1)) + alt;
                break;
            }
        }
        return tempStr;
    } else {
        return this + "";
    }
}


