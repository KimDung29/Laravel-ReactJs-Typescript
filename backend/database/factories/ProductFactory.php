<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        
        return [
            'user_id' => 31, 
            'name' => $this->faker->word,
            'short_desc' => $this->faker->sentence,
            'long_desc' => $this->faker->paragraph,
            'image' =>'image_path', 
            'price' => $this->faker->randomFloat(2, 10, 1000), 
            'color' => $this->faker->colorName,
            'size' => $this->faker->randomElement(['Small2', 'Medium2', 'Large2']),
            'quantity' => $this->faker->numberBetween(1, 100),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
