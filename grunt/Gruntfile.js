module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                // 定义一个用于插入合并输出文件之间的字符
                separator: ';'
            },
            dist: {
                // 将要被合并的文件
                src: ['src/**/*.js'],
                // 合并后的JS文件的存放位置
                dest: 'build/<%= pkg.name %>.js'
            }
        },

        // uglify插件，它的作用是压缩（minify）JavaScript文件
        uglify: {
            options: {
                // 此处定义的banner注释将插入到输出文件的顶部
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>-v<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        // uglify: {
        //     options: {
        //         banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
        //     },
        //     build: {
        //         src: 'src/test.js',
        //         dest: 'build/<%= pkg.name %>-v<%= pkg.version %>.js.min.js'
        //     }
        // },
        jshint: {
            // define the files to lint
            files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                jshintrc: '.jshintrc',
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        // jshint: {
        //     build: ['Gruntfile.js', 'src/*.js'],
        //     options: {
        //         jshintrc: '.jshintrc'
        //     }
        // }
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'qunit']
        }

    });


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // grunt.loadNpmTasks('grunt-contrib-uglify');

    // grunt.loadNpmTasks('grunt-contrib-jshint');

    // 在命令行上输入"grunt test"，test task就会被执行。
    grunt.registerTask('test', ['jshint', 'qunit']);

    // grunt.registerTask('default', ['jshint', 'uglify']);

    // 只需在命令行上输入"grunt"，就会执行default task
    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};