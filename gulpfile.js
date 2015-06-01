var gulp = require('gulp');
var jshint = require('gulp-jshint');
var server = require('gulp-server-livereload');

gulp.task('lint', function() {
  return gulp.src('./js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('serve', function() {
  gulp.src('.')
    .pipe(server({
      livereload: true,
      open: true
    }));
});
