<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('races', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('round_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->integer('number');
            $table->foreignUuid('left_lane_participant_id')
                ->nullable()
                ->constrained('participants')
                ->cascadeOnDelete();
            $table->boolean('is_bye')->default(false);
            $table->foreignUuid('right_lane_participant_id')
                ->nullable()
                ->constrained('participants')
                ->cascadeOnDelete();
            $table->foreignUuid('winner_id')
                ->nullable()
                ->constrained('participants')
                ->cascadeOnDelete();
            $table->string('status')->nullable();
            $table->timestamps();
            $table->unique(['round_id', 'number']);
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('races');
    }
};
