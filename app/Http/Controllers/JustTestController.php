<?php

namespace App\Http\Controllers;

use App\Data\DistrictData;
use App\Models\District;
use Illuminate\Http\Request;

class JustTestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DistrictData::collect(District::paginate(2));
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
