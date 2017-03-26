const gulp = require("gulp");
const gulpsync = require("gulp-sync")(gulp);

const babel = require("gulp-babel");

const cleanCSS = require("gulp-clean-css");
// const stylus = require("gulp-stylus");

const nodemon = require("gulp-nodemon");

const clean = require("gulp-clean");

gulp.task("clean", function() {
    return gulp
        .src("build", {
            read: false,
        })
        .pipe(clean());
});

gulp.task("compile:js", () => {
    return gulp
        .src([
            "./src/public/**/*.js",
            "!./src/public/bower*/",
            "!./src/public/bower*/**/*"
        ])
        .pipe(babel({
            presets: ["es2015"],
        }))
        .pipe(gulp.dest("./build/public"));
});



gulp.task("minify-css", function() {
    return gulp
        .src("./src/**/*.css")
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(gulp.dest("./build"));
});

// gulp.task("compile:stylus", () => {
//     return gulp.src("./src/**/*.styl")
//         .pipe(stylus())
//         .pipe(gulp.dest("./build"));
// });

// , "compile:stylus"

gulp.task("compile", ["compile:js"]);

gulp.task("copy:all", () => {
    return gulp
        .src([
            "./src/**/*.html",
            "./src/**/*.ico",
            "./src/**/*.js",
            "./src/**/*.hbs",
            "./src/**/fonts/**",
            "./src/**/img/*.*",

        ])
        .pipe(gulp.dest("./build"));
});

gulp.task("copy", ["copy:all"]);

gulp.task("build", gulpsync.sync(["clean", "compile", "copy", "minify-css"]));

gulp.task("serve", ["build"], () => {
    nodemon({
        script: "./build/server.js",
        ext: "js html hbs css",
        ignore: ["build"],
        tasks: ["build"],
    });
});