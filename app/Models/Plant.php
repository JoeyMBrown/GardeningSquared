<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Plant extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [
        'plant_type_id',
        'bed_id',
        'name',
        'description',
        'seed_start_date',
        'transplant_date',
    ];

    protected $casts = [
        'seed_start_date' => 'date',
        'transplant_date' => 'date',
    ];

    public function plantType(): BelongsTo
    {
        return $this->belongsTo(PlantType::class);
    }

    public function bed(): BelongsTo
    {
        return $this->belongsTo(Bed::class);
    }

    public function harvests(): HasMany
    {
        return $this->hasMany(Harvest::class);
    }
} 