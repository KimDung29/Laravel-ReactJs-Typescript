<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class GuestController extends Controller
{
    public function getProducts(Request $request)
    {
        // To find product of adminId theirself
        $products = Product::all();
        // To control which properties will be send to client
        return response()->json(['products' => ProductResource::collection($products)]);
        
    }
}
