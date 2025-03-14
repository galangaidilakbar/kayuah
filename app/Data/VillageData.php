<?php

namespace App\Data;

use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapOutputName(SnakeCaseMapper::class)]
class VillageData extends Data
{
    public function __construct(
        public string $id,
        public string $sub_district_id,
        public ?string $code,
        public string $name,
        public ?SubDistrictData $subDistrict,
        #[DataCollectionOf(BoatData::class)]
        public Lazy|array|null $boats,
    ) {}
}
