import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import browser from 'browser-sync';
const sass = gulpSass(dartSass);

export const createStyles = () => {
    return gulp.src('./styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./styles'))
    .pipe(browser.stream());
}

// Сервер
const server = (done) => {
    browser.init({
      server: {
        baseDir: '.'
      },
      cors: true,
      notify: false,
      ui: false,
    });
    done();
}
  
  // Перезагрузка сервера
const reload = (done) => {
    browser.reload();
    done();
}
  
  // Слежение за файлами
const watcher = () => {
    gulp.watch('./*.html', gulp.series(reload));
    gulp.watch('./styles/**/*.scss', gulp.series(createStyles));
}

const start = gulp.series(
  createStyles,
  server,
  watcher
)

export {start};