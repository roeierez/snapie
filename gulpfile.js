var gulp = require('gulp');
var concat = require('gulp-concat');
var react = require('gulp-react');
var babel = require('gulp-babel')
var htmlreplace = require('gulp-html-replace');
var clean = require('gulp-clean');

var path = {
  HTML: 'src/client/index.html',
  ALL: ['src/application/*.js', 'src/client/index.html'],
  JS: ['src/application/*.js', 'src/js/**/*.js'],
  MINIFIED_OUT: 'js/build.min.js',
  DEST: 'build'
};

gulp.task('build', function(){
  gulp.src(path.JS)
    .pipe(babel({
        only: [
          'src/application',
        ],
        presets: ['react'],
        compact: false
      }))
    .pipe(concat(path.MINIFIED_OUT))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('default', ['replaceHTML', 'build']);


