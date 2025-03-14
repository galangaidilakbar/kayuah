<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class RaceData extends Data
{
    public function __construct(
        public string $id,
        public string $round_id,
        public int $number,
        public string $left_lane_participant_id,
        public bool $is_bye,
        public string $right_lane_participant_id,
        public string $winner_id,
        public string $status,
        public ?RoundData $round,
        public ?ParticipantData $left_lane_participant,
        public ?ParticipantData $right_lane_participant,
        public ?ParticipantData $winner
    ) {}
}
