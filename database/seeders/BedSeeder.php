<?php

namespace Database\Seeders;

use App\Models\Bed;
use App\Models\Garden;
use Illuminate\Database\Seeder;

class BedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the Home Garden (first garden created in GardenSeeder)
        $garden = Garden::where('name', 'Home Garden')->first();
        
        if (!$garden) {
            $this->command->error('Home Garden not found. Please run GardenSeeder first.');
            return;
        }
        
        // Create 4 beds for the garden
        $beds = [
            [
                'garden_id' => $garden->id,
                'name' => 'Vegetable Bed 1',
                'description' => 'Main vegetable bed for tomatoes and peppers',
                'length' => 96, // 8 feet in inches
                'width' => 48,  // 4 feet in inches
                'height' => 12, // 1 foot in inches
            ],
            [
                'garden_id' => $garden->id,
                'name' => 'Vegetable Bed 2',
                'description' => 'Secondary vegetable bed for leafy greens',
                'length' => 72, // 6 feet in inches
                'width' => 36,  // 3 feet in inches
                'height' => 12, // 1 foot in inches
            ],
            [
                'garden_id' => $garden->id,
                'name' => 'Herb Bed',
                'description' => 'Dedicated herb garden',
                'length' => 48, // 4 feet in inches
                'width' => 24,  // 2 feet in inches
                'height' => 8,  // 8 inches
            ],
            [
                'garden_id' => $garden->id,
                'name' => 'Flower Bed',
                'description' => 'Ornamental flowers and companion plants',
                'length' => 60, // 5 feet in inches
                'width' => 36,  // 3 feet in inches
                'height' => 10, // 10 inches
            ],
        ];
        
        foreach ($beds as $bedData) {
            Bed::create($bedData);
        }
    }
} 