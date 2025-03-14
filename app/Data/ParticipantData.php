<?php

namespace App\Data;

use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class ParticipantData extends Data
{
    public function __construct(
        public string $id,
        public string $event_id,
        public string $boat_id,
        public ?EventData $event,
        public ?BoatData $boat,
        public string $title,
        #[DataCollectionOf(SponsorData::class)]
        public Lazy|array|null $sponsors,
    ) {}
}
