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
        // TODO: This does not necessarily get the most recent plant types,
        // but it does get the plant types that are currently in the garden
        // Get plant types currently in the garden, ordered by most recent
        $gardenPlantTypes = PlantType::whereIn('id', 
            $garden->plants()
                ->orderBy('created_at', 'desc')
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