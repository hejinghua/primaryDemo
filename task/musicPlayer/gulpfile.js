var gulp = require("gulp");
//html插件
var htmlclean = require("gulp-htmlclean");

//图片插件
var imagemin = require("gulp-imagemin");

//js插件
var uglify = require("gulp-uglify");
var strip = require("gulp-strip-debug");
var concat = require("gulp-concat");

//css插件
var less = require("gulp-less");
var postcss = require("gulp-postcss"); //自动添加前缀+压缩代码
var autoprefixer = require("autoprefixer"); //压缩前缀
var cssnano = require("cssnano"); //压缩css代码

//模拟服务器
var connect = require("gulp-connect");

//开发环境判断
var devMode = process.env.NODE_ENV == "development";
console.log(devMode);
// gulp.src() //读文件
// gulp.dest()//写文件
// gulp.task()//任务
// gulp.watch()//监听

var folder = {
  src: "./src/", //开发目录文件夹
  build: "./build/" //压缩打包后目录文件夹
}
gulp.task("html", function () {
  var page = gulp.src(folder.src + "html/*")
      .pipe(connect.reload()) //自动刷新
  if (!devMode) {
    page.pipe(htmlclean())

  }
  page.pipe(gulp.dest(folder.build + "html/"))
})

gulp.task("images", function () {
  gulp.src(folder.src + "images/*") //取到开发路径下文件夹下面文件
    .pipe(imagemin())
    .pipe(gulp.dest(folder.build + "images/")) //文件所放路径
})

gulp.task("js", function () {
  var page = gulp.src(folder.src + "js/*")
      .pipe(connect.reload())
  if (!devMode) {
    page.pipe(strip())
    // .pipe(concat("main.js"))//main.js为拼接完成后的文件
    page.pipe(uglify())
  }
  page.pipe(gulp.dest(folder.build + "js/"))
})

gulp.task("css", function () {
  var options = [autoprefixer(), cssnano()];
  var page = gulp.src(folder.src + "css/*")
    .pipe(less())
    .pipe(connect.reload())
  if (!devMode) {
    page.pipe(postcss(options))
  }
  page.pipe(gulp.dest(folder.build + "css/"))
})

gulp.task("watch", function () {
  gulp.watch(folder.src + "html/*", ["html"]);
  gulp.watch(folder.src + "css/*", ["css"]);
  gulp.watch(folder.src + "js/*", ["js"]);
  gulp.watch(folder.src + "images/*", ["images"]);
})

gulp.task("server", function () {
  connect.server({
    port: "8088",
    livereload: true
  })
})



gulp.task("default", ["html", "images", "js", "css", "watch","server"]) //创建执行任务