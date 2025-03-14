<?php

namespace App\Data;

use DateTime;
use Spatie\LaravelData\Data;

class EventData extends Data
{
    public function __construct(
        public string $id,
        public string $venue_id,
        public string $name,
        public DateTime $start_date,
        public DateTime $end_date,
        public ?VenueData $venue,
    ) {}
}
