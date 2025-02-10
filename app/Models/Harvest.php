<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Harvest extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [
        'plant_id',
        'harvest_date',
        'quantity',
        'unit',
    ];

    protected $casts = [
        'harvest_date' => 'date',
        'quantity' => 'integer',
    ];

    public function plant(): BelongsTo
    {
        return $this->belongsTo(Plant::class);
    }
} 