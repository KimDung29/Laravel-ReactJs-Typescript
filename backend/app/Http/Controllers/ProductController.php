<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getProducts(Request $request){
        // To get id from header of the request
        $adminId = $request->header('X-Id'); 
        // To find product of adminId theirself
        $products = Product::where('user_id', $adminId )->get();
       // To control which properties will be send to client
        return response()->json(['products' => ProductResource::collection($products)]);
    }

    public function getProduct($id){
        $product = Product::find($id);

        return response()->json(['product' => new ProductResource($product)]);
    }

    public function addProduct($id, Request $request){
    }
    public function updateProduct(Request $request, $id){ 

    }

    public function deleteProduct($id){

        $product = Product::find($id);
        $product->delete();
        return response("", 204);
    }
}
