export function deepClone(obj) {
  var copy;
  if (obj === null || typeof obj != 'object') {
    return obj;
  }
  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepClone(obj[i]);
    }
    return copy;
  }
  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (let attr in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, attr)) {
        copy[attr] = deepClone(obj[attr]);
      }
    }
    return copy;
  }
  throw new Error("Unable to copy obj! Its type isn't supported.");
}

// 日期格式化
export function formatDate(dates, fmt) {
  if (!dates) {
    return '';
  }
  let date = new Date(dates);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      String(date.getFullYear()).substr(4 - RegExp.$1.length),
    );
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = String(o[k]);
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length),
      );
    }
  }
  return fmt;
}
/**
 * 获取形如test.pdf_http://xxx.xx.xx/xx/test.pdf分割后的名字和URL
 * @param {string} str 待分割字符串
 * @param {number} n 0或1
 */
export function getTitleUrl(str, n) {
  let [title, url] = str.split('_http://');
  url = 'http://' + url;
  const res = [title, url];
  return typeof n === 'undefined' ? res : res[n];
}

export function camelToUnderline(name) {
  name = name.replace(/([A-Z])/g, '_$1').toLowerCase();
  return name.replace(/^_/, '');
}

/**
 *	将传入的值复制到剪切板
 * @param {*} val 传入待复制到剪切板的值
 */
export function getClipboard(val) {
  return new Promise((resolve, reject) => {
    let inp = document.createElement('input');
    inp.style = 'position: absolute;opacity: 0; z-index:-111;';
    inp.value = val;
    document.body.appendChild(inp);
    inp.select();
    document.execCommand('copy') ? resolve() : reject();
    document.body.removeChild(inp);
  });
}
/**
 *
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  延迟时间，单位是毫秒（ms）
 *
 * @return {Function}     返回一个“防反跳”了的函数
 */
