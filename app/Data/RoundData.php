<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class RoundData extends Data
{
    public function __construct(
        public string $id,
        public string $day_id,
        public string $name,
        public int $order,
        public ?DayData $day,
    ) {}
}
