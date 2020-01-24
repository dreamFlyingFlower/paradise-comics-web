/**
 * Vue环境中全局通用的方法
 */
import Cookies from 'js-cookie'
import {formatterNumber} from "../utils";

const TokenKey = 'Admin-Token';

export default {
  install: function (Vue) {
    /**
     * 存储临时session,不可跨域,浏览器关闭则session失效
     * @param key 存储的key
     * @param val 需要存储的值
     */
    Vue.prototype.$setSession = (key, val) => {
      if (typeof key !== "string") {
        console.log("key only string type");
        return;
      }
      if (typeof val === "string") {
        sessionStorage.setItem(key, val);
      } else {
        sessionStorage.setItem(key, JSON.stringify(val));
      }
    };
    /**
     * 获得session中的值,先json.parse下,若是解析成功,表明是对象,直接返回;若是解析失败,则直接返回
     */
    Vue.prototype.$getSession = (key) => {
      try {
        return JSON.parse(sessionStorage.getItem(key));
      } catch (error) {
        return sessionStorage.getItem(key);
      }
    };
    /**
     * 存储永久session,不可跨域,浏览器关闭session不失效
     * @param key 存储的key
     * @param val 需要存储的值
     */
    Vue.prototype.$setLocalSession = (key, val) => {
      if (!typeof key === "string") {
        console.log("key only string type");
        return;
      }
      if (typeof val === "string") {
        localStorage.setItem(key, val);
      } else {
        localStorage.setItem(key, JSON.stringify(val));
      }
    };
    /**
     * 获得session中的值,先json.parse下,若是解析成功,表明是对象,直接返回;若是解析失败,则直接返回
     */
    Vue.prototype.$getLocalSession = (key) => {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (error) {
        return localStorage.getItem(key);
      }
    };
    /**
     * 判断对象,数组或字符串是否为空,'   '字符串都是空格也是空,返回true
     * @param param 参数
     * @returns {boolean}
     */
    Vue.prototype.$isBlank = function (param) {
      if (new Vue().$isString(param)) {
        return param.trim().length === 0;
      }
      return !(param && Object.keys(param) && Object.keys(param).length > 0);
    };
    Vue.prototype.$nonBlank = function (param) {
      return !new Vue().$isBlank(param);
    };
    /**
     * 判断是否为一个数字
     * @param param 参数
     * @returns {boolean} true是,false不是
     */
    Vue.prototype.$isNumber = function (param) {
      return typeof param === "number" && !isNaN(param);
    };
    /**
     * 判断是否为一个字符串
     * @param param 参数
     * @returns {boolean} true是,false不是
     */
    Vue.prototype.$isString = function (param) {
      return typeof param === 'string' || param instanceof String;
    };
    /**
     * 判断是否为一个数组
     * @param param 参数
     * @returns {boolean} true是,false不是
     */
    Vue.prototype.$isArray = function (param) {
      return typeof Array.isArray === 'undefined' ?
        Object.prototype.toString.call(param) === "[object Array]"
        : Array.isArray(param);
    };
    /**
     * 判断是否为一个方法
     * @param param 参数
     * @returns {boolean} true是,false不是
     */
    Vue.prototype.$isFunc = (param) => {
      return typeof param === 'function'
        || Object.prototype.toString.call(param) === '[object Function]';
    };
    /**
     * 判断参数是否存在,其中数字0,null,undefined,""是不存在,逻辑判断为false.
     * 本方法中,除了本身为不存在的值之外,还将"undefined","null","   ",[],{}认为是不存在
     * es6(可能es5)之前的版本中,0==undefined,''==undefined为true,但是es6之后为false,0==''仍判断为true
     * 注意:[],{}仍然是存在的,只是为null,判断结果仍为true
     * @param param 参数
     */
    Vue.prototype.$exist = function (param) {
      if (!param) {
        return false;
      }
      // 判断字符串,"  ","0","undefined","null"为不存在,但js默认该值逻辑上为true
      if (new Vue().$isString(param)) {
        if (!param.trim() || param.trim() === '0' || param.trim() === "undefined" || param.trim() === "null") {
          return false;
        }
      }
      if (new Vue().$isNumber(param)) {
        return true;
      }
      // 判断{},[],认为该值为不存在,但js默认该值逻辑上为true
      return !!(param && Object.keys(param) && Object.keys(param).length > 0);
    };

    Vue.prototype.$isExternal = function (path) {
      return /^(https?:|mailto:|tel:)/.test(path);
    };
    Vue.prototype.$getToken = function () {
      return Cookies.get(TokenKey);
    };
    Vue.prototype.$setToken = function (token) {
      return Cookies.set(TokenKey, token);
    };
    Vue.prototype.$removeToken = function () {
      return Cookies.remove(TokenKey);
    };
    Vue.prototype.$formatDateTime = (date = new Date()) => {
      let ymd = new Vue().$formatDate(date);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      return [year, month, day].map(formatterNumber).join("-") + " "
        + [hour, minute, second].map(formatterNumber).join(":");
    };
    Vue.prototype.$formatDate = (date = new Date()) => {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      return [year, month, day].map(formatterNumber).join("-");
    };
    Vue.prototype.$formatTime = (date = new Date()) => {
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      return [hour, minute, second].map(formatterNumber).join(":");
    };
  }
};
