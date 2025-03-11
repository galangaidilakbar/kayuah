<?php

namespace App\Filament\Resources\BoatResource\Pages;

use App\Filament\Resources\BoatResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewBoat extends ViewRecord
{
    protected static string $resource = BoatResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
