<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class ParticipantData extends Data
{
    public function __construct(
        public string $id,
        public string $event_id,
        public string $boat_id,
        public ?EventData $event,
        public ?BoatData $boat,
        public string $title,
    ) {}
}
