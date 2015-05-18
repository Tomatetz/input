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
                    port: 9001,
                    server: 'server'
                }
            }
        },
        connect: {
            server: {
                options: {
                    index: 'index.html',
                    port: 9001
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'scripts/jquery.min.js': ['./bower_components/jquery/dist/jquery.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('myServer', ['express', 'express-keepalive']);

    grunt.registerTask('default',[]);

};