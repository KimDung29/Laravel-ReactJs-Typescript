<?php 
namespace App\Services;

use App\Models\Product;
use Exception;

class ProductService
{
    public function addProduct(array $data)
    {
        try {
            Product::create([
				'user_id' => $data['user_id'],
				'name' => $data['name'],
				'short_desc' => $data['short_desc'],
				'long_desc' => $data['long_desc'],
				'image' => $data['image'],
				'price' => $data['price'],
				'color' => $data['color'],
				'size' => $data['size'],
				'quantity' => $data['quantity'],
            ]);    
         
            return true;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function updateProduct(array $data)
    {
        try {
            Product::updated([
				'user_id' => $data['user_id'],
				'name' => $data['name'],
				'short_desc' => $data['short_desc'],
				'long_desc' => $data['long_desc'],
				'image' => $data['image'],
				'price' => $data['price'],
				'color' => $data['color'],
				'size' => $data['size'],
				'quantity' => $data['quantity'],
            ]);    
         
            return true;
        } catch (Exception $e) {
            throw $e;
        }
    }
}
