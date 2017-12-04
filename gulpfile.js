var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	plumber = require('gulp-plumber'),
	imagemin = require('gulp-imagemin')
	bs = require('browser-sync').create();

// Scripts Task
// Uglifies
gulp.task('scripts', function(){
	gulp.src('js/*.js')
	.pipe(plumber())
	.pipe(uglify())
	.pipe(gulp.dest('build/js'));
});


// Compress Task
gulp.task('image' , function(){
	gulp.src('img/*')
	.pipe(imagemin())
	.pipe(gulp.dest('build/img'))
})


// Styles Task
// 
gulp.task('styles', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(prefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('build/css'))
    .pipe(bs.stream());
});


// Watch Task
gulp.task('watch', function(){
	gulp.watch('js/*.js' , ['scripts']);
	gulp.watch('./scss/**/*.scss', ['styles'])
	gulp.watch('*.html', bs.reload);
    gulp.watch('js/**/*.js', bs.reload);
});


gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', ['scripts', 'styles', 'browser-sync', 'watch']);