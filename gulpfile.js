'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const pref = require('gulp-autoprefixer');
const brow = require('browser-sync').create();
const rlad = brow.reload;

gulp.task('pug', () => {
  return gulp.src('./dev/views/index.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('styles', () => {
  return gulp.src('./dev/scss/*.scss')
    .pipe(sass({ outputStyle: 'nested' }).on('error', sass.logError))
    .pipe(pref({ browsers: 'last 10 versions', cascade: true }))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(rlad({ stream: true }));
});

gulp.task('js', () => {
  return gulp.src('./dev/js/*.js')
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watcher', ['pug', 'styles', 'js'], () => {
  gulp.watch('./dev/views/*.pug', ['pug']);
  gulp.watch('./dev/scss/*.scss', ['styles']);
  gulp.watch('./dev/js/*.js', ['js']);
  gulp.watch('./dist/js/*.js').on('change', rlad);
  gulp.watch('./dist/*.html').on('change', rlad);
});

gulp.task('default', ['watcher'], () => {
  brow.init({ server: './dist/' });
});