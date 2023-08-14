<?php

namespace Tests\Feature\API;

use App\Models\News;

use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class NewsControllerTest extends TestCase
{

    public function testStore()
    {
        $data = [
            'title' => 'GRUPI I 7',
            'content' => 'This is a test news.',
            'published_at' => '2023-05-26 10:00:00',
        ];

        // Make a POST request to the news store endpoint
        $response = $this->post('/api/news', $data);

        // Assert that the response status code is 200
        $response->assertStatus(200);

        // Assert the response JSON
        $response->assertJson([
            'message' => 'News was created successfully.',
        ]);

        // Assert that the news was created in the database
        $this->assertDatabaseHas('news', $data);
    }

}
