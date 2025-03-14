<?php

namespace App\Data;

use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class BoatData extends Data
{
    public function __construct(
        public string $id,
        public string $village_id,
        public string $name,
        public ?VillageData $village,
        #[DataCollectionOf(ParticipantData::class)]
        public Lazy|array|null $participants,
    ) {}
}
