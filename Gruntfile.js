module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                files: {
                    "styles/main.min.css": "styles/main.less"
                },
                options: {
                   /* compress: true,
                    optimization: 2*/
                }
            }
        },
        express: {
            custom: {
                options: {
                    port: 5001,
                    server: 'server'
                }
            }
        },
        connect: {
            server: {
                options: {
                    index: 'index.html',
                    port: 5001
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'scripts/minimized.js': ['./scripts/commons.js','./scripts/dictionary.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('myServer', ['express', 'express-keepalive']);

    grunt.registerTask('default',['less','uglify']);

};