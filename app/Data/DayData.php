<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class DayData extends Data
{
    public function __construct(
        public string $id,
        public string $event_id,
        public string $date,
        public string $name,
        public ?EventData $event,
    ) {}
}
