<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class PlantEventType extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
    ];

    public function plantEvents(): HasMany
    {
        return $this->hasMany(PlantEvent::class);
    }
} 