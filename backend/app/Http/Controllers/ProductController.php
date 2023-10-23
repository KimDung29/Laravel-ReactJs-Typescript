<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $service;
    private $productService;
    public function __construct(ProductService $productService) {
        $this->productService = $productService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // To get id from header of the request
        $adminId = $request->header('X-Id'); 
        // To find product of adminId theirself
        $products = Product::where('user_id', $adminId )->get();
        // To control which properties will be send to client
        return response()->json(['products' => ProductResource::collection($products)]);
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            // Store the image image into 'images' folder inside storage/app/public
            $imagePath = $image->store('images', 'public');
            // Store the path to database (at image column)
            $data['image'] = $imagePath; 
        }

        if ($this->productService->addProduct($data)) {
            return response()->json(['message' => 'Created successfully'], 201);
        } else {
            return response()->json(['message' => 'Failed to create user'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $product = Product::find($id);

        return response()->json(['product' => new ProductResource($product)]);

    }


    /**
     * Update the specified resource in storage.
     */
    // FIXME: can not get value from $request of Request or UpdateProductRequest
    public function update(UpdateProductRequest $request , Product $product)
    {

        // $data = $request->validated();
        // $product = Product::find($id);

        // $product->update($data);

        // return new ProductResource($product);
        return response()->json('update product');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        $product->delete();
        return response("", 204);
    }
}
