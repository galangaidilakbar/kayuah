<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Day extends Model
{
    use HasUuids, SoftDeletes;

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }
}
