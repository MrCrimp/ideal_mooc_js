var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default',['js','watch']);

gulp.task('watch', function () {
    gulp.watch(['src/*.js'], ['js'])
})

gulp.task('js', function () {
    return gulp.src('src/**/*.js')
        
        .pipe(concat('build.js'))
    
        .pipe(gulp.dest('.'));
});

gulp.watch()