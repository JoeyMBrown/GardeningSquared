<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class PlantEvent extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [
        'plant_id',
        'plant_event_type_id',
        'notes',
    ];

    public function plant(): BelongsTo
    {
        return $this->belongsTo(Plant::class);
    }

    public function plantEventType(): BelongsTo
    {
        return $this->belongsTo(PlantEventType::class);
    }
} 