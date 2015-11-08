var gulp = require('gulp');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var ghPages = require('gulp-gh-pages');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');
var sass = require('gulp-sass');

var stylesDir = './app/ui/styles';
var scriptsDir = './app/ui/scripts';
var stylesOutput = './public/styles';
var scriptsOutput = './public/scripts';

gulp.task('scripts', function() {
  // Transforms scripts into a bundle for the browser
  var bundler = browserify({
    entries: [scriptsDir + '/index.js'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }).transform('babelify', {presets: ["es2015", "react"]});
  var watcher  = watchify(bundler);

  return watcher
    .on('update', function() {
      var updateStart = Date.now();
      console.log('Updating!');
      watcher.bundle()
        .pipe(source('app.min.js'))
        .pipe(gulp.dest(scriptsOutput));
      console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    .pipe(source('app.min.js'))
    .pipe(gulp.dest(scriptsOutput))
    .pipe(reload({stream: true}));
});

gulp.task('styles', function() {
  gulp.src(stylesDir + '/app.scss')
    .pipe(sass())
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest(stylesOutput));
});

gulp.task('default', ['scripts', 'styles']);
