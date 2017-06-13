/*
	gulpfile.js主配置文件，用于定义此文件夹中的代码由node来执行
*/

'use strict';
//加载模块

var gulp=require('gulp');
var less=require('gulp-less');
// var cssnano=require('gulp-cssnano');
var cssmin=require('gulp-cssmin');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
var imagemin=require('gulp-imagemin');
var clean=require('gulp-clean');
var browserSync=require('browser-sync').create();
//定义一个简单的任务
gulp.task('hello',function(){
	console.log('hello world');
});

//html复制的任务
gulp.task('html',function(){
	gulp.src('src/**/*.html')//读取文件
	.pipe(gulp.dest('dist'));//通过管道再次操作，写入到目标位置
});

//less编译
gulp.task('less',function(){
	gulp.src('src/less/*.less')
	.pipe(less())//less编译
	// .pipe(cssnano())//压缩
	.pipe(cssmin())//压缩
	.pipe(gulp.dest('dist/css/'));
});

//js合并的任务
gulp.task('js',function(){
	gulp.src('src/js/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js/'));

});

//图片压缩
gulp.task('image',function(){
	gulp.src('src/images/*')
	.pipe(imagemin())//压缩图片,对于png有效
	.pipe(gulp.dest('dist/images/'));
});
//清空之前的内容
gulp.task('clean',function(){
	gulp.src('dist/')
	.pipe(clean());
});

//合并任务
gulp.task('dist',['html','less','js','image']);

//定义一个监视任务
gulp.task('watch',function(){
	gulp.watch('src/**/*.html',['html']);//监视src目录下所有的html，文件，当发生变化时，进行监视，html任务也跟着变化
	gulp.watch('src/less/*.less',['less']);
	gulp.watch('src/js/*.js',['js']);
	gulp.watch('src/images/*',['image']);
});

//启动一个broswer-sync静态服务器，实现浏览器的同步
gulp.task('serve',['html','less','js','image','watch'],function(){
	browserSync.init({
		server:{
			baseDir:'./dist'
		},
		port:2017,
	});
});

