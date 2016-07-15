module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            jade: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['models/*.js', 'schemas/*.js', '*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }
        },

        jshint: {
          options: {
            jshintrc: '.jshintrc',
            ignores: ['node_modules/**/*.js']
          },
          all: ['models/*.js', 'schemas/*.js', '*.js']
        },

       
        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },

        // mochaTest: {
        //   options: {
        //     reporter: 'spec'
        //   },
        //   src: ['test/**/*.js']
        // },

        concurrent: {
            // tasks: ['nodemon', 'watch'],
            tasks: ['nodemon', 'watch', 'jshint'],
            options: {
                logConcurrentOutput: true
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-nodemon') //实时监听app.js
    grunt.loadNpmTasks('grunt-concurrent') //慢任务监听less、sass
        // grunt.loadNpmTasks('grunt-mocha-test')
    // grunt.loadNpmTasks('grunt-contrib-less')
    // grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-jshint')

    grunt.option('force', true) //防止语法错误中断整个程序

    grunt.registerTask('default', ['concurrent']) //注册任务

    // grunt.registerTask('test', ['mochaTest'])
}