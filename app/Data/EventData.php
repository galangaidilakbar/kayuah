<?php

namespace App\Data;

use DateTime;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class EventData extends Data
{
    public function __construct(
        public string $id,
        public string $venue_id,
        public string $name,
        public DateTime $start_date,
        public DateTime $end_date,
        public ?VenueData $venue,
        #[DataCollectionOf(DayData::class)]
        public Lazy|array|null $days,
        #[DataCollectionOf(ParticipantData::class)]
        public Lazy|array|null $participants,
        public Lazy|int|null $days_count,
        public Lazy|int|null $participants_count,
    ) {}
}
