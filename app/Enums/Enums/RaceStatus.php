<?php

namespace App\Enums\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

enum RaceStatus: string implements HasColor, HasLabel
{
    case scheduled = 'scheduled';
    case prepared = 'prepared';
    case ongoing = 'ongoing';
    case paused = 'paused';
    case completed = 'completed';
    case cancelled = 'cancelled';
    case postponed = 'postponed';

    public function getLabel(): ?string
    {
        return $this->name;
    }

    public function getColor(): string|array|null
    {
        return match ($this) {
            self::scheduled => 'gray',
            self::prepared => 'blue',
            self::ongoing => 'green',
            self::paused => 'yellow',
            self::completed => 'indigo',
            self::cancelled => 'red',
            self::postponed => 'orange',
        };
    }
}
