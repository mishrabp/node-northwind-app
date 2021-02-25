'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const rm = require( 'gulp-rm' );
const jsmin = require( 'gulp-jsmin' );

gulp.task('tailwindcss',function(){
  const tailwindcss = require('tailwindcss');
  return gulp.src('src/css/tailwind.scss')
        .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
        .pipe(postcss([
            tailwindcss('./tailwind.config.js'),
            require('autoprefixer'),
        ]))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/css'));

});

//this is for style SASS conversion to CSS
/* gulp.task("style", function() {
  return gulp.src(srcStyle)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destCSS));
});
 */


gulp.task('vuejs',function(){
  return browserify({
    entries: 'mvc/views/vuecomponents.js'
  })
  .transform( babelify, { presets: ['es2015'] } )
  .bundle()
  .pipe( source( 'vuecomponents.js' ) )
  .pipe(rename({suffix: '.min'}))
  .pipe( buffer() )
  .pipe( sourcemaps.init( { loadMaps:true } ) )
  //.pipe( uglify() )
  .pipe( sourcemaps.write( '.' ) )
  .pipe( gulp.dest( 'public/js' ) );
});

gulp.task('googlejs',function(){
  return browserify({
    entries: 'mvc/views/location/googlemap.js'
  })
  .transform( babelify, { presets: ['es2015'] } )
  .bundle()
  .pipe( source( 'googlemap.js' ) )
  .pipe(rename({suffix: '.min'}))
  .pipe( buffer() )
  .pipe( sourcemaps.init( { loadMaps:true } ) )
  .pipe( uglify() )
  .pipe( sourcemaps.write( '.' ) )
  .pipe( gulp.dest( 'public/js' ) );
});

gulp.task('javascript',function(){
  return gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('publish',function(){
  gulp.src('src/js/*.json')
    .pipe(gulp.dest('public'));
  //gulp.src('src/demo/*.*')
  //.pipe(gulp.dest('public/demo'));
  gulp.src('src/testing/*.html')
    .pipe(gulp.dest('public'));
  gulp.src('src/images/*.svg')
    .pipe(gulp.dest('public/images'));
  gulp.src('src/images/*.png')
    .pipe(gulp.dest('public/images'));
  return gulp.src('src/images/*.ico')
    .pipe(gulp.dest('public'));
});

gulp.task('clean', function(){
  return gulp.src( 'public/**/*', { read: false })
    .pipe( rm() )
});

gulp.task('default', gulp.series('clean',
  gulp.parallel('vuejs','googlejs','javascript','tailwindcss'),
  'publish'));

// Watch
gulp.task('watch', function() {
  gulp.watch('./src/**/*.*',  gulp.parallel('tailwindcss', 'javascript', 'publish'));
  gulp.watch('./mvc/views/**/*.js',  gulp.parallel('vuejs','googlejs'));
});