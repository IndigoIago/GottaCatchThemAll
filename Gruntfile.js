module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {

      options: {
        separator: ';'
      },
      dist: {
        src: [],
        dest: ''
      }
          },

    nodemon: {
      dev: {
        script: ''
      }
    },

    uglify: {

      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
          },

    jshint: {
      files: [

        'Gruntfile.js'
      ],

      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          '',
          ''
        ]
      }
    },

    watch: {
      scripts: {
        files: [
          
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [

    'jshint'
  ]);

  grunt.registerTask('build', [

    'concat',
    'uglify'
  ]);


  grunt.registerTask('deploy', [
    'test',
    'build'
  ]);


};