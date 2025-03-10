<?php

use App\Models\Boat;
use App\Models\Village;
use Illuminate\Database\Migrations\Migration;
use League\Csv\Reader;

return new class extends Migration
{
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
