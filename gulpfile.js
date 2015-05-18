var gulp = require('gulp');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var ghPages = require('gulp-gh-pages');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');
var sass = require('gulp-sass');
var baseDir = './dashboard';
var srcDir = baseDir + '/src';
var distDir = baseDir + '/dist';
var stylesDir = srcDir + '/styles';
var scriptsDir = srcDir + '/scripts';


gulp.task('deploy', function() {
    return gulp.src(distDir + '/*')
        .pipe(ghPages({
            message: "Dashboard update." + Date.now(),
            remoteUrl: "https://github.com/okfn/spend-publishing-dashboard"
        }));
});


gulp.task('serve', function() {
    // Run a development server that reloads on changes
    browserSync({
        open: false,
        server: {
            baseDir: distDir,
            middleware: [historyApiFallback]
        }
    });
});


gulp.task('scripts', function() {
    // Transforms scripts into a bundle for the browser
    var bundler = browserify({
        entries: [scriptsDir + '/app.js'],
        transform: [reactify],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });
    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () {
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle()
        .pipe(source('app.min.js'))
        .pipe(gulp.dest(distDir));
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    .pipe(source('app.min.js'))
    .pipe(gulp.dest(distDir))
    .pipe(reload({stream:true}));
});


gulp.task('styles', function () {
    gulp.src(stylesDir + '/app.scss')
        .pipe(sass())
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest(distDir));
});


gulp.task('default', ['scripts', 'styles', 'serve']);
