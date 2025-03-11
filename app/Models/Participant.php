<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Participant extends Model
{
    use HasUuids, SoftDeletes;

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function boat(): BelongsTo
    {
        return $this->belongsTo(Boat::class);
    }

    public function sponsors(): BelongsToMany
    {
        return $this->belongsToMany(Sponsor::class);
    }

    public function standing(): HasMany
    {
        return $this->hasMany(Standing::class);
    }

    public function leftLaneRaces(): HasMany
    {
        return $this->hasMany(Race::class, 'left_lane_participant_id');
    }

    public function rightLaneRaces(): HasMany
    {
        return $this->hasMany(Race::class, 'right_lane_participant_id');
    }

    public function winnerRaces(): HasMany
    {
        return $this->hasMany(Race::class, 'winner_id');
    }

    protected function title(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->boat->name.' '.$this->sponsors->pluck('name')->join(', ')
        );
    }

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['title'];
}
