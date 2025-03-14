<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class SponsorData extends Data
{
    public function __construct(
        public string $id,
        public string $name,
        public ?string $type,
    ) {}
}
