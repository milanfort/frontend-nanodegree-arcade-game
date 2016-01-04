var project = require('./package.json');
var del = require('del');
var gulp = require('gulp');
var deporder = require('gulp-deporder');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jslint = require('gulp-jslint');
var minify = require('gulp-minify-css');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var htmlbuild = require('gulp-htmlbuild');
var htmlclean = require('gulp-htmlclean');
var a11y = require('gulp-a11y');
var imagemin = require('gulp-imagemin');
var wiredep = require('wiredep').stream;
var mainBowerFiles = require('main-bower-files');

var source = 'src';
var dest = 'dist';
var jsFile = 'main.min.js';
var cssFile = 'main.min.css';

gulp.task('clean', function (done) {
    del([dest], done);
});

gulp.task('bower', function() {
    return gulp.src(source + '/*.html')
        .pipe(wiredep())
        .pipe(gulp.dest(source))
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
    var glob = mainBowerFiles('**/*.js');
    glob.push(source + '/js/**/*.js');
    return gulp.src(glob)
        //.pipe(jslint())
        .pipe(deporder())
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

gulp.task('a11y', function () {
    return gulp.src(source + '/*.html')
        .pipe(a11y())
        .pipe(a11y.reporter());
});

gulp.task('lint', function () {
    var files = [];
    files.push(source + '/js/config.js');
    files.push(source + '/js/logging.js');
    //files.push(source + '/js/resources.js');
    files.push(source + '/js/entity.js');
    files.push(source + '/js/enemy.js');
    files.push(source + '/js/rock.js');
    files.push(source + '/js/gem.js');
    files.push(source + '/js/player.js');
    //files.push(source + '/js/app.js');
    //files.push(source + '/js/engine.js');

    return gulp.src(files)
        .pipe(jslint())
});

gulp.task('test', ['lint', 'a11y']);

gulp.task('default', ['css', 'images', 'js', 'html'], function () {
    console.log('Building %s version %s', project.name, project.version);
});
