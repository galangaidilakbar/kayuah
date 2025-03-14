<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class VenueData extends Data
{
    public function __construct(
        public string $id,
        public string $sub_district_id,
        public string $name,
        public ?SubDistrictData $subDistrict,
    ) {}
}
