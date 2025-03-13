<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class DistrictData extends Data
{
    public function __construct(
        public string $id,
        public ?string $code,
        public string $name,
        /** @var array<SubDistrictData> */
        public ?array $subDistricts,
    ) {
        //
    }
}
