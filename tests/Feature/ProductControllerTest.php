<?php

namespace Tests\Feature\API;

use App\Models\Product;
use Tests\TestCase;

class ProductControllerTest extends TestCase
{
    /**
     * Test fetching and updating a product.
     *
     * @return void
     */
    public function testProductUpdate()
    {
        // Create a product or retrieve an existing one
        $product = Product::first();

        if (!$product) {
            // Product doesn't exist, so create a new one
            $product = Product::create([
                'name' => 'Example Product',
                'category' => 'Example Category',
                'price' => 9.99,
                'qty' => 5,
            ]);
        }

        $response = $this->get('/api/products/' . $product->id);
        $response->assertStatus(200);

        $response->assertJson([
            'product' => [
                'name' => $product->name,
                'category' => $product->category,
                'price' => $product->price,
                'qty' => $product->qty,
            ],
        ]);

        $updateResponse = $this->put('/api/products/' . $product->id, [
            'name' => 'Updated Product Name',
            'category' => 'Updated Category',
            'price' => 19.99,
            'qty' => 10,
        ]);

        $updateResponse->assertStatus(200);

        $product->refresh();

        $this->assertEquals('Updated Product Name', $product->name);
        $this->assertEquals('Updated Category', $product->category);
        $this->assertEquals(19.99, $product->price);
        $this->assertEquals(10, $product->qty);
    }
}
