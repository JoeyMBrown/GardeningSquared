<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LastFrostDate extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [
        'postal_code',
        'last_frost_date',
    ];

    protected $casts = [
        'last_frost_date' => 'date',
    ];
} 