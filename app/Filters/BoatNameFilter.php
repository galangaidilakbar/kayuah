<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class BoatNameFilter implements Filter
{
    public function __invoke(Builder $query, mixed $value, string $property)
    {
        $query->whereHas('leftLaneParticipant.boat', function (Builder $subQuery) use ($value) {
            $subQuery->where('name', 'like', '%'.$value.'%');
        })->orWhereHas('rightLaneParticipant.boat', function (Builder $subQuery) use ($value) {
            $subQuery->where('name', 'like', '%'.$value.'%');
        });
    }
}
