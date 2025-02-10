<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class PlantType extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'growth_time_min',
        'growth_time_max',
        'indoor_seed_start_date',
        'outdoor_seed_start_date',
        'transplant_date',
        'last_plant_date',
        'recommended_watering_frequency',
        'recommended_fertilizing_frequency',
        'recommended_pest_control_frequency',
    ];

    protected $casts = [
        'growth_time_min' => 'integer',
        'growth_time_max' => 'integer',
        'indoor_seed_start_date' => 'integer',
        'outdoor_seed_start_date' => 'integer',
        'transplant_date' => 'integer',
        'last_plant_date' => 'integer',
        'recommended_watering_frequency' => 'integer',
        'recommended_fertilizing_frequency' => 'integer',
        'recommended_pest_control_frequency' => 'integer',
    ];

    public function plants(): HasMany
    {
        return $this->hasMany(Plant::class);
    }
} 