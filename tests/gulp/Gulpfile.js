'use strict';

/******************************************************************************/

var gulp = require('gulp');
var path = require('path');
var del = require('del');
var fs = require('fs');

/******************************************************************************/

gulp.task('runInChrome', function() {
    require('sw2cdv').run.chrome('./app');
});

/******************************************************************************/

gulp.task('default', ['runInChrome'], function() {
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
    var appPath = path.join('..', 'samples', 'service-worker', app);
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

gulp.task('buildios', ['clean'], function() {
    // Project definitions
    if (!fs.existsSync('build')){
        fs.mkdirSync('build');
    }

    var prjInfo = {
        paths: {
            www: path.resolve('app'),
            root: path.resolve('build', 'ios'),
        },
        appName: 'HelloSwApp',
        swFile: 'service-worker.js',  // Not yet plumbed through, must be service-worker.js
    };

    var sw2cdv = require('sw2cdv');
    return sw2cdv.build(prjInfo).done();
});

/******************************************************************************/

gulp.task('runios', function() {
    var sw2cdv = require('sw2cdv');
    return sw2cdv.run.ios(path.resolve('build', 'ios'));
});
