<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'short_desc' => 'required|string|max:255',
            'long_desc' => 'required|string',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048', 
            'price' => 'required|string',
            'color' => 'required|string|max:255',
            'size' => 'required|string|max:255',
            'quantity' => 'required|string',
        ];
    }
}
