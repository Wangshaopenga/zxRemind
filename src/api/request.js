"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var request = axios_1["default"].create({
    baseURL: 'https://cyber-tea-platform.anrunlu.net/stu',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
});
request.interceptors.request.use(function (config) {
    // 自定义header，可添加项目token
    config.headers.token = 'token';
    return config;
});
request.interceptors.response.use(function (response) {
    // 获取接口返回结果
    return response;
});
exports["default"] = request;
