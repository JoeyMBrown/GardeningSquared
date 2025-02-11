<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Address;

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 10; $i++) {
            Address::create([
                'street_address' => fake()->streetAddress(),
                'unit_number' => fake()->optional()->randomNumber(2),
                'city' => fake()->city(),
                'state_province_region' => fake()->state(),
                'postal_code' => fake()->postcode(),
                'country' => fake()->country(),
            ]);
        }
    }
}
