/*==================================================
=            npm install gulp --sav-dev            =
==================================================*/
// to disable>dest path replace fs
/*----------  dependance  > package.json > node_modules  ----------*/
var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    slim         = require("gulp-slim"),
    sass         = require('gulp-sass'),
    plumber      = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    rename       = require('gulp-rename'),
    using        = require('gulp-using'),
    rm           = require('gulp-rimraf'),
    gulprunseq   = require('gulp-run-seq'),
    sourcemaps   = require('gulp-sourcemaps'),
    imgmin       = require('gulp-imagemin'),
    replace      = require('gulp-replace'),
    changed      = require('gulp-changed'),
    zip          = require('gulp-zip'),
    prettify     = require('gulp-html-prettify'),
    fs           = require('fs'),
    request      = require('request'),
    cheerio      = require('cheerio');

    // replace      = require('gulp-inject-element'),
    // dom          = require('gulp-dom'),

// src & output
var src = 'src/',
    des = 'HTML/dest/',
    img = 'dest/images/',
    css = 'dest/css/';
/*=================================
=            task init            =
=================================*/
// browser-sync task !attention index.html require
gulp.task('browserSync',function () {
  'use strict';
  browserSync({
    server: {
      baseDir: 'dest/'
    }
  });
});

// img task
gulp.task('images', function() {
  'use strict';
  return gulp.src([src+'images/**/*.{png,jpg,gif,svg}'])
  // .pipe(npm()) // img optimize
  .pipe(changed(img))
  .pipe(gulp.dest(img))
});

// sass task
gulp.task('sass', function() {
  return gulp.src(src+'scss/*.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
    // .pipe(sass())
    .pipe(sass({
      errLogToConsole: true,
      // :nested :compact :expanded :compressed
      outputStyle: 'compact'
    }))
  .pipe(autoprefixer(['last 2 version', '> 1%', 'ie >= 8']))
  .pipe(changed(css))
  // .pipe(sourcemaps.write())
  .pipe(sourcemaps.write('.maps'))
  // .pipe(rename(function(path) {
  //   path.dirname += "/../css";
  // }))
  .pipe(gulp.dest('dest/css/'))
  .pipe(using())
  .pipe(browserSync.reload({stream: true }));
});

// slim task
gulp.task('slim', function () {
  var slimEnd = false;
  return gulp.src([src+'slim/*.slim']) // src+'*.slim', // pas de fichier sur :root
  .pipe(plumber())
  .pipe(slim( {pretty: true, indent: '4' })) // {read:false},
  .pipe(changed('HTML/dest/'))
  .pipe(using())
  .pipe(gulp.dest('dest/')) // slim folder
  // .on('end', browserSync.reload)
  .on('end',function () {
    slimEnd = true;
    premailergo(slimEnd);
  })
  // .pipe(rename(function(path) {
  //   path.dirname += "/../";
  // }))
  // .pipe(gulp.dest('render')) // html folder
  .pipe(browserSync.reload({
    stream: true
  }))
});

function premailergo (slimEnd) {
  console.log('slimeEnd: '+slimEnd);
};

gulp.task('dev',['browserSync','images','slim','sass'], function() {
  // gulp.watch(src+'slim/*.slim',['browserSync','slim','images']);
  gulp.watch(src+'scss/*.scss',['slim','sass','images']);
  gulp.watch(src+'slim/*.slim',['slim','images']);
  gulp.watch(src+'slim/partial/*.slim',['slim','images']);
  // gulp.start('build');
});

// prod

// replace ../images/src/ (css) & images/src/blabla (html)
gulp.task('replaceSrc', function(){
  // cp dest/imgs/* in build/
  gulp.src(['dest/images/imgZL/*.{png,jpg,gif,svg}'])
    .pipe(gulp.dest('build/'))
    .pipe(using())
    .on('end', function() {
      gulp.src('build/*')
      .pipe(zip('archive.zip'))
      .pipe(gulp.dest('build/'));
      console.log('archive OK')
    });

  // cp dest/index.html in build/ + regex to replace src path
  gulp.src(['dest/index.html'])
    .pipe(replace('images/imgZL/', ''))
    .pipe(gulp.dest('build/'))
    .pipe(using());
  // cp dest/styleZL.html in build/ + regex to replace src path
  gulp.src(['dest/css/styleZoneLibre.css'])
    // change src
    .pipe(replace('../images/imgZL/', ''))
    // del css map
    .pipe(replace(/\/\*.+?\*\//, '/* end of zoneLibre css */'))
    // del CR
    // .pipe(replace(/(^\n)/, ''))
    // .pipe(replace(/(.+)\n/, '$1'))
    // .pipe(replace(/\n\n/, ''))
    // .pipe(replace(/([\n]{2}|[\r]{2})(\n|)/, ''))
    // .pipe(replace(/\n\n|\r\r/, '<CR>'))
    // .pipe(replace(/^(?:[\t ]*(?:\r?\n|\r))+/, ''))
    .pipe(rename("index.css"))
    .pipe(gulp.dest('build/'))
    .pipe(using())
    .on('end',function () {
      replaceBool = true;
      replaceEnd(replaceBool);
      gulp.start('html');
    });
});

function replaceEnd (replaceBool) {
  console.log('replaceBool: '+replaceBool);
};

// with cheerio & request on www
// @see https://www.digitalocean.com/community/tutorials/how-to-use-node-js-request-and-cheerio-to-set-up-simple-web-scraping
gulp.task('htmlOnWeb', function() {
  // var request = require('request');
  // var cheerio = require('cheerio');
  request('https://www.tempsl.fr', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      // all html code
      // regex remplacement des src rel par abs
      html = html.replace(/(src=\"|link=\"|href=\"|src=')(\/)([^\.])/g,"$1http://www.tempsl.fr/$3");
      // regex remplacement iso by UTF-8
      html = html.replace(/<meta content=\"text\/html; charset=ISO-8859-1\" \/>/,"<meta http-equiv=\"Content-Type\" content=\"text/html;charset=UTF-8\" />");
      // regex replace 
      // html = html.replace(/src='/,"");
      console.log(html);
      fs.writeFile("dest/index_cheerio.html", html, function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
      // jQuery selector
      // var $ = cheerio.load(html);
      // $('.centralEvent').each(function(i, element){
        // var a = $(this).prev(); // affiche style de centralEvent
        // console.log(a.text()); // en txt
      
      // $('.centralEvent').each(function(i, element){
      //   var a = $(this).parent();
      //   console.log(a.html());
      // });
    }
  });
});
// static
// @see http://maxogden.com/scraping-with-node.html
gulp.task('html', function() {
  // extraction ecriture build/index.html
  // var fs = require('fs')
  var $ = require('cheerio')

  var htmlString = fs.readFileSync('build/index.html').toString()
  var parsedHTML = $.load(htmlString)

  // query for all elements with class 'foo' and loop over them
  parsedHTML('.zoneLibre').map(function(i, zoneL) {
    // the zoneL html element into a cheerio object (same pattern as jQuery)
    zoneL = $(zoneL)
    console.log(zoneL.html());
    fs.writeFile("build/index.html", zoneL.html(), function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  });
  gulp.src('build/index.html')
  .pipe(prettify({indent_car:'', indent_size: 2}))
  .pipe(gulp.dest('./build/'))

});

gulp.task('build',['replaceSrc']);
