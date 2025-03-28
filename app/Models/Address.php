<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Address extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'street_address',
        'unit_number',
        'city',
        'state_province_region',
        'postal_code',
        'country',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'users_addresses');
    }

    public function gardens(): HasMany
    {
        return $this->hasMany(Garden::class);
    }
} 