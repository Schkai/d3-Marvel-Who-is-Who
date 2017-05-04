var gulp = require('gulp'),
  connect = require('gulp-connect'),
  traceur = require('gulp-traceur'),
  sass = require('gulp-sass');

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

gulp.task('traceur', function(){
  gulp.src('./scripts/*.js')
      .pipe(traceur())
      .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('watch', function(){
  gulp.watch(['./sass/*.scss'], ['sass']);
  gulp.watch(['./scripts/*.js'], ['traceur']);
  gulp.watch(['./dist/**/*.*'], ['reload']);
  gulp.watch(['./index.html'], ['reload']);
});

gulp.task('default', ['connect', 'watch', 'sass', 'traceur']);
