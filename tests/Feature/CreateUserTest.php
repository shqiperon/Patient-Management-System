<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class CreateUserTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_be_created_and_saved()
    {
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
        ]);
    }
}
