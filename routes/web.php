<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();
Route::get('/user', 'UserController@index');
Route::put('/user/{user}', 'UserController@update');

Route::apiResource('weights', 'WeightController');
 
Route::get('/{any}', 'HomeController@index');
