var project = require('./package.json');
var del = require('del');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jslint = require('gulp-jslint');
var minify = require('gulp-minify-css');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var htmlbuild = require('gulp-htmlbuild');
var htmlclean = require('gulp-htmlclean');
var imagemin = require('gulp-imagemin');

var source = 'src';
var dest = 'dist';
var jsFile = 'main.min.js';
var cssFile = 'main.min.css';

gulp.task('clean', function () {
    del([
        dest
    ]);
});

gulp.task('css', function () {
    return gulp.src(source + '/css/main.css')
        .pipe(minify())
        .pipe(rename(cssFile))
        .pipe(prefix({
            browsers: ['last 2 versions', '> 2%'],
            cascade: false
        }))
        .pipe(gulp.dest(dest + '/css/'))
});

gulp.task('images', function () {
    return gulp.src(source + '/images/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest(dest + '/images/'));
});

gulp.task('js', function () {
    return gulp.src(source + '/js/**/*.js')
        //.pipe(jslint())
        .pipe(concat(jsFile))
        .pipe(uglify())
        .pipe(gulp.dest(dest + '/js/'));
});

gulp.task('html', function () {
    return gulp.src(source + '/*.html')
        .pipe(htmlbuild({
            js: htmlbuild.preprocess.js(function (block) {
                block.write('js/' + jsFile);
                block.end();
            }),
            css: htmlbuild.preprocess.css(function (block) {
                block.write('css/' + cssFile);
                block.end();
            })
        }))
        .pipe(htmlclean())
        .pipe(gulp.dest(dest))
});

gulp.task('lint', function () {
    return gulp.src(source + '/js/app.js')
        .pipe(jslint())
});

gulp.task('default', ['css', 'images', 'js', 'html'], function () {
    console.log('Building %s version %s', project.name, project.version);
});
