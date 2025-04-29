<?php

namespace App\Http\Controllers;

use App\Data\RaceData;
use App\Data\RoundData;
use Illuminate\Http\Request;
use App\Models\Round;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class RoundController extends Controller
{
    public function show(Round $round)
    {
        $races = QueryBuilder::for($round->races())
            ->with([
                'leftLaneParticipant.boat.village.subDistrict',
                'leftLaneParticipant.sponsors',
                'rightLaneParticipant.boat.village.subDistrict',
                'rightLaneParticipant.sponsors',
            ])
            ->cursorPaginate();

        return Inertia::render('rounds/show', [
            'round' => RoundData::from($round->load('day.event')),
            'races' => RaceData::collect($races),
        ]);
    }
}
