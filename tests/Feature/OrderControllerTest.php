<?php

namespace Tests\Feature\API;

use Tests\TestCase;


class OrderControllerTest extends TestCase
{


    /**
     * Test retrieving orders via API.
     *
     * @return void
     */
    public function testOrderIndex()
    {
        $response = $this->getJson('/api/orders');
    
        $response->assertStatus(200);
        // Add more assertions as needed to test the response data, headers, etc.
    }
}
