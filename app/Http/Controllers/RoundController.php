<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Round;

class RoundController extends Controller
{
    public function show(Round $round)
    {
        dd($round);
    }
}
