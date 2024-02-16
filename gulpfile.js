
var gulp = require("gulp");
var sass = require('gulp-sass')(require('sass'));
var del = require('del');
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var cssmin = require("gulp-cssmin");
var merge = require("merge-stream");
var babel = require("gulp-babel");
var npmlodash = require("lodash");
var smushit = require("gulp-smushit");
var autoprefixer = require("gulp-autoprefixer");
var cssbeautify = require("gulp-cssbeautify");
var fileinclude = require("gulp-file-include");
var browsersync = require("browser-sync");

// =======================================================
// -----------   Datta able Theme Configuration  -----------
// =======================================================

const caption_show = 'true'; // [ false , true ]
const preset_theme = 'preset-1'; // [ preset-1 to preset-10 ]
const dark_layout = 'false'; // [ false , true , default ]
const rtl_layout = 'false'; // [ false , true ]
const box_container = 'false'; // [ false , true ]
const sidebar_theme = 'dark'; // [ dark , light ]
const header_theme = ''; // [ '',preset-1 to preset-10 ]
const navbar_bg_theme = ''; // [ '',preset-1 to preset-10 ]
const logo_theme = ''; // [ '',preset-1 to preset-10 ]
const navbar_caption_theme = ''; // [ '',preset-1 to preset-10 ]
const navbar_image_theme = ''; // [ '',preset-1 to preset-6 ]
const nav_dropdown_icon_theme = ''; // [ '',preset-1 to preset-5 ]
const nav_dropdown_link_icon_theme = ''; // [ '',preset-1 to preset-6 ]

const version = 'v2.0.0';
// =======================================================

//  [ scss compiler ] start
gulp.task("sass", function () {
  // main style css
  return gulp
    .src("src/assets/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/assets/css"));
});
//  [ scss compiler ] end

//  [ Copy assets ] start
gulp.task("build", function () {
  var required_libs = {
    js: [
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/@popperjs/core/dist/umd/popper.min.js",
      "node_modules/simplebar/dist/simplebar.min.js",
      "node_modules/feather-icons/dist/feather.min.js",
      "node_modules/apexcharts/dist/apexcharts.min.js",
      "node_modules/jsvectormap/dist/js/jsvectormap.min.js",
      "node_modules/jsvectormap/dist/maps/world.js",
      "node_modules/jsvectormap/dist/maps/world-merc.js"
    ],
    css: [
      "node_modules/bootstrap/dist/css/bootstrap.min.css",
      "node_modules/jsvectormap/dist/css/jsvectormap.min.css"
    ],
  };
  npmlodash(required_libs).forEach(function (assets, type) {
    if (type == "css") {
      gulp.src(assets).pipe(gulp.dest("dist/assets/css/plugins"));
    } else {
      gulp.src(assets).pipe(gulp.dest("dist/assets/js/plugins"));
    }
  });
  var cpyassets = gulp
    .src(["src/assets/**/*.*", "!src/assets/scss/**/*.*"])
    .pipe(gulp.dest("dist/assets"));
      return merge(cpyassets);
});

//  [ Copy assets ] end

//  [ build html ] start
if (rtl_layout == "true") {
  var rtltemp = "rtl"
} else {
  var rtltemp = "ltr"
}


if (dark_layout == 'true') {
  var darklayouttemp = "dark"
} else {
  var darklayouttemp = "light"
}

const layout = {
  pc_caption_show: caption_show,
  pc_preset_theme: preset_theme,
  pc_dark_layout: dark_layout,
  pc_rtl_layout: rtl_layout,
  pc_box_container: box_container,
  pc_sidebar_theme: sidebar_theme,
  pc_header_theme : header_theme,
  pc_navbar_bg_theme : navbar_bg_theme,
  pc_logo_theme : logo_theme,
  pc_navbar_caption_theme : navbar_caption_theme,
  pc_navbar_image_theme : navbar_image_theme,
  pc_nav_dropdown_icon_theme : nav_dropdown_icon_theme,
  pc_nav_dropdown_link_icon_theme : nav_dropdown_link_icon_theme,
  pc_theme_version: version,
  bodySetup: 'data-pc-preset="' + preset_theme + '" data-pc-sidebar-caption="' + caption_show + '" data-pc-direction="' + rtltemp + '" data-pc-theme="' + darklayouttemp + '"',
};

gulp.task("build-html", function () {
  return gulp
    .src("src/html/**/*.html")
    .pipe(
      fileinclude({
        context: layout,
        prefix: "@@",
        basepath: "@file",
        indent: true,
      })
    )
    .pipe(gulp.dest("dist"));
});
//  [ build html ] end

//  [ build js ] start
gulp.task("build-js", function () {
  var layoutjs = gulp
    .src("src/assets/js/*.js")
    .pipe(gulp.dest("dist/assets/js"));

  var pagesjs = gulp
    .src("src/assets/js/pages/*.js")
    .pipe(gulp.dest("dist/assets/js/pages"));

  return merge(layoutjs, pagesjs);
});
//  [ build js ] end

//  [ scss compiler ] start
gulp.task("mincss", function () {
  // main style css
  return gulp
    .src("src/assets/scss/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssbeautify())
    .pipe(cssmin())
    .pipe(gulp.dest("dist/assets/css"));
});
//  [ scss compiler ] end

//  [ uglify js ] start
gulp.task("uglify", function () {
  var layoutjs = gulp
    .src("src/assets/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/assets/js"));

  var pagesjs = gulp
    .src("src/assets/js/pages/*.js")
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest("dist/assets/js/pages"));

  return merge(layoutjs, pagesjs);
});
//  [ uglify js ] end
//  [ image optimizer ] start
gulp.task("imgmin", function () {
  return gulp
    .src("src/assets/img/**/*.{jpg,png}")
    .pipe(smushit())
    .pipe(gulp.dest("dist/assets/img"));
});
//  [ image optimizer ] end

//  [ browser reload ] start
gulp.task("browserSync", function () {
  browsersync.init({
    server: "dist/",
  });
});
//  [ browser reload ] end

gulp.task("cleandist", function (callback) {
  del.sync(["dist/*/"]);
  callback();
});

//  [ watch ] start
gulp.task("watch", function () {
  gulp
    .watch("src/assets/scss/**/*.scss", gulp.series("sass"))
    .on("change", browsersync.reload);
  gulp
    .watch("src/assets/js/**/*.js", gulp.series("build-js"))
    .on("change", browsersync.reload);
  gulp
    .watch("src/html/**/*.html", gulp.series("build-html"))
    .on("change", browsersync.reload);
});
//  [ watch ] start
const compile = gulp.parallel("browserSync", "watch");
//  [ Default task ] start
gulp.task(
  "default",
  gulp.series("cleandist", "build", "sass", "build-js", "build-html", "imgmin", compile)
);
//  [ Default task ] end
// build in production mode
gulp.task(
  "build-prod",
    gulp.series("cleandist", "build", "sass", "build-js", "build-html", "imgmin")
);
