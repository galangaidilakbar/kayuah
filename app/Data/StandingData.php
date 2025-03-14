<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class StandingData extends Data
{
    public function __construct(
        public string $id,
        public string $event_id,
        public string $participant_id,
        public int $rank,
        public ?EventData $event,
        public ?ParticipantData $participant
    ) {}
}
