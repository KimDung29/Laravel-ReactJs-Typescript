<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function getProducts( Request $request) {
        $products = Product::all();

        return ProductResource::collection($products);
    }
}
