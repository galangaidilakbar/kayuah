<?php

namespace App\Http\Controllers;

use App\Data\EventData;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        // get latest 3 events
        $events = EventData::collect(
            Event::with('venue.subDistrict')
                ->withCount(['days', 'participants'])
                ->latest('start_date')
                ->take(3)
                ->get()
        );

        return Inertia::render('page', [
            'currentEvent' => $this->getCurrentEvent(),
            'events' => $events,
        ]);
    }

    protected function getCurrentEvent(): ?EventData
    {
        $currentEvent = Event::with('venue.subDistrict')
            ->where('start_date', '<=', now())
            ->where('end_date', '>=', now())
            ->orWhere('start_date', '>=', now())
            ->orderBy('start_date', 'asc')
            ->first();

        if (!$currentEvent) {
            $currentEvent = Event::with('venue')->orderBy('start_date', 'asc')->first();
            if (!$currentEvent) {
                return null;
            }
        }

        return EventData::from($currentEvent);
    }
}
