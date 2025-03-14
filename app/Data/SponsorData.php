<?php

namespace App\Data;

use App\Enums\SponsorType;
use Spatie\LaravelData\Data;

class SponsorData extends Data
{
    public function __construct(public string $id, public string $name, public ?SponsorType $type) {}
}
