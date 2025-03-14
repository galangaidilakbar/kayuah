<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class BoatData extends Data
{
    public function __construct(
        public string $id,
        public string $village_id,
        public string $name,
        public ?VillageData $village,
    ) {}
}
