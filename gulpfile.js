const source = require('vinyl-source-stream');
const gulp = require('gulp');
const gutil = require('gulp-util');
const browserify = require('browserify');
const babelify = require('babelify');
const watchify = require('watchify');
const notify = require('gulp-notify');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const buffer = require('vinyl-buffer');

const browserSync = require('browser-sync');
const reload = browserSync.reload;
const historyApiFallback = require('connect-history-api-fallback')

/**
 * Styles
 */

gulp.task('styles', function () {
  // move over fonts
  gulp.src('css/fonts/**.*')
  .pipe(gulp.dest('build/css/fonts'))

  // Compile CSS
  gulp.src('assets/css/style.scss')
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest('./build/css/'))
  .pipe(reload({stream:true}))
});

/**
 * Images
 */

gulp.task('images', function () {
  gulp.src('css/images/**')
  .pipe(gulp.dest('./build/css/images'))
});

/**
 * BrowserSync
 */

gulp.task('browser-sync', function () {
  browserSync({
      // we need to disable clicks and forms for when we test multiple rooms
      server : {
        port: 8000,
      },
      middleware : [ historyApiFallback() ],
      ghostMode: false
    });
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {
  var props = {
    entries: ['./scripts/' + file],
    debug : true,
    cache: {},
    packageCache: {},
    transform:  [babelify.configure({stage : 0 })]
  };

  // watchify() if watch requested, otherwise run browserify() once
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
    .on('error', handleErrors)
    .pipe(source(file))
    .pipe(gulp.dest('./build/'))
      // If you also want to uglify it
      // .pipe(buffer())
      // .pipe(uglify())
      .pipe(rename('main.js'))
      // .pipe(gulp.dest('./build'))
      .pipe(reload({stream:true}))
    }

  // listen for an update and run rebundle
  bundler.on('update', function () {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

gulp.task('scripts', function () {
  return buildScript('main.jsx', false); // this will run once because we set watch to false
});

// run 'scripts' task first, then watch for future changes
gulp.task('default', ['styles','scripts','browser-sync'], function () {
  gulp.watch('assets/css/*', ['styles']); // gulp watch for stylus changes
  return buildScript('main.jsx', true); // browserify watch for JS changes
});
