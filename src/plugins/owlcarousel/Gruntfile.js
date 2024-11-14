/**
 * Owl Carousel
 *
 * Bartosz Wojciechowski
 *
 * Copyright (c) 2014
 * Licensed under the MIT license.
 */
module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt
		.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			app: grunt.file.readJSON('_config.json'),
			banner: '/**\n' + ' * Owl Carousel v<%= pkg.version %>\n'
				+ ' * Copyright 2013-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n'
				+ ' * Licensed under: <%= pkg.license %>\n' + ' */\n',

			// assemble
			assemble: {
				options: {
					flatten: false,
					expand: true,
					production: false,
					assets: '<%= app.docs.html.dest %>/assets',
					postprocess: require('pretty'),

					// metadata
					pkg: '<%= pkg %>',
					app: '<%= app %>',
					data: [ '<%= app.docs.html.src %>/data/*.{json,yml}' ],

					// templates
					partials: '<%= app.docs.html.templates %>/partials/*.hbs',
					layoutdir: '<%= app.docs.html.layouts %>/',

					// extensions
					helpers: '<%= app.docs.html.src %>/helpers/*.js'
				},
				index: {
					options: {
						layout: 'home.hbs'
					},
					files: [ {
						expand: true,
						cwd: '<%= app.docs.html.pages %>/',
						src: '*.hbs',
						dest: '<%= app.docs.html.dest %>/'
					} ]
				},
				demos: {
					options: {
						layout: 'demos.hbs'
					},
					files: [ {
						expand: true,
						cwd: '<%= app.docs.html.pages %>/demos/',
						src: '*.hbs',
						dest: '<%= app.docs.html.dest %>/demos'
					} ]
				},
				docs.html: {
					options: {
						layout: 'docs.html.hbs'
					},
					files: [ {
						expand: true,
						cwd: '<%= app.docs.html.pages %>/docs.html/',
						src: '*.hbs',
						dest: '<%= app.docs.html.dest %>/docs.html'
					} ]
				}
			},

			// clean
			clean: {
				docs.html: [ '<%= app.docs.html.dest %>' ],
				dist: [ 'dist' ]
			},

			// sass
			sass: {
				docs.html: {
					options: {
						outputStyle: 'compressed',
						includePaths: [ '<%= app.docs.html.src %>/assets/scss/', 'node_modules/foundation-sites/scss' ]
					},
					files: {
						'<%= app.docs.html.dest %>/assets/css/docs.html.theme.min.css': '<%= app.docs.html.src %>/assets/scss/docs.html.theme.scss'
					}
				},
				dist: {
					options: {
						outputStyle: 'nested'
					},
					files: {
						'dist/assets/<%= pkg.name %>.css': 'src/scss/<%= pkg.name %>.scss',
						'dist/assets/owl.theme.default.css': 'src/scss/owl.theme.default.scss',
						'dist/assets/owl.theme.green.css': 'src/scss/owl.theme.green.scss'
					}
				}
			},

			autoprefixer: {
				options: {
					browsers: [ 'last 2 versions', 'ie 7', 'ie 8', 'ie 9', 'ie 10', 'ie 11' ]
				},
				dist: {
					files: {
						'dist/assets/<%= pkg.name %>.css': 'dist/assets/<%= pkg.name %>.css',
						'dist/assets/owl.theme.default.css': 'dist/assets/owl.theme.default.css',
						'dist/assets/owl.theme.green.css': 'dist/assets/owl.theme.green.css'
					}
				}
			},

			concat: {
				dist: {
					files: {
						'dist/<%= pkg.name %>.js': '<%= app.src.scripts %>'
					}
				}
			},

			cssmin: {
				dist: {
					files: {
						'dist/assets/<%= pkg.name %>.min.css': 'dist/assets/<%= pkg.name %>.css',
						'dist/assets/owl.theme.default.min.css': 'dist/assets/owl.theme.default.css',
						'dist/assets/owl.theme.green.min.css': 'dist/assets/owl.theme.green.css'
					}
				}
			},

			jshint: {
				options: {
					jshintrc: 'src/js/.jshintrc'
				},
				dist: {
					src: [ '<%= app.src.scripts %>', 'Gruntfile.js' ]
				}
			},

			qunit: {
				options: {
					timeout: 10000
				},
				dist: [ 'test/index.html' ]
			},

			jscs: {
				options: {
					config: 'src/js/.jscsrc',
					reporter: 'text.js',
					reporterOutput: 'jscs.report.txt'
				},
				dist: {
					src: [ '<%= app.src.scripts %>', 'Gruntfile.js' ]
				}
			},

			usebanner: {
				dist: {
					options: {
						banner: '<%= banner %>',
						linebreak: false
					},
					files: {
						src: [
							'dist/<%= pkg.name %>.js',
							'dist/assets/*.css'
						]
					}
				}
			},

			uglify: {
				options: {
					banner: '<%= banner %>'
				},
				dist: {
					files: {
						'dist/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.js'
					}
				}
			},

			// copy
			copy: {
				distImages: {
					expand: true,
					flatten: true,
					cwd: 'src/',
					src: [ 'img/*.*' ],
					dest: 'dist/assets'
				},

				distTodocs.html: {
					expand: true,
					cwd: 'dist/',
					src: [ '**/*.*' ],
					dest: '<%= app.docs.html.dest %>/assets/owlcarousel'
				},

				srcTodocs.html: {
					expand: true,
					cwd: 'src/js',
					src: [ '**/*.js' ],
					dest: '<%= app.docs.html.dest %>/assets/owlcarousel/src'
				},

				docs.htmlAssets: {
					expand: true,
					cwd: '<%= app.docs.html.src %>/assets/',
					src: [ 'css/*.css', 'vendors/*.js', 'vendors/*.map', 'img/*.*', 'js/*.*' ],
					dest: '<%= app.docs.html.dest %>/assets/'
				},

				readme: {
					files: [ {
						'dist/LICENSE': 'LICENSE',
						'dist/README.md': 'README.md'
					} ]
				}
			},

			// connect
			connect: {
				options: {
					port: 9600,
					open: true,
					livereload: true,
					hostname: 'localhost'
				},
				docs.html: {
					options: {
						base: "<%= app.docs.html.dest %>"
					}
				}
			},

			// watch
			watch: {
				options: {
					livereload: true
				},
				templatesdocs.html: {
					files: [ '<%= app.docs.html.templates %>/**/*.hbs' ],
					tasks: [ 'assemble' ]
				},
				sassdocs.html: {
					files: [ '<%= app.docs.html.src %>/assets/**/*.scss' ],
					tasks: [ 'sass:docs.html' ]
				},
				sass: {
					files: [ 'src/**/*.scss' ],
					tasks: [ 'sass:dist', 'cssmin:dist', 'usebanner:dist', 'copy:distTodocs.html' ]
				},
				jsdocs.html: {
					files: [ '<%= app.docs.html.src %>/assets/**/*.js' ],
					tasks: [ 'copy:docs.htmlAssets' ]
				},
				js: {
					files: [ 'src/**/*.js' ],
					tasks: [ 'jscs:dist', 'jshint:dist', 'qunit:dist', 'concat:dist', 'uglify:dist', 'usebanner:dist', 'copy:distTodocs.html', 'copy:srcTodocs.html' ]
				},
				helpersdocs.html: {
					files: [ '<%= app.docs.html.src %>/helpers/*.js' ],
					tasks: [ 'assemble' ]
				},
				test: {
					files: [ 'test/*.html', 'test/unit/*.js' ],
					tasks: [ 'qunit:dist' ]
				}
			},

			// compress zip
			compress: {
				zip: {
					options: {
						archive: 'docs.html/download/owl.carousel.<%= pkg.version %>.zip'
					},
					files: [ {
						expand: true,
						cwd: 'dist/',
						src: [ '**' ],
						dest: 'owl.carousel.<%= pkg.version %>'
					} ]
				}
			},

			// publish to github pages
			'gh-pages': {
				options: {
					base: 'docs.html'
				},
				src: '**/*'
			}
		});

	grunt.loadNpmTasks('assemble');

	// tasks
	grunt.registerTask('dist', [ 'clean:dist', 'sass:dist', 'autoprefixer', 'concat:dist', 'cssmin:dist', 'copy:distImages', 'usebanner:dist', 'uglify:dist', 'copy:readme' ]);

	grunt.registerTask('docs.html', [ 'dist', 'clean:docs.html', 'assemble', 'sass:docs.html', 'copy:docs.htmlAssets', 'copy:distTodocs.html', 'zip' ]);

	grunt.registerTask('test', [ 'jshint:dist', 'qunit:dist', 'jscs:dist' ]);

	grunt.registerTask('default', [ 'dist', 'docs.html', 'test' ]);

	grunt.registerTask('serve', [ 'connect:docs.html', 'watch' ]);

	grunt.registerTask('zip', [ 'compress' ]);

	grunt.registerTask('deploy', [ 'docs.html', 'gh-pages' ]);

};
