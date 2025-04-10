<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Round extends Model
{
    use HasUuids, SoftDeletes;

    public function day(): BelongsTo
    {
        return $this->belongsTo(Day::class);
    }

    public function races(): HasMany
    {
        return $this->hasMany(Race::class);
    }

    protected function title(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->day->name.' - '.$this->name,
        );
    }

    public static function datalist(): array
    {
        return [
            'Putaran Pertama',
            'Putaran Kedua',
            'Putaran Ketiga',
            'Semifinal',
            'Final Segitiga',
            'Final',
        ];
    }
}
