<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SystemUserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'SYSTEM',
            'email' => 'system@gardeningsquared.com',
            'password' => Hash::make('admin'),
            'email_verified_at' => now(),
        ]);
    }
} 