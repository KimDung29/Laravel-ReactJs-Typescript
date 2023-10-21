<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware(['auth:sanctum'])->group(function () {
    // For both of admin and client
	Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/user/{id}', [UserController::class, 'getUser']);

    // Admin routes
    Route::get('/admin-products', [ProductController::class,'getProducts'])->middleware('isAdmin');
    Route::get('/admin-product/{id}', [ProductController::class,'getProduct'])->middleware('isAdmin');
    Route::post('/admin-product/add', [ProductController::class,'addProduct'])->middleware('isAdmin');
    Route::post('/admin-product/update', [ProductController::class,'updateProduct'])->middleware('isAdmin');
    Route::delete('/admin-product/{id}', [ProductController::class,'deleteProduct'])->middleware('isAdmin');


    // Client routes
    Route::get('/products', [ClientController::class, 'getProducts'])->middleware('isClient');
});
        


Route::post('/register', [UserController::class, 'register']);

Route::post('/login', [UserController::class, 'login']);