export function debounce(fn, delay) {
  // 定时器，用来 setTimeout
  var timer;
  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function (...args) {
    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer);
    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
/**
 *
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  执行间隔，单位是毫秒（ms）
 *
 * @return {Function}     返回一个“节流”函数
 */

export function throttle(fn, threshhold) {
  // 记录上次执行的时间
  var last;

  // 定时器
  var timer;

  // 默认间隔为 250ms
  threshhold || (threshhold = 250);

  // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
  return function (...args) {
    var now = Number(new Date());

    // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
    // 执行 fn，并重新计时
    if (last && now < last + threshhold) {
      clearTimeout(timer);

      // 保证在当前时间区间结束后，再执行一次 fn
      timer = setTimeout(() => {
        last = now;
        fn.apply(this, args);
      }, threshhold);

      // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
    } else {
      last = now;
      fn.apply(this, args);
    }
  };
}
// 获取page对象
export function getPageObj(config = {}) {
  return {
    current: 1,
    size: 10,
    total: 0,
    ...config,
  };
}
/**
 * 判断是否为undefined
 * @param {*} something 任何
 */
export const isUndefined = function (something) {
  return typeof something === 'undefined';
};
/**
 * 判断是否为null
 * @param {*} something 任何
 */
export const isNull = function (something) {
  return something === null;
};
/**
 * 判断是否为NaN
 * @param {*} something 任何
 */
export const isRealNaN = function (something) {
  return !isUndefined(something) && Number.isNaN(something);
};
/**
 * 判断是否为字符串
 * @param {*} something 任何
 */
export const isString = function (something) {
  return Object.prototype.toString.apply(something) === '[object String]';
};
/**
 * 判断是否为Number
 * @param {*} something 任何
 */
export const isNumber = function (something) {
  return typeof something === 'number' && !isRealNaN(something);
};
/**
 * 判断是否为js对象
 * @param {*} something 任何
 */
export const isObject = function (something) {
  return Object.prototype.toString.apply(something) === '[object Object]';
};
/**
 * 判断是否为数组
 * @param {*} something 任何
 */
export const isArray = function (something) {
  return Object.prototype.toString.apply(something) === '[object Array]';
};
/**
 * 判断是否为json字符串
 * @param {*} something 任何
 */
export const isJson = function (something) {
  if (!isString(something)) {
    return false;
  }
  return /(^{.*}$|^\[.*\]$)/g.test(something);
};
/**
 * 浏览器控制台彩色打印
 * @param {string} log 打印信息
 * @param {string} color 颜色
 */
export const colorfulConsole = function (...args) {
  let logInfo;
  let color;
  logInfo = '%c' + (args[0] || '');
  color = 'color:' + (args[1] || 'red');
  console.log(logInfo, color);
  return null;
};
/**
 * 封装小型持久存储方法
 */
const s = Symbol('sessionStorage');
const o = {
  [s]: true,
};
const storageToolBox = {
  set_cookie({ key, value, options }) {
    let expires, stringify;
    if (options.expire) {
      const d = new Date(options.expire);
      expires = '; expires=' + d.toGMTString();
    }
    if (isObject(value) || isArray(value)) {
      stringify = JSON.stringify(value);
    }
    document.cookie = key + '=' + (stringify || value) + (expires || '');
  },
  get_cookie({ key }) {
    const name = key + '=';
    const ca = document.cookie.split(';');
    let res;
    for (let i = 0; i < ca.length; i++) {
      const c = ca[i].trim();
      if (c.indexOf(name) === 0) {
        res = c.substring(name.length, c.length);
        if (isJson(res)) {
          res = JSON.parse(res);
        }
        return res;
      }
    }
    return '';
  },
  delete_cookie({ key }) {
    this.set_cookie(key, '', {
      expire: -1,
    });
  },
  set_localstorage({ key, value, options }) {
    let stringify;
    if (isObject(value) || isArray(value)) {
      stringify = JSON.stringify(value);
    }
    options[s]
      ? sessionStorage.setItem(key, stringify || value)
      : localStorage.setItem(key, stringify || value);
  },
  get_localstorage({ key, options }) {
    let res = options[s]
      ? sessionStorage.getItem(key)
      : localStorage.getItem(key);
    if (isJson(res)) {
      res = JSON.parse(res);
    }
    return res;
  },
  delete_localstorage({ key, options }) {
    options[s] ? sessionStorage.removeItem(key) : localStorage.removeItem(key);
  },
  set_sessionstorage({ key, value }) {
    this.set_localstorage({ key, value, options: o });
  },
  get_sessionstorage({ key }) {
    return this.get_localstorage({ key, options: o });
  },
  delete_sessionstorage({ key }) {
    this.delete_localstorage({ key, options: o });
  },
};
/**
 * 轻量web存储器
 * @param {object} options 可选项 async: false即可取消异步存储，改为同步存储
 * @example 示例: 存数据saver({ key: 'userInfo', value: {name: 'xx'} }) 取数据saver({ method: 'get', key: 'userInfo' }) 删数据save({ method: 'delete', key: 'userInfo' })
 */
export const saver = function ({
  method = 'set',
  mode = 'sessionstorage',
  async = true,
  key,
  value,
  options = {},
}) {
  if (key) {
    const attr = `${method}_${mode.toLowerCase()}`;
    if (attr in storageToolBox) {
      if (method === 'get') {
        return storageToolBox[attr]({ key, value, options });
      }
      if (async) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              storageToolBox[attr]({ key, value, options });
              colorfulConsole(`saver: ${method} ${key} async`);
              resolve();
            } catch (err) {
              reject(err);
            }
          }, 10);
        });
      }
      colorfulConsole(`saver: ${method} ${key}`);
      storageToolBox[attr]({ key, value, options });
    }
  }
};
/**
 * 重置表单项
 */
export function resetForm(origin, replacement) {
  if (!isObject(origin)) {
    return origin;
  }
  let res = {};
  for (const key in origin) {
    const val = origin[key];
    if (isString(val)) {
      res[key] = '';
    } else if (isNumber(val)) {
      res[key] = 0;
    } else if (isArray(val)) {
      res[key] = [];
    } else if (isObject(val)) {
      res[key] = {};
    }
  }
  if (isObject(replacement)) {
    res = { ...res, ...replacement };
  }
  return res;
}
/**
 * 多请求并发改良
 * @param {array} pmsArr promise数组
 * @param {any} exception 请求异常时希望返回的结果
 */
export const promiseAll = function (pmsArr, exception = { content: [] }) {
  let _pmsArr = [];
  if (!isArray(pmsArr)) {
    return [];
  }
  for (const item of pmsArr) {
    if (item instanceof Promise) {
      _pmsArr.push(item.catch(() => exception));
    }
  }
  return Promise.all(_pmsArr);
};

export function toFullScreen(e) {
  let el = e.srcElement || e.target || e;
  let isFullscreen =
    document.fullScreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen;
  if (!isFullscreen) {
    // 先判断处于非全屏状态
    (el.requestFullscreen && el.requestFullscreen()) ||
      (el.mozRequestFullScreen && el.mozRequestFullScreen()) ||
      (el.webkitRequestFullscreen && el.webkitRequestFullscreen()) ||
      (el.msRequestFullscreen && el.msRequestFullscreen());
  }
}

