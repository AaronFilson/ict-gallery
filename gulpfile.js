const gulp = require('gulp');
const webpack = require('webpack-stream');
const babel = require('babel-loader');
const html = require('html-loader');

gulp.task('html:dev', () => {
  gulp.src(__dirname + '/client/app/**/*.html')
    .pipe(gulp.dest(__dirname + '/client/build'));
});

gulp.task('css:dev', () => {
  gulp.src(__dirname + '/client/app/**/*.css')
    .pipe(gulp.dest(__dirname + '/client/build'));
});

gulp.task('images:dev', () => {
  gulp.src(__dirname + '/client/app/img/**/*')
    .pipe(gulp.dest(__dirname + '/client/build/img'));
});

gulp.task('webpack:dev', () => {
  gulp.src(__dirname + '/client/app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest(__dirname + '/client/build'));
});

gulp.task('webpack:test', () => {
  gulp.src(__dirname + '/client/test/test_entry.js')
    .pipe(webpack({
      module: {
        loaders: [
          {
            test: /\.html$/,
            loader: 'html'
          }
        ]
      },
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest(__dirname + '/client/test/'));
});


gulp.task('build:dev', ['webpack:dev', 'html:dev', 'css:dev', 'images:dev']);
gulp.task('default', ['build:dev', 'webpack:test']);
