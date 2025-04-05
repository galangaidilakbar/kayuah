<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('events/index');
    }

    /**
     * Handle the incoming request.
     */
    public function show(Event $event)
    {
        return Inertia::render('events/show', [
            'event' => $event,
        ]);
    }
}
