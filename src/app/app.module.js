"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var axios_1 = require("@nestjs/axios");
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [axios_1.HttpModule.registerAsync({
                    useFactory: function () { return ({
                        timeout: 5000,
                        maxRedirects: 5,
                        baseURL: 'https://cyber-tea-platform.anrunlu.net/stu',
                        headers: {
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.NjEyYjgzYzU3MDg3MTEyZmVkODU1MjJm.0YD2dZ4a9gCWmemQufu0WHAJ1K5gVc2FBHDUfDwtuoc'
                        }
                    }); }
                })],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
