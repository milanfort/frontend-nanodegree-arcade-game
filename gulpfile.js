var project = require('./package.json');
var gulp = require('gulp');

gulp.task('default', function() {
    console.log('Building %s version %s', project.name, project.version);
});
