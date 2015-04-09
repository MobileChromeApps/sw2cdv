'use strict';

/******************************************************************************/

var gulp = require('gulp');
var path = require('path');
var del = require('del');
var fs = require('fs');
var runSeq = require('run-sequence');

/******************************************************************************/

gulp.task('runInChrome', function() {
    require('sw2cdv').run.chrome('./app');
});

/******************************************************************************/

gulp.task('clean', function(cb) {
    del(['build'], cb);
});

/******************************************************************************/

gulp.task('check-app-exists', function() {
    if (!fs.existsSync('app')) {
        throw new Error('Please create an app/ folder.');
    }
});

/******************************************************************************/

gulp.task('check-build-exists', function() {
    if (!fs.existsSync('build')) {
        throw new Error('Please create a cordova project first.');
    }
});

/******************************************************************************/

gulp.task('createios', ['clean', 'check-app-exists'], function() {
    var sw2cdv = require('sw2cdv');
    return sw2cdv.create.ios({
        src: path.resolve('app'),
        dest: path.resolve('build', 'ios'),
        platform: path.resolve('node_modules', 'cordova-ios'),
        plugins: [
            path.resolve('node_modules', 'cordova-plugin-device'),
        ]
    });
});

gulp.task('buildios', ['check-build-exists'], function() {
    var sw2cdv = require('sw2cdv');
    return sw2cdv.build.ios(path.resolve('build', 'ios'));
});

gulp.task('runios', ['check-build-exists'], function() {
    var sw2cdv = require('sw2cdv');
    return sw2cdv.run.ios(path.resolve('build', 'ios'));
});

gulp.task('ios', function() {
    return runSeq('createios', 'buildios', 'runios');
});

/******************************************************************************/

gulp.task('createandroid', ['clean', 'check-app-exists'], function() {
    var sw2cdv = require('sw2cdv');
    return sw2cdv.create.android({
        src: path.resolve('app'),
        dest: path.resolve('build', 'android'),
        platform: path.resolve('node_modules', 'cordova-android'),
        plugins: [
            path.resolve('node_modules', 'cordova-plugin-device')
        ]
    });
});

gulp.task('buildandroid', ['check-build-exists'], function() {
    var sw2cdv = require('sw2cdv');
    return sw2cdv.build.android(path.resolve('build', 'android'));
});

gulp.task('runandroid', ['check-build-exists'], function() {
    var sw2cdv = require('sw2cdv');
    return sw2cdv.run.android(path.resolve('build', 'android'));
});

gulp.task('android', function() {
    return runSeq('createandroid', 'buildandroid', 'runandroid');
});


/******************************************************************************/

gulp.task('default', ['runInChrome'], function() {
});

