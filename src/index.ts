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
    return arr[Math.floor(Math.random() * arr.length)]
  }
};

export default _ut;
