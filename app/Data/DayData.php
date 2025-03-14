<?php

namespace App\Data;

use Date;
use Spatie\LaravelData\Data;

class DayData extends Data
{
    public function __construct(
        public string $id,
        public string $event_id,
        public Date $date,
        public string $name,
        public ?EventData $event,
    ) {}
}
