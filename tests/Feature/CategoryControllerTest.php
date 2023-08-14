<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use App\Models\Category;

class CategoryControllerTest extends TestCase
{
    /**
    
     *
     * @return void
     */
    public function testCategoryDestroy()
    {
        
        $category = Category::first();

        
        $this->assertNotNull($category);

        
        $response = $this->deleteJson('/api/category/' . $category->id);
        $response->assertStatus(200);

        
        $this->assertDatabaseMissing('categories', [
            'id' => $category->id,
        ]);
    }
}
