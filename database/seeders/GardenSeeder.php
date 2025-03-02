<?php

namespace Database\Seeders;

use App\Models\Garden;
use App\Models\User;
use App\Models\Address;
use Illuminate\Database\Seeder;

class GardenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the system user
        $systemUser = User::where('email', 'system@gardeningsquared.com')->first();
        
        // Get two random addresses associated with the system user
        $addresses = $systemUser->addresses()->inRandomOrder()->take(2)->get();
        
        // Create two gardens
        $gardens = [
            [
                'name' => 'Home Garden',
                'description' => 'My primary garden at home',
                'address_id' => $addresses[0]->id,
            ],
            [
                'name' => 'Community Garden',
                'description' => 'My plot at the local community garden',
                'address_id' => $addresses[1]->id,
            ]
        ];
        
        foreach ($gardens as $gardenData) {
            $garden = Garden::create($gardenData);
            
            // Associate the garden with the system user
            $systemUser->gardens()->attach($garden->id);
        }
    }
} 