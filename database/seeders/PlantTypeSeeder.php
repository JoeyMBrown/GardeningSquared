<?php

namespace Database\Seeders;

use App\Models\PlantType;
use App\Models\User;
use Illuminate\Database\Seeder;

class PlantTypeSeeder extends Seeder
{
    public function run(): void
    {
        $systemUser = User::where('email', 'system@gardeningsquared.com')->first();

        $plantTypes = [
            [
                'name' => 'Tomato - Roma',
                'description' => 'Determinate paste tomato, perfect for sauces and canning.',
                'plant_spacing' => 24,
                'plant_depth' => 4,
                'sun_needed' => 480, // 8 hours
                'germination_days' => 7,
                'growth_days_min' => 65,
                'growth_days_max' => 75,
                'indoor_seed_start_days' => 56,
                'outdoor_seed_start_days' => 14,
                'transplant_days' => 14,
                'last_plant_days' => 84,
                'watering_frequency' => 2,
                'fertilizing_frequency' => 14,
                'pest_control_frequency' => 7,
                'created_by_user_id' => $systemUser->id, // You'll need to add this use statement
            ],
            [
                'name' => 'Cucumber - Straight Eight',
                'description' => 'Classic slicing cucumber, great for fresh eating.',
                'plant_spacing' => 24,
                'plant_depth' => 4,
                'sun_needed' => 480, // 8 hours
                'germination_days' => 7,
                'growth_days_min' => 55,
                'growth_days_max' => 65,
                'indoor_seed_start_days' => 21,
                'outdoor_seed_start_days' => 14,
                'transplant_days' => 14,
                'last_plant_days' => 70,
                'watering_frequency' => 1,
                'fertilizing_frequency' => 14,
                'pest_control_frequency' => 7,
                'created_by_user_id' => $systemUser->id,
            ],
            [
                'name' => 'Bell Pepper - California Wonder',
                'description' => 'Large, sweet bell pepper that ripens from green to red.',
                'plant_spacing' => 24,
                'plant_depth' => 4,
                'sun_needed' => 480, // 8 hours
                'germination_days' => 7,
                'growth_days_min' => 70,
                'growth_days_max' => 85,
                'indoor_seed_start_days' => 56,
                'outdoor_seed_start_days' => 21,
                'transplant_days' => 21,
                'last_plant_days' => 84,
                'watering_frequency' => 2,
                'fertilizing_frequency' => 14,
                'pest_control_frequency' => 7,
                'created_by_user_id' => $systemUser->id,
            ],
            [
                'name' => 'Lettuce - Buttercrunch',
                'description' => 'Heat-tolerant butterhead lettuce with tender leaves.',
                'plant_spacing' => 24,
                'plant_depth' => 4,
                'sun_needed' => 480, // 8 hours
                'germination_days' => 7,
                'growth_days_min' => 45,
                'growth_days_max' => 55,
                'indoor_seed_start_days' => 28,
                'outdoor_seed_start_days' => 0,
                'transplant_days' => 14,
                'last_plant_days' => 84,
                'watering_frequency' => 2,
                'fertilizing_frequency' => 21,
                'pest_control_frequency' => 14,
                'created_by_user_id' => $systemUser->id,
            ],
            [
                'name' => 'Carrot - Nantes',
                'description' => 'Sweet, cylindrical carrots perfect for fresh eating.',
                'plant_spacing' => 24,
                'plant_depth' => 4,
                'sun_needed' => 480, // 8 hours
                'germination_days' => 7,
                'growth_days_min' => 65,
                'growth_days_max' => 75,
                'indoor_seed_start_days' => null,
                'outdoor_seed_start_days' => 0,
                'transplant_days' => null,
                'last_plant_days' => 84,
                'watering_frequency' => 2,
                'fertilizing_frequency' => 21,
                'pest_control_frequency' => 14,
                'created_by_user_id' => $systemUser->id,
            ],
            [
                'name' => 'Basil - Genovese',
                'description' => 'Classic Italian sweet basil, perfect for pesto.',
                'plant_spacing' => 24,
                'plant_depth' => 4,
                'sun_needed' => 480, // 8 hours
                'germination_days' => 7,
                'growth_days_min' => 45,
                'growth_days_max' => 60,
                'indoor_seed_start_days' => 42,
                'outdoor_seed_start_days' => 14,
                'transplant_days' => 14,
                'last_plant_days' => 84,
                'watering_frequency' => 2,
                'fertilizing_frequency' => 28,
                'pest_control_frequency' => 14,
                'created_by_user_id' => $systemUser->id,
            ],
            [
                'name' => 'Zucchini - Black Beauty',
                'description' => 'Productive dark green summer squash.',
                'plant_spacing' => 24,
                'plant_depth' => 4,
                'sun_needed' => 480, // 8 hours
                'germination_days' => 7,
                'growth_days_min' => 50,
                'growth_days_max' => 60,
                'indoor_seed_start_days' => 21,
                'outdoor_seed_start_days' => 14,
                'transplant_days' => 14,
                'last_plant_days' => 70,
                'watering_frequency' => 2,
                'fertilizing_frequency' => 14,
                'pest_control_frequency' => 7,
                'created_by_user_id' => $systemUser->id,
            ],
            [
                'name' => 'Green Bean - Blue Lake Bush',
                'description' => 'Tender, stringless bush beans.',
                'plant_spacing' => 24,
                'plant_depth' => 4,
                'sun_needed' => 480, // 8 hours
                'germination_days' => 7,
                'growth_days_min' => 55,
                'growth_days_max' => 65,
                'indoor_seed_start_days' => null,
                'outdoor_seed_start_days' => 14,
                'transplant_days' => null,
                'last_plant_days' => 70,
                'watering_frequency' => 3,
                'fertilizing_frequency' => 21,
                'pest_control_frequency' => 14,
                'created_by_user_id' => $systemUser->id,
            ],
        ];

        foreach ($plantTypes as $plantType) {
            PlantType::create($plantType);
        }
    }
} 