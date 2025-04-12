<?php

use App\Models\SubDistrict;
use App\Models\Venue;
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
        $csv = Reader::createFromPath(database_path('data/venues.csv'));
        $csv->setHeaderOffset(0);

        foreach ($csv as $record) {
            $sub_district = SubDistrict::whereCode($record['sub_district_id'])->first();

            if ($sub_district) {
                Venue::firstOrCreate(
                    [
                        'sub_district_id' => $sub_district->id,
                        'name' => $record['name'],
                    ],
                    []
                );
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('venues')->delete();
    }
};
