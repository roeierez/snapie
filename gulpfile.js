var gulp = require('gulp');
var concat = require('gulp-concat');

var babel = require('gulp-babel')
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var htmlreplace = require('gulp-html-replace');
var clean = require('gulp-clean');
var sass  = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var nodemon = require('gulp-nodemon');


var config = {
  HTML: 'src/client/*.html',
  ALL: ['src/application/*.js', 'src/client/index.html'],
  JS: ['src/application/*.js', 'src/js/**/*.js'],
  MINIFIED_OUT: 'js/build.min.js',
  STYLES_OUT: 'build/css',
  DEST: 'build'
};


gulp.task('default', ['replaceHTML', 'build', 'sass']);

gulp.task('build', ['js', 'replaceHTML', 'sass']);

gulp.task('js', function () {

  return browserify(['./src/application/main.js'], {debug: true})
    .transform('babelify', {presets: ["es2015", "react"]})
    .bundle()
    .on('error', function (err){
      console.log('there was an error')
      console.log(err.toString())
    })
    .pipe(source('main.js'))
    .pipe(require('gulp-rename')('build.min.js'))
    .pipe(gulp.dest('./build/js'));
})

gulp.task('replaceHTML', function(){
  return gulp.src(config.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + config.MINIFIED_OUT
    }))
    .pipe(gulp.dest(config.DEST));
});

gulp.task('development', ['build'], function (){
  gulp.watch(['src/**/*'], ['build'])
  nodemon({
      script: './app.js',
      delayTime: 1,
      watch: ['./src'],
      env: {
        NODE_ENV: 'dev'
      }
    })
    .on('restart', function(ev) {
      console.log('*** nodemon restarted');
      console.log('files changed:\n' + ev);
      // setTimeout(function() {
      //     browserSync.notify('reloading now ...');
      //     browserSync.reload({stream: false});
      // }, config.browserReloadDelay);
    })
    .on('start', function () {
      console.log('*** nodemon started');
    })
    .on('crash', function () {
      console.log('*** nodemon crashed: script crashed for some reason');
    })
    .on('error', function (e) {
      console.log(e)
    })
    .on('exit', function () {
      console.log('*** nodemon exited cleanly');
    });
})

/**
 * Compile less to css
 * @return {Stream}
 */
gulp.task('sass', ['clean-styles'], function() {
    return sass(['src/client/css/style.scss'])
        .on('error', sass.logError)
        //.pipe(autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest('./build/css'))
});


gulp.task('clean-styles', function () {
  return gulp
      .src(config.STYLES_OUT)
      .pipe(clean())
})
