<?php

namespace Database\Seeders;

use App\Models\PlantType;
use Illuminate\Database\Seeder;

class PlantTypeSeeder extends Seeder
{
    public function run(): void
    {
        $plantTypes = [
            [
                'name' => 'Tomato - Roma',
                'description' => 'Determinate paste tomato, perfect for sauces and canning.',
                'growth_time_min' => 65,
                'growth_time_max' => 75,
                'indoor_seed_start_date' => -56, // 8 weeks before last frost
                'outdoor_seed_start_date' => 14,
                'transplant_date' => 14,
                'last_plant_date' => 84,
                'recommended_watering_frequency' => 2,
                'recommended_fertilizing_frequency' => 14,
                'recommended_pest_control_frequency' => 7,
            ],
            [
                'name' => 'Cucumber - Straight Eight',
                'description' => 'Classic slicing cucumber, great for fresh eating.',
                'growth_time_min' => 55,
                'growth_time_max' => 65,
                'indoor_seed_start_date' => -21,
                'outdoor_seed_start_date' => 14,
                'transplant_date' => 14,
                'last_plant_date' => 70,
                'recommended_watering_frequency' => 1,
                'recommended_fertilizing_frequency' => 14,
                'recommended_pest_control_frequency' => 7,
            ],
            [
                'name' => 'Bell Pepper - California Wonder',
                'description' => 'Large, sweet bell pepper that ripens from green to red.',
                'growth_time_min' => 70,
                'growth_time_max' => 85,
                'indoor_seed_start_date' => -56,
                'outdoor_seed_start_date' => 21,
                'transplant_date' => 21,
                'last_plant_date' => 84,
                'recommended_watering_frequency' => 2,
                'recommended_fertilizing_frequency' => 14,
                'recommended_pest_control_frequency' => 7,
            ],
            [
                'name' => 'Lettuce - Buttercrunch',
                'description' => 'Heat-tolerant butterhead lettuce with tender leaves.',
                'growth_time_min' => 45,
                'growth_time_max' => 55,
                'indoor_seed_start_date' => -28,
                'outdoor_seed_start_date' => 0,
                'transplant_date' => 14,
                'last_plant_date' => 84,
                'recommended_watering_frequency' => 2,
                'recommended_fertilizing_frequency' => 21,
                'recommended_pest_control_frequency' => 14,
            ],
            [
                'name' => 'Carrot - Nantes',
                'description' => 'Sweet, cylindrical carrots perfect for fresh eating.',
                'growth_time_min' => 65,
                'growth_time_max' => 75,
                'indoor_seed_start_date' => null,
                'outdoor_seed_start_date' => 0,
                'transplant_date' => null,
                'last_plant_date' => 84,
                'recommended_watering_frequency' => 2,
                'recommended_fertilizing_frequency' => 21,
                'recommended_pest_control_frequency' => 14,
            ],
            [
                'name' => 'Basil - Genovese',
                'description' => 'Classic Italian sweet basil, perfect for pesto.',
                'growth_time_min' => 45,
                'growth_time_max' => 60,
                'indoor_seed_start_date' => -42,
                'outdoor_seed_start_date' => 14,
                'transplant_date' => 14,
                'last_plant_date' => 84,
                'recommended_watering_frequency' => 2,
                'recommended_fertilizing_frequency' => 28,
                'recommended_pest_control_frequency' => 14,
            ],
            [
                'name' => 'Zucchini - Black Beauty',
                'description' => 'Productive dark green summer squash.',
                'growth_time_min' => 50,
                'growth_time_max' => 60,
                'indoor_seed_start_date' => -21,
                'outdoor_seed_start_date' => 14,
                'transplant_date' => 14,
                'last_plant_date' => 70,
                'recommended_watering_frequency' => 2,
                'recommended_fertilizing_frequency' => 14,
                'recommended_pest_control_frequency' => 7,
            ],
            [
                'name' => 'Green Bean - Blue Lake Bush',
                'description' => 'Tender, stringless bush beans.',
                'growth_time_min' => 55,
                'growth_time_max' => 65,
                'indoor_seed_start_date' => null,
                'outdoor_seed_start_date' => 14,
                'transplant_date' => null,
                'last_plant_date' => 70,
                'recommended_watering_frequency' => 3,
                'recommended_fertilizing_frequency' => 21,
                'recommended_pest_control_frequency' => 14,
            ],
        ];

        foreach ($plantTypes as $plantType) {
            PlantType::create($plantType);
        }
    }
} 