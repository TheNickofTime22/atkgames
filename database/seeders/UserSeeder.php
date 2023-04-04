<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Nick',
            'screenname' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => 'password',

        ]);
        User::factory()->count(10)->create();


    }
}
