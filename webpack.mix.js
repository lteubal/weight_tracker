const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js(['resources/js/app.js', 'resources/js/main.js'], 'public/js')
  .copyDirectory('resources/images', 'public/images', false)
  .sass('resources/sass/app.scss', 'public/css')
  .sass('resources/sass/default.scss', 'public/css/appsaas.css');