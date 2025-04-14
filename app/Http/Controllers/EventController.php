<?php

namespace App\Http\Controllers;

use App\Data\EventData;
use App\Data\ParticipantData;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
    public function show(Event $event)
    {
        $participants = $event->participants()->with('boat.village.subDistrict', 'sponsors')->paginate(10);

        return Inertia::render('events/show', [
            'event' => EventData::from($event->load('venue.subDistrict', 'days.rounds')->loadCount('days', 'participants')),
            'participants' => ParticipantData::collect($participants),
        ]);
    }
}
