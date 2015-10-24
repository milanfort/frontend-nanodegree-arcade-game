var project = require('./package.json');
var del = require('del');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jslint = require('gulp-jslint');
var minify = require('gulp-minify-css');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');

var source = 'app';
var dest = 'dist';

gulp.task('clean', function () {
    del([
        dest
    ]);
});

gulp.task('css', function () {
    return gulp.src(source + '/css/main.css')
        .pipe(minify())
        .pipe(rename('main.min.css'))
        .pipe(prefix({
            browsers: ['last 2 versions', '> 2%'],
            cascade: false
        }))
        .pipe(gulp.dest(dest + '/css/'))
});

gulp.task('js', function () {
    return gulp.src(source + '/js/**/*.js')
        //.pipe(jslint())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dest + '/js/'));
});

gulp.task('lint', function () {
    return gulp.src(source + '/js/app.js')
        .pipe(jslint())
});

gulp.task('default', ['css', 'js'], function () {
    console.log('Building %s version %s', project.name, project.version);
});
