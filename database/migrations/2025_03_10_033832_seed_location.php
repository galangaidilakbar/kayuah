<?php

use App\Models\District;
use App\Models\SubDistrict;
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
        $csv = Reader::createFromPath(database_path('data/indonesia_administrative.csv'));

        foreach ($csv as $item) {
            $code = $item[0];
            $name = $item[1];
            $codeParts = explode('.', $code);
            $partCount = count($codeParts);

            try {
                if ($partCount === 2) {
                    District::firstOrCreate([
                        'code' => $code,
                    ], [
                        'name' => $name,
                    ]);
                } elseif ($partCount === 3) {
                    $districtCode = implode('.', array_slice($codeParts, 0, 2));
                    $district = District::where('code', $districtCode)->first();

                    if ($district) {
                        SubDistrict::firstOrCreate(
                            ['code' => $code],
                            [
                                'name' => $name,
                                'district_id' => $district->id,
                            ]
                        );
                    }
                } elseif ($partCount === 4) {
                    $subDistrictCode = implode(
                        '.',
                        array_slice($codeParts, 0, 3)
                    );
                    $subDistrict = SubDistrict::where(
                        'code',
                        $subDistrictCode
                    )->first();

                    if ($subDistrict) {
                        Village::firstOrCreate(
                            ['code' => $code],
                            [
                                'name' => $name,
                                'sub_district_id' => $subDistrict->id,
                            ]
                        );
                    }
                }
            } catch (\Throwable $th) {
                dd($th);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('villages')->delete();
        DB::table('sub_districts')->delete();
        DB::table('districts')->delete();
    }
};
