<?php

use App\Models\Boat;
use App\Models\Village;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use League\Csv\Reader;

return new class extends Migration
{
    public function shouldRun(): bool
    {
        // Skip migration in testing environment
        return app()->environment() !== 'testing';
    }

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $csv = Reader::createFromPath(database_path('data/clean_boats.csv'));
        $csv->setHeaderOffset(0);

        foreach ($csv as $record) {
            $village = Village::whereCode($record['village_id'])->first();

            if ($village) {
                Boat::firstOrCreate([
                    'name' => $record['name'],
                    'village_id' => $village->id,
                ], []);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('boats')->delete();
    }
};
