var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');
var baseDir = './dashboard';
var srcDir = baseDir + '/src';
var stylesDir = srcDir + '/styles';
var scriptsDir = srcDir + '/scripts';
var distDir = baseDir + '/dist';


gulp.task('browser-sync', function() {
    browserSync({
        browser: "google chrome",
        server: {
            baseDir: baseDir,
            middleware: [historyApiFallback]
        }
    });
});

gulp.task('browserify', function() {
    var bundler = browserify({
        entries: ['./dashboard/scripts/app.js'],
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
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dashboard/scripts/'));
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dashboard/scripts/'))
    .pipe(reload({stream:true}));
});

gulp.task('css', function () {
    gulp.watch('styles/**/*.css', function () {
        return gulp.src('styles/**/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('build/'));
    });
});

gulp.task('default', ['browserify', 'css', 'browser-sync']);
