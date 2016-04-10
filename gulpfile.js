var gulp = require('gulp');
var concat = require('gulp-concat');
var react = require('gulp-react');
var babel = require('gulp-babel')
var htmlreplace = require('gulp-html-replace');
var clean = require('gulp-clean');
var sass  = require('gulp-ruby-sass');
var livereload = require('gulp-livereload');
var autoprefixer = require('gulp-autoprefixer');

var config = {
  HTML: 'src/client/*.html',
  ALL: ['src/application/*.js', 'src/client/index.html'],
  JS: ['src/application/*.js', 'src/js/**/*.js'],
  MINIFIED_OUT: 'js/build.min.js',
  STYLES_OUT: 'build/css',
  DEST: 'build'
};


gulp.task('default', ['replaceHTML', 'build', 'sass']);

gulp.task('build', function(){
  gulp.src(config.JS)
    .pipe(babel({
        only: [
          'src/application',
        ],
        presets: ['react'],
        compact: false
      }))
    .pipe(concat(config.MINIFIED_OUT))
    .pipe(gulp.dest(config.DEST));
});

gulp.task('replaceHTML', function(){
  gulp.src(config.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + config.MINIFIED_OUT
    }))
    .pipe(gulp.dest(config.DEST));
});

/**
 * Compile less to css
 * @return {Stream}
 */
gulp.task('sass', ['clean-styles'], function() {
    return sass(['src/client/css/style.scss'])
        .on('error', sass.logError)
        //.pipe(autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest('./build/css'))
        .pipe(livereload());
});


gulp.task('clean-styles', function () {
  return gulp
      .src(config.STYLES_OUT)
      .pipe(clean())
})
