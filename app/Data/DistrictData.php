<?php

namespace App\Data;

use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapOutputName(SnakeCaseMapper::class)]
class DistrictData extends Data
{
    public function __construct(
        public string $id,
        public ?string $code,
        public string $name,
        #[DataCollectionOf(SubDistrictData::class)]
        public Lazy|array|null $subDistricts
    ) {
        //
    }
}
