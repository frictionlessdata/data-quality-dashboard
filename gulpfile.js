var gulp = require('gulp');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var ghPages = require('gulp-gh-pages');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');
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
var appJS = 'app.min.js';

var production = (process.env.NODE_ENV === 'production');

/**
 * Run and return the scripts pipeline on bundle
 */
function scriptPipeline(bundle, outfile) {

  return bundle
    //.pipe(sourcemaps.init())
    .pipe(source(outfile))
    // .pipe(buffer())
    // .pipe(uglify())
    //.pipe(sourcemaps.write(publicDir))
    .pipe(gulp.dest(scriptsOutput));

}

/**
 * Provide frontend app as a single bundle.
 */
function distAppScripts() {
  var bundler = browserify({
    entries: [scriptsDir + '/index.js'],
    debug: !production,
    cache: {},
    packageCache: {},
    fullPaths: true
  }).transform('babelify', {presets: ["es2015", "react"]});

  if (process.env.WATCH === 'true') {
    bundler = watchify(bundler);
    bundler
      .on('update', function() {
        console.log('updating...')
        scriptPipeline(bundler.bundle(), appJS);
        console.log('updated.')
      });
    return scriptPipeline(bundler.bundle(), appJS)
      .pipe(reload({stream: true}));
  }
  return scriptPipeline(bundler.bundle(), appJS);
}

gulp.task('styles', function() {
  gulp.src(stylesDir + '/app.scss')
    .pipe(sass())
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest(stylesOutput));
});

gulp.task('scripts', distAppScripts);

gulp.task('default', ['scripts', 'styles']);
