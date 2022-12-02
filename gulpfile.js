const gulp = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const minify = require("gulp-minify");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const sync = require("browser-sync").create();
const fileinclude = require("gulp-file-include");
const plumber = require("gulp-plumber");

// Styles

const styles = () => {
  return gulp
    .src("source/public/css/**/*")
    .pipe(gulp.dest("build/css"))
    .pipe(plumber())
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

// HTML

const html = () => {
  return gulp
    .src("source/frontend/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("build"));
};

// exports.html = html;

//Scriptc

const scripts = () => {
  return gulp
    .src("source/public/js/*.js")
    .pipe(minify())
    .pipe(gulp.dest("build/js"));
};

exports.scripts = scripts;

// Images

const images = () => {
  return gulp
    .src("source/public/img/**/*")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ progressive: true }),
        // imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.svgo(),
      ])
    )
    .pipe(gulp.dest("build/img"));
};

exports.images = images;

//Webp

const createWebp = () => {
  return gulp
    .src("source/public/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"));
};

exports.createWebp = createWebp;

//Sprite

const sprite = () => {
  return gulp
    .src("source/public/icons-sprite/*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.html"))
    .pipe(gulp.dest("source/layouts/"));
};

exports.sprite = sprite;

//Copy

const copyImg = (done) => {
  gulp.src(["source/public/img/**/*"], {}).pipe(gulp.dest("build/img"));
  done();
};

exports.copyImg = copyImg;

const copyFonts = (done) => {
  gulp.src(["source/public/fonts/**/*"], {}).pipe(gulp.dest("build/fonts"));
  done();
};

exports.copyFonts = copyFonts;

const copyPlugin = (done) => {
  gulp.src(["source/public/plugins/*"], {}).pipe(gulp.dest("build/plugins/"));
  done();
};

exports.copyPlugin = copyPlugin;

//clean

const clean = () => {
  return del("build");
};

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/public/css/**/*.css", gulp.series("styles"));
  gulp.watch("source/public/js/*", gulp.series(scripts));
  gulp.watch(
    ["source/frontend/*.html", "source/layouts/*.html"],
    gulp.series(html),
    sync.reload
  );
};

//build

const build = gulp.series(
  clean,
  gulp.parallel(styles, html, scripts, sprite, copyFonts, copyPlugin, copyImg)
);

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  gulp.parallel(styles, html, scripts, sprite, copyFonts, copyPlugin, copyImg),
  gulp.series(server, watcher)
);
