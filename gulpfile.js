var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require('gulp-concat');
var minifyCSS = require('gulp-cssmin');
var spawn = require('cross-spawn');
var uglify = require('gulp-uglify');
const alert = require('ansi-colors');

const JSPATH = 'js/';
const CSSPATH = 'css/';

function swallowError (error) {

    // If you want details of the error in the console
    console.log(error)
  
  }



gulp.task('js', (done) => {
    gulp.src(JSPATH + "modules/*.js")
    .pipe(concat("theme.min.js"))
    .on('error', swallowError)
    .pipe(uglify({"compress": false}))
    .pipe(gulp.dest(JSPATH))
    .on('end', function(){
        var opencode = spawn('opencode', ['upload', JSPATH + 'theme.min.js']);
        opencode.stdout.on('data', (data) => {
            var output = alert.green(data);
            if (data.indexOf('Error') > -1) {
                output = alert.red(data);
            }
            process.stdout.write(output);
        });
        opencode.stderr.on('data', (data) => {
            process.stdout.write(alert.red(data));
        });
    });
    done();    
});

gulp.task('sass', function(done) { 
    gulp
    .src(CSSPATH + 'sass/theme.min.scss')
    .pipe(sass())
    .pipe(concat('theme.min.css'))
    .on('error', swallowError)
    .pipe(minifyCSS())
    .pipe(gulp.dest(CSSPATH))
    .on('end', function(){
        var opencode = spawn('opencode', ['upload', CSSPATH + 'theme.min.css']);
        opencode.stdout.on('data', (data) => {
            var output = alert.green(data);
            if (data.indexOf('Error') > -1) {
                output = alert.red(data);
            }
            process.stdout.write(output);
        });
        opencode.stderr.on('data', (data) => {
            process.stdout.write(alert.red(data));
        });
    })
    done();    
});

gulp.task('watch', () => {
    gulp.watch(CSSPATH + 'sass/*', gulp.series('sass'));
    gulp.watch(JSPATH + 'modules/*.js', gulp.series('js'));
    gulp.watch([
        'pages/**/*', 
        'elements/**/*', 
        'pages/**/*',
        'configs/**/*',
        'fonts/**/*',
        'img/**/*'
    ])
    .on('add', function(path){
        var opencode = spawn('opencode', ['upload', path]);
        opencode.stdout.on('data', (data) => {
            var output = alert.green(data);
            if (data.indexOf('Error') > -1) {
                output = alert.red(data);
            }
            process.stdout.write(output);
        });
        opencode.stderr.on('data', (data) => {
            process.stdout.write(alert.red(data));
        });
    })
    .on('change', function(path){
        var opencode = spawn('opencode', ['upload', path]);
        opencode.stdout.on('data', (data) => {
            var output = alert.green(data);
            if (data.indexOf('Error') > -1) {
                output = alert.red(data);
            }
            process.stdout.write(output);
        });
        opencode.stderr.on('data', (data) => {
            process.stdout.write(alert.red(data));
        });
    })
    .on('unlink', function(path){
        var opencode = spawn('opencode', ['delete', path]);
        opencode.stdout.on('data', (data) => {
            var output = alert.green(data);
            if (data.indexOf('Error') > -1) {
                output = alert.red(data);
            }
            process.stdout.write(output);
        });
        opencode.stderr.on('data', (data) => {
            process.stdout.write(alert.red(data));
        });
    })
});


gulp.task('default', gulp.parallel('watch', 'sass', 'js' ));
