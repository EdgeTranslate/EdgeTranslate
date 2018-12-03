const _ = require("lodash");
const del = require("del");
const gulp = require("gulp");
const stylus = require("gulp-stylus");
const through = require("through2");
const webpack = require("webpack");
const webpack_stream = require("webpack-stream");
const zip = require("gulp-zip");
const uglify = require("gulp-uglify");

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
    build("chrome", "development").all();
});

/**
 * 开发环境下build firefox扩展的安装包
 */
gulp.task("dev:firefox", function () {
    build("firefox", "development").all();
})

/**
 * 生产环境下build chrome版扩展
 */
gulp.task("build:chrome", function (callback) {
    build("chrome", "production").all();
    callback();
});

/**
 * 生产环境下build firefox版扩展
 */
gulp.task("build:firefox", function (callback) {
    build("firefox", "production").all();
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
    gulp.watch("./src/**/*.js").on("change", function () {
        build(browser, "development").js();
    });
    gulp.watch("./src/display/templates/*.html").on("change", function () {
        build(browser, "development").js();
    });
    gulp.watch("./src/manifest.json").on("change", function () {
        build(browser, "development").mainfest();
    });
    gulp.watch("./src/**/!(result|loading|error).html").on("change", function () {
        build(browser, "development").html();
    });
    gulp.watch("./static/**/*").on("change", function () {
        build(browser, "development").static();
    });
    gulp.watch("./src/**/*.styl").on("change", function () {
        build(browser, "development").styl();
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

    var js = function () {
        gulp.src("./src/**/*.js", { base: "src" })
            .pipe(webpack_stream(require(webpack_path), webpack).on('error', (error) => console.log(error)))
            .pipe(gulp.dest(output_dir));
        log("Finished build js files");
    }

    var mainfest = function () {
        gulp.src("./src/manifest.json", { base: "src" })
            .pipe(merge_json(manifest_patch))
            .pipe(gulp.dest(output_dir));
        log("Finished build mainfest files");
    }

    var html = function () {
        gulp.src(["./src/**/!(result|loading|error).html"], { base: "src" })
            .pipe(gulp.dest(output_dir));
        log("Finished build html files");
    }

    var static = function () {
        if (browser === "chrome") {
            gulp.src("./static/**/*.js", { base: "static" })
                .pipe(uglify())
                .pipe(gulp.dest(output_dir));
            gulp.src("./static/**/!(*.js)", { base: "static" })
                .pipe(gulp.dest(output_dir));
        } else {
            gulp.src("./static/!(pdf)/**/*", { base: "static" })
                .pipe(gulp.dest(output_dir));
        }
        log("Finished build static files");
    }

    var styl = function () {
        gulp.src("./src/**/*.styl", { base: "src" })
            .pipe(stylus({
                compress: true // 需要压缩
            }).on('error', (error) => console.log(error)))
            .pipe(gulp.dest(output_dir));
        log("Finished build stylus files")
    }

    return {
        js: js,
        mainfest: mainfest,
        html: html,
        static: static,
        styl: styl,
        all: function () {
            js();
            mainfest();
            html();
            static();
            styl();
        }
    }
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

// 定义 log函数 ，便于输出task的执行情况
log = function (d) {
    process.stdout.write(d + '\n');
};
