const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    bs = require('browser-sync'),
    watch = require('gulp-watch'),
    htmlmin = require('gulp-htmlmin'),
    del = require('del'),
    runSequence = require('run-sequence');


const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 4.4',
]

function compilaSass() {
    return gulp
    .src(['./src/sass/*.scss', './src/sass/*.sass'])
    .pipe(sass(
        {
            outputStyle: 'nested',
            includePaths: ['.'],
            precision: 10,
            onError: console.error.bind(console, 'Saas error:')

        }))
    .pipe(autoprefixer({
        browsers:AUTOPREFIXER_BROWSERS,
        cascade: false
    }))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(bs.stream())
}


gulp.task('sass', compilaSass);

// gulp.task('minify-html', function () {
//     return gulp
//     .src(['./**/*.html', './*.html'])
//     .pipe(htmlmin())
//     .pipe(gulp.dest('./dist/'));
//

function watchCompiled() {

    gulp.watch(['./src/sass/**/*.scss', './src/sass/*.scss'], gulp.series(['clean','sass']))
    gulp.watch(['./**/*.html','./*.html', '../**/*.html', '../*.html']).on('change', bs.reload)    
}

function browser() {
    bs.init({
        server: {
            baseDir: '../', 
        }
    })
}
// Clean output directory
gulp.task('browser-sync', browser);
gulp.task('clean', () => del(['./dist']));



gulp.task('default', gulp.parallel('sass', 'browser-sync', watchCompiled))