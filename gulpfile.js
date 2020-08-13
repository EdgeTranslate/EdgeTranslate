const _ = require("lodash");
const del = require("del");
const gulp = require("gulp");
const stylus = require("gulp-stylus");
const through = require("through2");
const webpack = require("webpack");
const webpack_stream = require("webpack-stream");
const zip = require("gulp-zip");
const terser = require("gulp-terser");
const eslint = require("gulp-eslint");

var browser; // store the name of browser
var environment; // store the type of environment: enum{production,development}

/**
 * Define public tasks of gulp
 */

/**
 *
 * A public task to build JS of Chrome version in development mode
 *
 * Hint: The watch mode of webpack in development mode will block the current gulp task. So this task need to to be run independently
 *
 * @param {Function} callback execute callback to inform gulp that the task is finished
 */
exports["buildJS:chrome"] = callback => {
    browser = "chrome";
    environment = "development";
    buildJS();
    callback();
};
/**
 *
 * A public task to build JS of Firefox version in development mode
 *
 * Hint: The watch mode of webpack in development mode will block the current gulp task. So this task need to to be run independently
 *
 * @param {Function} callback execute callback to inform gulp that the task is finished
 */
exports["buildJS:firefox"] = callback => {
    browser = "firefox";
    environment = "development";
    buildJS();
    callback();
};
/**
 * A public task to build a Chrome package in development mode and watch code changes.
 * @param {Function} callback execute callback to inform gulp that the task is finished
 */
exports["dev:chrome"] = callback => {
    browser = "chrome";
    environment = "development";
    gulp.series(clean, gulp.parallel(eslintJS, manifest, html, styl, packStatic), watcher)();
    callback();
};
/**
 * A public task to build a Firefox package in development mode and watch code changes.
 * @param {Function} callback execute callback to inform gulp that the task is finished
 */
exports["dev:firefox"] = callback => {
    browser = "firefox";
    environment = "development";
    gulp.series(clean, gulp.parallel(eslintJS, manifest, html, styl, packStatic), watcher)();
    callback();
};
/**
 * A public task to build a Chrome package in production mode
 * @param {Function} callback execute callback to inform gulp that the task is finished
 */
exports["build:chrome"] = callback => {
    browser = "chrome";
    environment = "production";
    gulp.series(clean, gulp.parallel(eslintJS, buildJS, manifest, html, styl, packStatic))();
    callback();
};
/**
 * A public task to build a Firefox package in production mode
 * @param {Function} callback execute callback to inform gulp that the task is finished
 */
exports["build:firefox"] = callback => {
    browser = "firefox";
    environment = "production";
    gulp.series(clean, gulp.parallel(eslintJS, buildJS, manifest, html, styl, packStatic))();
    callback();
};
/**
 * A public task to build and zip a Chrome package in production mode
 * @param {Function} callback execute callback to inform gulp that the task is finished
 */
exports["pack:chrome"] = callback => {
    browser = "chrome";
    environment = "production";
    gulp.series(
        clean,
        gulp.parallel(eslintJS, buildJS, manifest, html, styl, packStatic),
        packToZip
    )();
    callback();
};
/**
 * A public task to build and zip a Firefox package in production mode
 * @param {Function} callback execute callback to inform gulp that the task is finished
 */
exports["pack:firefox"] = callback => {
    browser = "firefox";
    environment = "production";
    gulp.series(
        clean,
        gulp.parallel(eslintJS, buildJS, manifest, html, styl, packStatic),
        packToZip
    )();
    callback();
};
/**
 * End public tasks' definition
 */

/**
 * Define private tasks of gulp
 */
/**
 * A private task to clean old packages before building new ones
 * @param {Function} callback execute callback to inform gulp that the task is finished
 */
async function clean(callback) {
    let output_dir = "./build/" + browser + "/";
    let packageName = "edge_translate_" + browser + ".zip";
    await del([output_dir, output_dir + packageName]);
    callback();
}

/**
 * 将build的扩展打包成zip文件以备发布
 */
function packToZip(callback) {
    let match_dir = "./build/" + browser + "/**/*";
    let packageName = "edge_translate_" + browser + ".zip";
    gulp.src(match_dir)
        .pipe(zip(packageName))
        .pipe(gulp.dest("./build/"));
    callback();
}

/**
 * A private task to watch change of code and update the package immediately
 * @param {Function} callback execute callback to inform gulp that the task is finished
 */
