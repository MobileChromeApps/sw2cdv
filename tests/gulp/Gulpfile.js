'use strict';

/******************************************************************************/

var gulp = require('gulp');
var path = require('path');
var del = require('del');

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

gulp.task('buildios', ['clean'], function() {
    var nopt = require('nopt');
    var args = nopt({'app': String})
    var app = args.app || 'basic';

    // Project definitions
    var prjInfo = {
        paths: {
            www: path.resolve('../samples/service-worker/', app),  // looking staring at
            root: path.resolve('build'),
        },
        appName: 'HelloSwApp',
        swFile: 'service-worker.js',  // Not yet plumbed through, must be service-worker.js
    };

    var sw2cdv = require('../../main');
    return sw2cdv.build(prjInfo).done();
});
