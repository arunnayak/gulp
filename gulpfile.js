//////////////////////////
//// required
///////////////

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	compass = require('gulp-compass'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename');


//////////////////////////
//// scripts task
///////////////

gulp.task('scripts', function(){
	gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
	.pipe(plumber())
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(reload({stream: true}));

});


//////////////////////////
//// compass scss tasks
///////////////
gulp.task('compass', function() {
  gulp.src('app/scss/style.scss')
    .pipe(plumber())
    .pipe(compass({
      config_file: './config.rb',
      css: 'app/css',
      sass: 'app/scss',
      require: ['susy']
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('app/css/'))
    .pipe(reload({stream:true}));
});


//////////////////////////
//// watch task
///////////////
gulp.task('html', function(){
	gulp.src('app/**/*.html')
	.pipe(reload({stream: true}));
});

//////////////////////////
//// browsersync tasks
///////////////
gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: "./app/"
		}
	});
});


//////////////////////////
//// watch task
///////////////
gulp.task('watch', function(){
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/scss/**/*.scss', ['compass']);
	gulp.watch('app/**/*.html', ['html']);

});


//////////////////////////
//// default task
///////////////

gulp.task('default', ['scripts', 'compass','html','browser-sync', 'watch']);
