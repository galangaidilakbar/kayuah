<?php

namespace App\Providers;

use Filament\Support\Colors\Color;
use Filament\Support\Facades\FilamentColor;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Model::preventLazyLoading();
        Model::unguard();

        FilamentColor::register([
            'blue' => Color::Blue,
            'green' => Color::Green,
            'yellow' => Color::Yellow,
            'indigo' => Color::Indigo,
            'red' => Color::Red,
            'orange' => Color::Orange,
        ]);
    }
}
