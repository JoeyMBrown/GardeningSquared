<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class PlantType extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'plant_spacing',
        'plant_depth',
        'sun_needed',
        'germination_days',
        'growth_days_min',
        'growth_days_max',
        'indoor_seed_start_days',
        'outdoor_seed_start_days',
        'transplant_days',
        'last_plant_days',
        'watering_frequency',
        'fertilizing_frequency',
        'pest_control_frequency',
        'image_url',
        'created_by_user_id',
    ];

    protected $casts = [
        'plant_spacing' => 'integer',
        'plant_depth' => 'integer',
        'sun_needed' => 'integer',
        'germination_days' => 'integer',
        'growth_days_min' => 'integer',
        'growth_days_max' => 'integer',
        'indoor_seed_start_days' => 'integer',
        'outdoor_seed_start_days' => 'integer',
        'transplant_days' => 'integer',
        'last_plant_days' => 'integer',
        'watering_frequency' => 'integer',
        'fertilizing_frequency' => 'integer',
        'pest_control_frequency' => 'integer',
    ];

    public function plants(): HasMany
    {
        return $this->hasMany(Plant::class);
    }

    public function createdByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }
} 