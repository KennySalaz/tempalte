<?php

use App\Http\Controllers\TableUserController;
use Illuminate\Support\Facades\Route;

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

// Example Routes
Route::view('/', 'landing');
Route::match(['get', 'post'], '/dashboard', function () {
    return view('dashboard');
});
Route::view('/pages/slick', 'pages.slick');
Route::view('/pages/datatables', 'pages.datatables');
Route::view('/pages/blank', 'pages.blank');
Route::get('tabla/registar', [TableUserController::class, 'create'])->name('tablet.user');
Route::post('tabla/guardar', [TableUserController::class, 'store'])->name('tablet.store');
Route::get('tabla/guardar', [TableUserController::class, 'index'])->name('tablet.listUser');