export function exitFullScreen() {
  let isFullscreen =
    document.fullScreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen;
  if (isFullscreen) {
    // 先判断处于非全屏状态
    // eslint-disable-next-line no-unused-expressions
    document.exitFullscreen
      ? document.exitFullscreen()
      : document.mozCancelFullScreen
      ? document.mozCancelFullScreen()
      : document.webkitExitFullscreen
      ? document.webkitExitFullscreen()
      : '';
  }
}
/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
export const accMul = function (arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {
    m += 0;
  }
  try {
    m += s2.split('.')[1].length;
  } catch (e) {
    m += 0;
  }
  // eslint-disable-next-line no-restricted-properties
  return (
    (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
    Math.pow(10, m)
  );
};
/**
 * 公用表格数据过滤器
 */
export const formatResult = function ({ content }) {
  const failRet = { list: [], total: 0 };
  if (!isObject(content)) {
    return failRet;
  }
  if (!isArray(content.resultList)) {
    return failRet;
  }
  return {
    list: content.resultList.map((item, index) => ({
      ...item,
      index: index + 1 + (content.currentPage - 1) * content.pageSize,
    })),
    total: content.total,
  };
};
/**
 * 按key取数组
 * @param {array} data 数据数组
 * @param {...string} keys 字段
 */
export function getArrByKeys(data, ...keys) {
  const res = {};
  if (!isArray(data)) {
    return res;
  }
  for (const item of data) {
    if (!isObject(item)) {
      continue;
    }
    for (const key of keys) {
      if (!isString(key)) {
        continue;
      }
      const keyItem = item[key];
      if (isUndefined(keyItem)) {
        continue;
      }
      isUndefined(res[key]) ? (res[key] = [keyItem]) : res[key].push(keyItem);
    }
  }
  return res;
}
/**
 * 简单深拷贝
 */
export function deepCopy(data) {
  if (!isObject(data) && !isArray(data)) {
    return data;
  }
  return JSON.parse(JSON.stringify(data));
}
/**
 * 上一年度
 */
export const YEAR = new Date().getFullYear();
/**
 * 处理字段为null
 * @param {object} dataObj 数据对象
 * @param {any} except 替换null的
 */
export function handleFieldNull(dataObj, except = '-') {
  if (!isObject(dataObj)) {
    return dataObj;
  }
  let res = deepCopy(dataObj);
  for (const key in res) {
    if (isNull(res[key])) {
      res[key] = except;
    }
  }
  return res;
}

// 分割字符串为数组
export function getArrBySplitStr(str, split = ',') {
  if (typeof str !== 'string') {
    return [];
  }
  return str.split(split);
}
// query获取
export function getQueryString(search, keyName) {
  var reg = new RegExp('(^|&)' + keyName + '=([^&]*)(&|$)', 'i');
  var r = search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

// 递归树修改递归字段  返回一般结构符合G6的树
// 后端返回的type字段会影响G6的展示，暂时以 _type 保存
export function traverseTreeRetNorm(list = [], { label, children } = {}) {
  let curr = [];
  if (!list || !label || !children) {
    return curr;
  }
  for (let item of list) {
    let { [children]: c, [label]: n, type, ...other } = item;
    let currTree = { ...other, label: n, children: c || [], _type: type };
    if (c && c.length > 0) {
      currTree.children = traverseTreeRetNorm(c, { label, children });
    }
    curr.push(currTree);
  }
  return curr;
}

// 处理treeData
export function performNormTreeData(
  treeData,
  { key = 'id', label = 'label', children = 'children', value = 'code' } = {},
) {
  if (!Array.isArray(treeData)) {
    throw new Error('need array');
  }
  const fn = (t) => {
    let data = [];
    if (!Array.isArray(t)) return data;
    for (let item of t) {
      data.push({
        ...item,
        value: item[value],
        title: item[label],
        key: item[key].toString(),
        children: fn(item[children]),
      });
    }
    return data;
  };
  return fn(treeData);
}

// 返回以http开始的url
export function retNormHttpUrl(url) {
  if (!url) return '';
  if (!/^https?:\/\/.*/.test(url)) {
    return 'http://' + url;
  }
  return url;
}

// 对空字段的统一处理
export function emptyString(value) {
  if (!value || value == null || value == 'null' ) return '-';
  if (typeof value === 'string' || typeof value === 'number') return value;
  return JSON.stringify(value)
}
