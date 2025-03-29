<?php

namespace App\Http\Controllers;

use App\Data\EventData;
use App\Data\RaceData;
use App\Models\Event;
use App\Models\Race;
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
        $events = EventData::collect($this->baseEventQuery()->latest('start_date')->take(3)->get());

        return Inertia::render('page', [
            'currentEvent' => $this->getCurrentEvent(),
            'events' => $events,
            'races' => $this->getLatestRace(),
        ]);
    }

    protected function getCurrentEvent(): ?EventData
    {
        $currentEvent = $this->baseEventQuery()
            ->where('start_date', '<=', now())
            ->where('end_date', '>=', now())
            ->orWhere('start_date', '>=', now())
            ->orderBy('start_date', 'asc')
            ->first();

        if (! $currentEvent) {
            $currentEvent = $this->baseEventQuery()->orderBy('start_date', 'asc')->first();

            if (! $currentEvent) {
                return null;
            }
        }

        return EventData::from($currentEvent);
    }

    protected function baseEventQuery()
    {
        return Event::with('venue.subDistrict')->withCount(['participants']);
    }

    protected function getLatestRace()
    {
        return RaceData::collect(
            Race::with([
                'leftLaneParticipant.boat.village',
                'leftLaneParticipant.sponsors',
                'rightLaneParticipant.boat.village',
                'rightLaneParticipant.sponsors',
            ])
                ->latest()
                ->take(3)
                ->get()
        );
    }
}
