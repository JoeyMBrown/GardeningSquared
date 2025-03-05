<?php

namespace App\Services;

use App\Models\Garden;
use App\Models\PlantType;
use Illuminate\Database\Eloquent\Collection;

class PlantTypeService
{
    /**
     * Get plant types ordered by garden usage, then alphabetically
     *
     * @param Garden $garden
     * @return Collection
     */
    public function getOrderedPlantTypes(Garden $garden): Collection
    {

        $garden->load('beds.plants');

        $gardenPlantTypes = PlantType::whereIn('id', 
            $garden->beds->pluck('plants')
                ->flatten()
                ->pluck('plant_type_id')
                ->unique()
        )->get()
        ->map(function ($plantType) {
            $plantType->is_in_garden = true;
            return $plantType;
        });

        // Get remaining plant types
        $remainingPlantTypes = PlantType::whereNotIn('id', $gardenPlantTypes->pluck('id'))
            ->orderBy('name')
            ->get()
            ->map(function ($plantType) {
                $plantType->is_in_garden = false;
                return $plantType;
            });

        // Merge the collections
        return $gardenPlantTypes->concat($remainingPlantTypes);
    }
} 