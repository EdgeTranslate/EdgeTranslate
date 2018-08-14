const _ = require("lodash");
const del = require("del");
const gulp = require("gulp");
const through = require("through2");
const webpack = require("webpack");
const webpack_stream = require("webpack-stream");
const zip = require("gulp-zip");
var cached = require("gulp-cached");
var remember = require("gulp-remember");

/**
 * 清除之前打包好的chrome的缓存
 */
gulp.task("clean:chrome", function (callback) {
    del([
        "./build/chrome/*",
        "./build/edge_translate_chrome.zip"
    ]);
    callback();
});

/**
 * 清除之前打包好的firefox的缓存
 */
gulp.task("clean:firefox", function (callback) {
    del([
        "./build/firefox/*",
        "./build/edge_translate_firefox.zip"
    ]);
    callback();
});

/**
 * 开发环境下热更新 chrome扩展的安装包
 */
gulp.task("watcher:chrome", function (callback) {
    watcher("chrome");
    callback();
});

/**
 * 开发环境下热更新 firefox扩展的安装包
 */
gulp.task("watcher:firefox", function (callback) {
    watcher("firefox");
    callback();
});

/**
 * 开发环境下build chrome扩展的安装包
 */
gulp.task("dev:chrome", function () {
    build("chrome", "development");
});

/**
 * 开发环境下build firefox扩展的安装包
 */
gulp.task("dev:firefox", function () {
    build("firefox", "development");
})

/**
 * 生产环境下build chrome版扩展
 */
gulp.task("build:chrome", function (callback) {
    build("chrome", "production");
    callback();
});

/**
 * 生产环境下build firefox版扩展
 */
gulp.task("build:firefox", function (callback) {
    build("firefox", "production");
    callback();
});

/**
 * 将chrome版扩展打包成zip文件以备发布
 */
gulp.task("pack:chrome", function (callback) {
    gulp.src("./build/chrome/**/*")
        .pipe(zip("edge_translate_chrome.zip"))
        .pipe(gulp.dest("./build/"));
    callback();
});

/**
 * 将firefox版扩展打包成zip文件以备发布
 */
gulp.task("pack:firefox", function (callback) {
    gulp.src("./build/firefox/**/*")
        .pipe(zip("edge_translate_firefox.zip"))
        .pipe(gulp.dest("./build/"));
    callback();
});

/**
 * 根据传入的参数执行不同的热更新场景
 * 
 * @param {String} browser 浏览器的名称
 */
function watcher(browser) {
    var watcher = gulp.watch("./src/**/*", ["dev:" + browser]); // 监视src中所有文件
    watcher.on("change", function (event) {
        if (event.type === "deleted") {                   // 如果一个文件被删除了，则将其忘记
            delete cached.caches["dev:" + browser][event.path];       // gulp-cached 的删除 api
            remember.forget("dev:" + browser, event.path);         // gulp-remember 的删除 api
        }
    });
}

/**
 * 根据传入的参数build对应版本的扩展
 * 
 * @param {String} browser 浏览器的名称
 * @param {String} env build的环境变量  (production/development)两种值
 */
function build(browser, env) {
    let output_dir = "./build/" + browser + "/";
    let manifest_patch = "./src/manifest_" + browser + ".json";
    let webpack_path = (env === 'production' ? "./config/webpack.prod.config.js" : "./config/webpack.dev.config.js"); // webpack 配置文件路径

    gulp.src("./src/**/*.js", { base: "src" })
        .pipe(cached("build:" + browser))
        .pipe(webpack_stream(require(webpack_path), webpack))
        .pipe(remember("build:" + browser))
        .pipe(gulp.dest(output_dir));

    gulp.src("./src/manifest.json", { base: "src" })
        .pipe(cached("build:" + browser))
        .pipe(merge_json(manifest_patch))
        .pipe(remember("build:" + browser))
        .pipe(gulp.dest(output_dir));

    gulp.src(["./src/**/!(template).html", "./src/display/template.css"], { base: "src" })
        .pipe(cached("build:" + browser))
        .pipe(remember("build:" + browser))
        .pipe(gulp.dest(output_dir));

    gulp.src("./static/**/*", { base: "static" })
        .pipe(cached("build:" + browser))
        .pipe(remember("build:" + browser))
        .pipe(gulp.dest(output_dir));
}

/**
 * 一个简易gulp插件，接收一组json文件作为参数，将它们合并到gulp.src引用的基本json文件；
 * 在这里的作用是合并公共manifest和不同浏览器特有的manifest。
 */
function merge_json() {
    let objs = []
    for (let i in arguments) {
        objs.push(require(arguments[i]));
    }

    let stream = through.obj(function (file, enc, callback) {
        let obj = JSON.parse(file.contents.toString(enc));
        for (let i in objs) {
            obj = _.defaultsDeep(obj, objs[i]);
        }

        file.contents = new Buffer(JSON.stringify(obj));
        this.push(file);
        callback();
    });

    return stream;
}

