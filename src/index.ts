// (function(root, factory) {
//   if (typeof module === 'object' && typeof module.exports === 'object') {
//       console.log('是commonjs模块规范，nodejs环境')
//       module.exports = factory();
//   } else if (typeof define === 'function' && define.amd) {
//       console.log('是AMD模块规范，如require.js')
//       define(factory)
//   } else if (typeof define === 'function' && define.cmd) {
//       console.log('是CMD模块规范，如sea.js')
//       define(function(require, exports, module) {
//           module.exports = factory()
//       })
//   } else {
//       console.log('没有模块环境，直接挂载在全局对象上')
//       root._ut = factory();
//   }
// }(this, function() {
//   return {}
// }))

const _ut: any = {
  // 返回范围内随机数
  randomNum(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // 返回千分符格式化的字符串
  formatThousands1(num: number) {
    return num.toString().replace(/(?<!\.)(\d+)(?=(\d{3}))/g, "$1,");
  },
  formatThousands2(num: number) {
    return num.toLocaleString("en");
  },

  // 数组乱序
  arrShuffle<T>(arr: T[]): T[] {
    for (let i = 1; i < arr.length; i++) {
      const random = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[random]] = [arr[random], arr[i]];
    }
    return arr;
  },

  // 数组扁平化
  arrFlatten1<T>(arr: T[]): T[] {
    return arr.reduce((result, item) => {
      return result.concat(Array.isArray(item) ? this.arrFlatten1(item) : item);
    }, [] as T[]);
  },
  arrFlatten2<T>(arr: any[], depth?: number): T[] {
    return arr.flat(depth || 1);
  },

  // 获取数组随机一项
  arrRandomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  // 首字母大写
  firstLetterUpper(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  // 手机号脱敏
  phoneDecode1(str: string) {
    return `${str.slice(0, 3)}****${str.slice(7)}`;
  },
  phoneDecode2(str: string) {
    const newStr = str.split("");
    newStr.splice(3, 4, "****");
    return newStr.join("");
  },

  // 下划线、驼峰互转
  getCamelCase(str: string) {
    return str.replace(/_([a-z])/g, (_, item) => {
      return item.toUpperCase();
    });
  },
  getUnderlineCase(str: string) {
    return str.replace(/[A-Z]/g, item => {
      return `_${item.toLowerCase()}`;
    });
  },

  // 阻止冒泡
  stopPropagation(e: Event) {
    e = e || window.event;
    if (e.stopPropagation) {
      // W3C阻止冒泡方法
      e.stopPropagation();
    } else {
      e.cancelBubble = true; // IE阻止冒泡方法
    }
  },

  // 操作cookies
  cookies: {
    getItem: function(sKey: string) {
      return (
        decodeURIComponent(
          document.cookie.replace(
            new RegExp(
              "(?:(?:^|.*;)\\s*" +
                encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
                "\\s*\\=\\s*([^;]*).*$)|^.*$"
            ),
            "$1"
          )
        ) || null
      );
    },
    setItem: function({
      sKey,
      sValue,
      vEnd,
      sPath,
      sDomain,
      bSecure
    }: {
      sKey: string;
      sValue: string;
      vEnd?: number | string | Date;
      sPath?: string;
      sDomain?: string;
      bSecure?: string;
    }) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
        return false;
      }
      var sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires =
              vEnd === Infinity
                ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
                : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + (vEnd as Date).toUTCString();
            break;
        }
      }
      document.cookie =
        encodeURIComponent(sKey) +
        "=" +
        encodeURIComponent(sValue) +
        sExpires +
        (sDomain ? "; domain=" + sDomain : "") +
        (sPath ? "; path=" + sPath : "") +
        (bSecure ? "; secure" : "");
      return true;
    },
    removeItem: function(sKey: string, sPath?: string, sDomain?: string) {
      if (!sKey || !this.hasItem(sKey)) {
        return false;
      }
      document.cookie =
        encodeURIComponent(sKey) +
        "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
        (sDomain ? "; domain=" + sDomain : "") +
        (sPath ? "; path=" + sPath : "");
      return true;
    },
    hasItem: function(sKey: string) {
      return new RegExp(
        "(?:^|;\\s*)" +
          encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
          "\\s*\\="
      ).test(document.cookie);
    },
    keys: function() {
      var aKeys = document.cookie
        .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
        .split(/\s*(?:\=[^;]*)?;\s*/);
      for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
        aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
      }
      return aKeys;
    }
  },

  // 设备判断
  device: {
    isMobile() {
      if (
        navigator.userAgent.match(
          /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
        )
      ) {
        return "mobile";
      }
      return "desktop";
    },
    isAppleMobileDevice() {
      let reg = /iphone|ipod|ipad|Macintosh/i;
      return reg.test(navigator.userAgent.toLowerCase());
    },
    isAndroidMobileDevice() {
      return /android/i.test(navigator.userAgent.toLowerCase());
    },
    osType() {
      const agent = navigator.userAgent.toLowerCase();
      const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
      const isWindows =
        agent.indexOf("win64") >= 0 ||
        agent.indexOf("wow64") >= 0 ||
        agent.indexOf("win32") >= 0 ||
        agent.indexOf("wow32") >= 0;
      if (isWindows) {
        return "windows";
      }
      if (isMac) {
        return "mac";
      }
    }
  }
};

export default _ut;
