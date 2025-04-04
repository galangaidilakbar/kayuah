<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/legal/privacy-policy', function () {
    return Inertia::render('legal/privacy-policy');
});
