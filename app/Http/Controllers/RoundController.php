<?php

namespace App\Http\Controllers;

use App\Data\RaceData;
use App\Data\RoundData;
use App\Filters\BoatNameFilter;
use App\Models\Round;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class RoundController extends Controller
{
    public function show(Round $round, Request $request)
    {
        $races = QueryBuilder::for($round->races())
            ->defaultSort('number')
            ->allowedSorts('number')
            ->allowedFilters([
                AllowedFilter::custom('boat_name', new BoatNameFilter),
            ])
            ->with([
                'leftLaneParticipant.boat.village.subDistrict',
                'leftLaneParticipant.sponsors',
                'rightLaneParticipant.boat.village.subDistrict',
                'rightLaneParticipant.sponsors',
            ])
            ->cursorPaginate();

        if ($request->wantsJson()) {
            return response()->json([
                'races' => RaceData::collect($races),
            ]);
        }

        return Inertia::render('rounds/show', [
            'round' => RoundData::from($round->load('day.event')),
            'races' => RaceData::collect($races),
        ]);
    }
}
