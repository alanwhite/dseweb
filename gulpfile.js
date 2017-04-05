
var gulp = require('gulp'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');
    htmlreplace = require('gulp-html-replace');

var input = 'src';
var output = 'build';

gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images', 'html');
});

gulp.task('styles', function() {
  return gulp.src(input+'/css/*.css')
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest(output+'/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    // .pipe(jshint('.jshintrc'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe(htmlreplace({
          css: 'assets/css/styles.min.css',
          js: 'assets/js/main.min.js'
        }))
        .pipe(gulp.dest('build'))
        .pipe(notify({ message: 'html task complete' }));
});

gulp.task('clean', function() {
  return del(['build/assets/css', 'build/assets/js', 'build/assets/img']);
});
