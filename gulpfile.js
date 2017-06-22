var gulp = require('gulp'),
  connect = require('gulp-connect'),
 // traceur = require('gulp-traceur'),
  sass = require('gulp-sass');

  //browserify
var browserify = require('browserify');
var es6ify = require('es6ify');
var source = require('vinyl-source-stream');


  gulp.task('connect', function() {
    connect.server({
      livereload: true,
      port: 8000
    });
  });

gulp.task('reload', function(){
  gulp.src('./dist/**/*.*')
      .pipe(connect.reload());
});

  gulp.task('sass', function(){
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

//build script
gulp.task('scripts', function() {
  return browserify('./scripts/app.js')
    .add(es6ify.runtime)
    .transform(es6ify)
    /*.require(require.resolve('./scripts/app.js'),*/
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/scripts'));
});

/*gulp.task('traceur', function(){
  gulp.src('./scripts/*.js')
      .pipe(traceur())
      .pipe(gulp.dest('./dist/scripts'));
});
*/

gulp.task('watch', function(){
  gulp.watch(['./sass/*.scss'], ['sass']);
  gulp.watch(['./scripts/*.js'], ['scripts']);
  gulp.watch(['./dist/**/*.*'], ['reload']);
  gulp.watch(['./index.html'], ['reload']);
});

gulp.task('default', ['connect', 'watch', 'sass', 'scripts']);
