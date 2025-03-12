<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Race extends Model
{
    use HasUuids, SoftDeletes;

    public function round(): BelongsTo
    {
        return $this->belongsTo(Round::class);
    }

    public function leftLaneParticipant(): BelongsTo
    {
        return $this->belongsTo(Participant::class, 'left_lane_participant_id');
    }

    public function rightLaneParticipant(): BelongsTo
    {
        return $this->belongsTo(Participant::class, 'right_lane_participant_id');
    }

    public function winner(): BelongsTo
    {
        return $this->belongsTo(Participant::class, 'winner_id');
    }

    public function setWinner(string $participantId): void
    {
        $this->winner_id = $participantId;
        $this->save();
    }
}
