<?php

namespace App\Http\Controllers;

use App\Data\EventData;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $events = EventData::collect(Event::with('venue.subDistrict')->withCount(['participants'])->get());

        return Inertia::render('events/index', [
            'events' => $events,
        ]);
    }

    /**
     * Handle the incoming request.
     */
    public function show(Event $event)
    {
        return Inertia::render('events/show', [
            'event' => EventData::from($event->load('venue.subDistrict')),
        ]);
    }
}
