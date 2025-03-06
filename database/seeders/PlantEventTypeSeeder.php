<?php

namespace Database\Seeders;

use App\Models\PlantEventType;
use Illuminate\Database\Seeder;

class PlantEventTypeSeeder extends Seeder
{
    public function run(): void
    {
        $eventTypes = [
            [
                'name' => 'Watered',
                'description' => 'Plant was watered',
            ],
            [
                'name' => 'Weeded',
                'description' => 'Weeds were removed from around the plant',
            ],
            [
                'name' => 'Pest Controled',
                'description' => 'Pest control measures were applied',
            ],
            [
                'name' => 'Harvested',
                'description' => 'Plant was harvested',
            ],
            [
                'name' => 'Fertilized',
                'description' => 'Plant was fertilized',
            ],
            [
                'name' => 'Died',
                'description' => 'Plant died',
            ]
        ];

        foreach ($eventTypes as $eventType) {
            PlantEventType::create($eventType);
        }
    }
} 