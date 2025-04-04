<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class District extends Model
{
    use HasUuids, SoftDeletes;

    public function subDistricts(): HasMany
    {
        return $this->hasMany(SubDistrict::class);
    }
}
