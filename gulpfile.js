const _ = require("lodash");
const del = require("del");
const gulp = require("gulp");
const through = require("through2");
const webpack = require("webpack");
const webpack_stream = require("webpack-stream");
const zip = require("gulp-zip");

gulp.task("build:chrome", function (callback) {
    build("chrome");
    callback();
});

gulp.task("build:firefox", function (callback) {
    build("firefox");
    callback();
});

gulp.task("clean", function (callback) {
    del([
        "./build/**/*"
    ]);
    callback();
});

gulp.task("pack:chrome", ["build:chrome"], function (callback) {
    gulp.src("./build/chrome/*")
        .pipe(zip("edge_translate_chrome.zip"))
        .pipe(gulp.dest("./build/"));
    callback();
});

gulp.task("pack:firefox", ["build:firefox"], function (callback) {
    gulp.src("./build/firefox/*")
        .pipe(zip("edge_translate_firefox.zip"))
        .pipe(gulp.dest("./build/"));
    callback();
});

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

    gulp.src("./src/**/!(manifest|manifest_chrome|manifest_firefox).!(js|css)", { base: "src" })
        .pipe(gulp.dest(output_dir));

    gulp.src("./static/**/*", {base: "static"})
        .pipe(gulp.dest(output_dir));
}

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