function watcher(callback) {
    gulp.watch("./src/**/*.js").on("change", function() {
        eslintJS();
    });
    gulp.watch("./src/display/templates/*.html").on("change", function() {
        eslintJS();
    });
    gulp.watch("./src/(manifest|manifest_chrome|manifest_firefox).json").on("change", function() {
        manifest();
    });
    gulp.watch("./src/**/!(result|loading|error).html").on("change", function() {
        html();
    });
    gulp.watch("./static/**/*").on("change", function() {
        packStatic();
    });
    gulp.watch("./src/**/*.styl").on("change", function() {
        styl();
    });
    callback();
}

/**
 * A private task to run eslint check for JS code
 */
function eslintJS() {
    return gulp
        .src("./src/**/*.js", { base: "src" })
        .pipe(
            eslint({
                configFile: "./.eslintrc.js"
            })
        )
        .pipe(eslint.format());
}

/**
 * A private code to build JS code
 */
function buildJS() {
    let output_dir = "./build/" + browser + "/";
    let webpack_path =
        environment === "production"
            ? "./config/webpack.prod.config.js"
            : "./config/webpack.dev.config.js"; // webpack 配置文件路径
    return gulp
        .src("./src/**/*.js", { base: "src" })
        .pipe(webpack_stream(require(webpack_path), webpack))
        .pipe(gulp.dest(output_dir))
        .on("error", error => log(error));
}

/**
 * A private task to merge manifest json files to one json file
 */
function manifest() {
    let output_dir = "./build/" + browser + "/";
    let manifest_patch = "./src/manifest_" + browser + ".json";
    return gulp
        .src("./src/manifest.json", { base: "src" })
        .pipe(merge_json(manifest_patch))
        .pipe(gulp.dest(output_dir));
}

/**
 * A private task to pack HTML files except HTML templates
 */
function html() {
    let output_dir = "./build/" + browser + "/";
    return gulp
        .src(["./src/**/!(result|loading|error).html"], { base: "src" })
        .pipe(gulp.dest(output_dir));
}

/**
 * A private task to convert styl to css files
 */
function styl() {
    let output_dir = "./build/" + browser + "/";
    return gulp
        .src("./src/!(lib)/**/*.styl", { base: "src" })
        .pipe(
            stylus({
                compress: true // 需要压缩
            }).on("error", error => log(error))
        )
        .pipe(gulp.dest(output_dir));
}

/**
 * A private task to pack static files under "./static/"
 */
function packStatic() {
    let output_dir = "./build/" + browser + "/";
    if (browser === "chrome") {
        gulp.src("./static/**/!(element_main).js", { base: "static" })
            .pipe(terser().on("error", error => log(error)))
            .pipe(gulp.dest(output_dir));

        // Do not uglify element_main.js
        gulp.src("./static/google/element_main.js", { base: "static" }).pipe(gulp.dest(output_dir));

        return gulp.src("./static/**/!(*.js)", { base: "static" }).pipe(gulp.dest(output_dir));
    } else {
        gulp.src("./static/!(pdf)/**/!(element_main).js", { base: "static" })
            .pipe(terser().on("error", error => log(error)))
            .pipe(gulp.dest(output_dir));

        // Do not uglify element_main.js
        gulp.src("./static/google/element_main.js", { base: "static" }).pipe(gulp.dest(output_dir));

        return gulp
            .src("./static/!(pdf)/**/!(*.js)", { base: "static" })
            .pipe(gulp.dest(output_dir));
    }
}
/**
 * End private tasks' definition
 */

/**
 * 一个简易gulp插件，接收一组json文件作为参数，将它们合并到gulp.src引用的基本json文件；
 * 在这里的作用是合并公共manifest和不同浏览器特有的manifest。
 */
function merge_json() {
    let objs = [];
    for (let i in arguments) {
        objs.push(require(arguments[i]));
    }

    let stream = through.obj(function(file, enc, callback) {
        let obj = JSON.parse(file.contents.toString(enc));
        for (let i in objs) {
            obj = _.defaultsDeep(obj, objs[i]);
        }

        file.contents = Buffer.from(JSON.stringify(obj));
        this.push(file);
        callback();
    });

    return stream;
}

// 定义 log函数 ，便于输出task的执行情况
function log(d) {
    process.stdout.write(d + "\n");
}
