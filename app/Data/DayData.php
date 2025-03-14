<?php

namespace App\Data;

use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class DayData extends Data
{
    public function __construct(
        public string $id,
        public string $event_id,
        public string $date,
        public string $name,
        public ?EventData $event,
        #[DataCollectionOf(RoundData::class)]
        public Lazy|array|null $rounds,
    ) {}
}
