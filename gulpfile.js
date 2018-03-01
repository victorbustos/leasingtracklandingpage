// Require gulp and plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect-php'), // For built-in PHP server:  php -S localhost:8000
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
var browserSyncOptions = {
    proxy: "127.0.0.1:8000",
    // xip: true,
    // server: {
    //   baseDir: "./"
    // },
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

// Task to Start Local PHP Server
gulp.task('connect', function() {
    connect.server();
});


// Task to compile SASS files
gulp.task('sass', function() {
    gulp.src(sassMain) // use sassMain file source
        .pipe(sass({
            outputStyle: 'compressed' // Style of compiled CSS
        })
            .on('error', gutil.log)) // Log descriptive errors to the terminal
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css')); // The destination for the compiled file
});


// Task to concatenate and uglify js files
gulp.task('concat', function() {
    gulp.src(jsSources) // use jsSources
        .pipe(concat('scripts.js')) // Concat to a file named 'script.js'
        .pipe(uglify()) // Uglify concatenated file
        .pipe(gulp.dest('js')); // The destination for the concatenated and uglified file
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
gulp.task('default', [ 'sass', 'watch','browser-sync']);
// gulp.task('default', ['sass', 'concat', 'watch']);
