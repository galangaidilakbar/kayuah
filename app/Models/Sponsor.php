<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sponsor extends Model
{
    use HasUuids, SoftDeletes;

    public function participants(): BelongsToMany
    {
        return $this->belongsToMany(Participant::class);
    }
}
