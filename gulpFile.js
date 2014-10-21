var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var to5 = require('gulp-6to5');
var concat = require('gulp-concat');

gulp.task('default',['js','watch']);

gulp.task('watch', function () {
    gulp.watch(['./lesson/**/*.js'], ['js'])
})

gulp.task('js', function () {
    return gulp.src('./lesson/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(to5())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.watch()