<?php

use App\Http\Controllers\ApiController;
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
Route::post('/register', [ApiController::class, 'register']);

Route::post('/login', [ApiController::class, 'login']);


Route::middleware(['auth:sanctum'])->group(function () {
    // For both of admin and client
	Route::post('/logout', [ApiController::class, 'logout']);
    Route::get('/user/{id}', [ApiController::class, 'getUser']);

    // Admin routes 
    // Get all products of themselves
    Route::get('/admin-products', [ProductController::class,'index'])->middleware('isAdmin');
    // Get a single product
    Route::get('/admin-product/{id}', [ProductController::class,'show'])->middleware('isAdmin');
    // Add product
    Route::post('/admin-product/add', [ProductController::class,'store'])->middleware('isAdmin');

    // Update product
    Route::put('/admin-product/update/{id}', [ProductController::class,'update'])->middleware('isAdmin');

    // Delete product
    Route::delete('/admin-product/{id}', [ProductController::class,'destroy'])->middleware('isAdmin');


    // Client routes
    // Route::get('/products', [ClientController::class, 'getProducts'])->middleware('isClient');
});
        



