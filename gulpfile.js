const _ = require("lodash");
const del = require("del");
const gulp = require("gulp");
const through = require("through2");
const webpack = require("webpack");
const webpack_stream = require("webpack-stream");
const zip = require("gulp-zip");

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
 * build chrome版扩展
 */
gulp.task("build:chrome", function (callback) {
    build("chrome");
    callback();
});

/**
 * build firefox版扩展
 */
gulp.task("build:firefox", function (callback) {
    build("firefox");
    callback();
});

/**
 * 将chrome版扩展打包成zip文件以备发布
 */
gulp.task("pack:chrome", function (callback) {
    gulp.src("./build/chrome/*")
        .pipe(zip("edge_translate_chrome.zip"))
        .pipe(gulp.dest("./build/"));
    callback();
});

/**
 * 将firefox版扩展打包成zip文件以备发布
 */
gulp.task("pack:firefox", function (callback) {
    gulp.src("./build/firefox/*")
        .pipe(zip("edge_translate_firefox.zip"))
        .pipe(gulp.dest("./build/"));
    callback();
});

/**
 * 根据传入的参数build对应版本的扩展
 * 
 * @param {String} browser 
 */
function build(browser) {
    let output_dir = "./build/" + browser + "/";
    let manifest_patch = "./src/manifest_" + browser + ".json";
    let webpack_path = "./config/webpack.dev.config.js"; // webpack 配置文件路径

    gulp.src("./src/**/*.js", { base: "src" })
        .pipe(webpack_stream(require(webpack_path), webpack))
        .pipe(gulp.dest(output_dir));

    gulp.src("./src/manifest.json", { base: "src" })
        .pipe(merge_json(manifest_patch))
        .pipe(gulp.dest(output_dir));

    gulp.src("./src/**/*.html", { base: "src" })
        .pipe(gulp.dest(output_dir));

    gulp.src("./static/**/*", { base: "static" })
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