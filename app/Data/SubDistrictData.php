<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class SubDistrictData extends Data
{
    public function __construct(
        public string $id,
        public string $district_id,
        public ?string $code,
        public string $name,
    ) {}
}
