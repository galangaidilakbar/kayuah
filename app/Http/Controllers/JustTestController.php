<?php

namespace App\Http\Controllers;

use App\Data\DistrictData;
use App\Data\EventData;
use App\Models\District;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JustTestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('events', [
            'events' => EventData::collect(Event::all()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return DistrictData::from(District::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
