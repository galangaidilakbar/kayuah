<?php

namespace App\Http\Controllers;

use App\Data\EventData;
use App\Data\ParticipantData;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $events = EventData::collect(Event::with('venue.subDistrict')->oldest('start_date')->get());

        return Inertia::render('events/index', [
            'events' => $events,
        ]);
    }

    /**
     * Handle the incoming request.
     */
    public function show(Event $event, Request $request)
    {
        $perPage = 10;
        $participants = QueryBuilder::for($event->participants())
            ->allowedFilters([
                'boat.name',
                AllowedFilter::exact('boat.village.sub_district_id'),
            ])
            ->with('boat.village.subDistrict', 'sponsors')
            ->cursorPaginate($perPage);

        if ($request->wantsJson()) {
            return response()->json([
                'participants' => ParticipantData::collect($participants),
            ]);
        }

        return Inertia::render('events/show', [
            'event' => EventData::from(
                $event
                    ->load('venue.subDistrict', 'days.rounds')
                    ->loadCount('days', 'participants')
            ),
            'participants' => ParticipantData::collect($participants),
        ]);
    }
}
