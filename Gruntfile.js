module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            main: {
                src: [
                    'bower_components/jquery.easing/js/jquery.easing.js',
                    'js/plugins/*.js',
                    'js/<%= pkg.name %>.js'
                ],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            main: {
                src: 'dist/js/<%= pkg.name %>.js',
                dest: 'dist/js/<%= pkg.name %>.min.js'
            }
        },
        copy: {
            main: {
                src: ['*.html', 'less/**'],
                dest: 'dist/'
            },
            images: {
                expand: true,
                cwd: 'img/compressed',
                src: [
                    "*.*"
                ],
                dest: 'dist/img/'
            },
            fonts: {
                src: ['font/**'],
                dest: 'dist/css/'
            },
            jquery: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/jquery/dist/',
                    src: [
                        'jquery.js',
                        'jquery.min.js'
                    ],
                    dest: 'dist/js/'
                }]
            },
            bootstrap: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/',
                    src: [
                        'css/bootstrap.css',
                        'css/bootstrap.min.css',
                        'js/bootstrap.js',
                        'js/bootstrap.min.js'
                    ],
                    dest: 'dist/'
                }]
            },
            production: {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: [
                        'css/*.min.css',
                        'js/*.min.js',
                        'img/*',
                        'index.html'
                    ],
                    dest: grunt.option("prod")
                }]
            }
        },
        chown: {
            options: {
                uid: 33,
                gid: 33
            },
            target: {
                src: [grunt.option("prod") + '/**']
            }
        },
        less: {
            expanded: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "dist/css/<%= pkg.name %>.css": "less/<%= pkg.name %>.less"
                }
            },
            minified: {
                options: {
                    paths: ["css"],
                    cleancss: true
                },
                files: {
                    "dist/css/<%= pkg.name %>.min.css": "less/<%= pkg.name %>.less"
                }
            }
        },

        banner: '/*!\n' +
        ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
        ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' */\n',

        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: ['dist/css/<%= pkg.name %>.css', 'dist/css/<%= pkg.name %>.min.css', 'dist/js/<%= pkg.name %>.js', 'dist/js/<%= pkg.name %>.min.js']
                }
            }
        },
        watch: {
            copy: {
                files: ['*.html', 'mail/**', 'img/**', 'less/**'],
                tasks: ['copy'],
                options: {
                    spawn: false
                }
            },
            less: {
                files: ['less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            }
        },
        imagemin: {
            jpg: {
                options: {
                    progressive: true
                },
                files: [
                    {
                        // Set to true to enable the following options…
                        expand: true,
                        // cwd is 'current working directory'
                        cwd: 'img/',
                        src: ['*.*'],
                        // Could also match cwd. i.e. project-directory/img/
                        dest: 'img/compressed/'
                    }
                ]
            }
        },
        template: {
            main: {
                options: {
                    data: {
                        'year': new Date().getYear()
                    }
                }
            }
        }
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-chown');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-template');

    // Default task(s).
    grunt.registerTask('win', ['concat', 'uglify', 'copy:main', 'copy:images', 'copy:bootstrap', 'copy:jquery', 'copy:fonts', 'less', 'usebanner']);
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'copy:main', 'copy:images', 'copy:bootstrap', 'copy:fonts', 'copy:jquery', 'less', 'usebanner']);
    grunt.registerTask('production', ['concat', 'uglify', 'copy:main', 'copy:bootstrap', 'copy:jquery', 'less', 'copy:fonts', 'usebanner', 'copy:production', 'chown']);

};
