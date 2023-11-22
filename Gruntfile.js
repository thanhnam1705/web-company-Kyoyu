module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //task
    pug: {
      compile: {
        options: {
          data: {
            debug: true
          },
          pretty: true
        },
        files: [{
          cwd: 'assets/pug/',
          src: ['**/*.pug', '!_*/*.pug'],
          dest: './',
          expand: true,
          ext: '.html'
        }]
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/sass/',
          src: ['*.sass'],
          dest: './css/',
          ext: '.css'
        }]
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'assets/js/',
        src: '*.js',
        dest: './js/',
        ext: '.js'
      },
    },
    jshint: {
      all: ['assets/js/main.js']
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            './css/*.css',
            './**/*.html',
            './js/*.js',
          ]
        },
        options: {
          watchTask: true,
          server: './'
        }
      }
    },
    watch: {
      html: {
        files: 'assets/pug/**/*.pug',
        tasks: ['pug'],
        options: {
          livereload: true,
        },
      },
      css: {
        files: 'assets/sass/**/*.sass',
        tasks: ['sass'],
        options: {
          livereload: true,
        },
      },
      js: {
        files: ['assets/js/**/*.js'],
        tasks: ['copy'],
        options: {
          livereload: true,
        },
      },
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default task(s).
  grunt.registerTask('default', ['pug', 'sass', 'copy', 'browserSync', 'watch'])

};