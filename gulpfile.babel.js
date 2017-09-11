import gulp from 'gulp'
import uglify from 'gulp-uglify'
import babel from 'gulp-babel'
import rm from 'rimraf'

const dirs = {
  src: 'src',
  dest: 'dest'
}

gulp.task('default', () => {
  rm(dirs.dest, err => {
    if (err) throw err
    gulp.src(`./${dirs.src}/index.js`)
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(dirs.dest))
  })
})