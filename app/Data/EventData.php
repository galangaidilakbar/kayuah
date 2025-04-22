<?php

namespace App\Data;

use App\Models\Event;
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
        public ?string $type,
        public Lazy|string|null $about,
        public string $thumbnail,
        public Lazy|VenueData|null $venue,
        #[DataCollectionOf(DayData::class)]
        public Lazy|array|null $days,
        #[DataCollectionOf(ParticipantData::class)]
        public Lazy|array|null $participants,
        #[DataCollectionOf(StandingData::class)]
        public Lazy|array|null $standings,
        public Lazy|int|null $days_count,
        public Lazy|int|null $participants_count,
    ) {}

    public static function fromModel(Event $event)
    {
        return new self(
            $event->id,
            $event->venue_id,
            $event->name,
            $event->start_date,
            $event->end_date,
            $event->type,
            Lazy::create(fn () => str($event->about)->sanitizeHtml())->defaultIncluded(),
            $event->thumbnail,
            Lazy::whenLoaded('venue', $event, fn () => VenueData::from($event->venue)),
            Lazy::whenLoaded('days', $event, fn () => DayData::collect($event->days)),
            Lazy::whenLoaded('participants', $event, fn () => ParticipantData::collect($event->participants)),
            Lazy::whenLoaded('standings', $event, fn () => StandingData::collect($event->standings)),
            $event->days_count,
            $event->participants_count
        );
    }
}
