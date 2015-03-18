'use strict';

var gulp = require('gulp'),
    del  = require('del'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade');



gulp.task('clean', function () {
  del(['.tmp', 'public']);
});

gulp.task('sass', function () {
  var postcss      = require('gulp-postcss'),
      autoprefixer = require('autoprefixer-core');

  gulp
    .src('app/styles/main.scss')
    .pipe(sass())
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(gulp.dest('public/css'));
});

gulp.task('jade', function () {
  gulp
    .src('app/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('public'));
});
