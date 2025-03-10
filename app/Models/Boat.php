<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Boat extends Model
{
    use HasUuids, SoftDeletes;

    public function village(): BelongsTo
    {
        return $this->belongsTo(Village::class);
    }
}
