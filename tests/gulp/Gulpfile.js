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

gulp.task('link', ['unlink'], function() {
    var nopt = require('nopt');
    var args = nopt({'app': String});
    var app = args.app || 'basic';
    var appPath = path.join('..', 'GoogleChromeSamples', 'service-worker', app);
    if (!fs.existsSync(appPath)) {
        console.error('App "' + app + '" not found in ../samples/service-worker/');
        return;
    }
    fs.symlinkSync(appPath, 'app');
});

/******************************************************************************/

gulp.task('unlink', function() {
    if (!fs.existsSync('app'))
        return;
    var stats = fs.lstatSync('app');
    if (!stats.isSymbolicLink()) {
        console.error('./app is not a symlink');
        return;
    }
    fs.unlinkSync('app');
});

/******************************************************************************/

gulp.task('createios', ['clean'], function() {
    // Project definitions
    fs.mkdirSync('build');

    var sw2cdv = require('sw2cdv');
    return sw2cdv.create.ios({
        www: path.resolve('app'),
        root: path.resolve('build', 'ios'),
    });
});

gulp.task('buildios', [], function() {
    var sw2cdv = require('sw2cdv');
    return sw2cdv.build.ios(path.resolve('build', 'ios'));
});

gulp.task('runios', function() {
    var sw2cdv = require('sw2cdv');
    return sw2cdv.run.ios(path.resolve('build', 'ios'));
});

gulp.task('ios', function() {
    return runSeq('createios', 'buildios', 'runios');
});

/******************************************************************************/

gulp.task('default', ['runInChrome'], function() {
});

