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
        $events = EventData::collect(Event::latest()->take(3)->get());

        return Inertia::render('page', [
            'events' => $events
        ]);
    }
}
