<?php

use App\Models\Event;
use App\Models\Venue;
use Illuminate\Database\Migrations\Migration;
use League\Csv\Reader;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $csv = Reader::createFromPath(database_path('data/events_2025.csv'));
        $csv->setHeaderOffset(0);

        foreach ($csv as $row) {
            $venue = Venue::whereName($row['venue_name'])->first();

            if ($venue) {
                $event = new Event;

                $event->venue_id = $venue->id;
                $event->name = $row['name'];
                $event->start_date = $row['start_date'];
                $event->end_date = $row['end_date'];
                $event->save();
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
