var del = require("del");
var gulp = require("gulp");
var webpack = require("webpack");
var webpack_stream = require("webpack-stream");

gulp.task("compile", function () {
    gulp.src("./src/**/*.js", {base: "src"})
        .pipe(webpack_stream(require("./webpack.config.js"), webpack))
        .pipe(gulp.dest("./build/"));
});

gulp.task("build", ["compile"], function () {
    gulp.src("./src/**/*.!(js)", {base: "src"})
        .pipe(gulp.dest("./build/"));
});

gulp.task("clean", function () {
    del([
        "./build/**/*"
    ]);
});