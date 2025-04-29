<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\JustTestController;
use App\Models\Race;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', IndexController::class)->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('/events', EventController::class)->only('index', 'show');
});

Route::get('/race', function () {
    return Inertia::render('race', [
        'races' => Race::with([
            'leftLaneParticipant.boat',
            'leftLaneParticipant.sponsors',
            'leftLaneParticipant.boat.village',
            'rightLaneParticipant.boat',
            'rightLaneParticipant.sponsors',
            'rightLaneParticipant.boat.village',
        ])
            ->orderBy('number')
            ->get(),
    ]);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/legal.php';
