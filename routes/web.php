<?php

use App\Http\Controllers\JustTestController;
use App\Models\Race;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('page');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
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

Route::resource('/test', JustTestController::class);

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
