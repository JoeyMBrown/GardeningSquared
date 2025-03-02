<?php

namespace Database\Seeders;

use App\Models\Plant;
use App\Models\Bed;
use App\Models\PlantType;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class PlantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the beds created by BedSeeder
        $beds = Bed::where('name', 'like', '%Vegetable Bed%')
            ->orWhere('name', 'Herb Bed')
            ->get();
        
        if ($beds->isEmpty()) {
            $this->command->error('Beds not found. Please run BedSeeder first.');
            return;
        }
        
        // Get some plant types
        $tomatoType = PlantType::where('name', 'like', '%Tomato%')->first();
        $lettuceType = PlantType::where('name', 'like', '%Lettuce%')->first();
        $basilType = PlantType::where('name', 'like', '%Basil%')->first();
        $pepperType = PlantType::where('name', 'like', '%Pepper%')->first();
        
        // Fallback to any plant types if specific ones aren't found
        if (!$tomatoType || !$lettuceType || !$basilType || !$pepperType) {
            $plantTypes = PlantType::inRandomOrder()->take(4)->get();
            $tomatoType = $plantTypes[0] ?? null;
            $lettuceType = $plantTypes[1] ?? null;
            $basilType = $plantTypes[2] ?? null;
            $pepperType = $plantTypes[3] ?? null;
        }
        
        // Create plants for Vegetable Bed 1 (tomatoes and peppers)
        $vegetableBed1 = $beds->where('name', 'Vegetable Bed 1')->first();
        if ($vegetableBed1 && $tomatoType && $pepperType) {
            // Create tomato plants
            Plant::create([
                'plant_type_id' => $tomatoType->id,
                'bed_id' => $vegetableBed1->id,
                'name' => 'Roma Tomato 1',
                'description' => 'First Roma tomato plant',
                'seed_start_date' => Carbon::now()->subDays(30),
                'transplant_date' => Carbon::now()->subDays(15),
            ]);
            
            Plant::create([
                'plant_type_id' => $tomatoType->id,
                'bed_id' => $vegetableBed1->id,
                'name' => 'Roma Tomato 2',
                'description' => 'Second Roma tomato plant',
                'seed_start_date' => Carbon::now()->subDays(30),
                'transplant_date' => Carbon::now()->subDays(15),
            ]);
            
            // Create pepper plant
            Plant::create([
                'plant_type_id' => $pepperType->id,
                'bed_id' => $vegetableBed1->id,
                'name' => 'Bell Pepper',
                'description' => 'Sweet bell pepper plant',
                'seed_start_date' => Carbon::now()->subDays(40),
                'transplant_date' => Carbon::now()->subDays(20),
            ]);
        }
        
        // Create plants for Vegetable Bed 2 (lettuce)
        $vegetableBed2 = $beds->where('name', 'Vegetable Bed 2')->first();
        if ($vegetableBed2 && $lettuceType) {
            // Create lettuce plants
            Plant::create([
                'plant_type_id' => $lettuceType->id,
                'bed_id' => $vegetableBed2->id,
                'name' => 'Romaine Lettuce',
                'description' => 'Romaine lettuce plant',
                'seed_start_date' => Carbon::now()->subDays(20),
                'transplant_date' => Carbon::now()->subDays(10),
            ]);
            
            Plant::create([
                'plant_type_id' => $lettuceType->id,
                'bed_id' => $vegetableBed2->id,
                'name' => 'Butterhead Lettuce',
                'description' => 'Butterhead lettuce plant',
                'seed_start_date' => Carbon::now()->subDays(20),
                'transplant_date' => Carbon::now()->subDays(10),
            ]);
        }
        
        // Create plants for Herb Bed
        $herbBed = $beds->where('name', 'Herb Bed')->first();
        if ($herbBed && $basilType) {
            // Create basil plants
            Plant::create([
                'plant_type_id' => $basilType->id,
                'bed_id' => $herbBed->id,
                'name' => 'Sweet Basil',
                'description' => 'Sweet basil plant',
                'seed_start_date' => Carbon::now()->subDays(25),
                'transplant_date' => Carbon::now()->subDays(15),
            ]);
        }
    }
} 