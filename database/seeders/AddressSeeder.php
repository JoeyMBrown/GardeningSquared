<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Address;
use App\Models\User;

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the system user
        $systemUser = User::where('email', 'system@gardeningsquared.com')->first();

        // Create 50 addresses
        Address::factory(50)->create();

        // Randomly select 5 addresses to associate with the system user
        $randomAddressIds = Address::inRandomOrder()
            ->limit(5)
            ->pluck('id');

        // Attach the addresses to the system user through the pivot table
        $systemUser->addresses()->attach($randomAddressIds);
    }
}
