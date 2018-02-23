// Require gulp and plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync').create();


// Define file sources
var sassMain = ['development/sass/leadgen.scss'];
var sassSources = ['development/sass/**/*.scss']; // Any .scss file in any sub-directory
var jsSources = ['development/scripts/*.js']; // Any .js file in scripts directory


var browserSyncWatchFiles = [
    'css/*.css',
    'js/*.js',
    '*.html'
];

// browser-sync options
// see: https://www.browsersync.io/docs/options/
var browserSyncOptions = {
    // proxy: "http://localhost:8000",
    // xip: true,
    server: {
      baseDir: "./"
    },
    notify: {
      styles: {
        fontSize: '10px', position: 'fixed',
        top: '0', left: '43%', width: '200px',
        margin: '0px', padding: '5px',
        zIndex: '9999', display: 'block',
        borderRadius: '10px',
        color: 'white', textAlign: 'center',
        backgroundColor: 'rgba(55, 53, 47, 0.98)'
      }
    },
};



// Task to compile SASS files
gulp.task('sass', function() {
    gulp.src(sassMain) // use sassMain file source
        .pipe(sass({
            outputStyle: 'compressed' // Style of compiled CSS
        })
            .on('error', gutil.log)) // Log descriptive errors to the terminal
        .pipe(gulp.dest('css')); // The destination for the compiled file
});


// Task to concatenate and uglify js files
gulp.task('concat', function() {
    gulp.src(jsSources) // use jsSources
        .pipe(concat('script.js')) // Concat to a file named 'script.js'
        .pipe(uglify()) // Uglify concatenated file
        .pipe(gulp.dest('assets/js')); // The destination for the concatenated and uglified file
});


// Task to watch for changes in our file sources
gulp.task('watch', function() {
    gulp.watch(sassMain,['sass']); // If any changes in 'sassMain', perform 'sass' task
    gulp.watch(sassSources,['sass']); 
    gulp.watch(jsSources,['concat']); 
});

// Run:
// gulp browser-sync
// Starts browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync.init(browserSyncWatchFiles, browserSyncOptions );
});



// Default gulp task
gulp.task('default', ['sass', 'watch','browser-sync']);
// gulp.task('default', ['sass', 'concat', 'watch']);
