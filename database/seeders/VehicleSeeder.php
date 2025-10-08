<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * This copies distinct KOSTL values from ZIADANKY_NA_VOZIDLACH into vehicles.
     * If a value is already present it will be ignored.
     *
     * @return void
     */
    public function run(): void
    {
        $rows = DB::table('ZIADANKY_NA_VOZIDLACH')
            ->select('KOSTL')
            ->distinct()
            ->whereNotNull('KOSTL')
            ->get()
            ->pluck('KOSTL')
            ->filter()
            ->values();

        foreach ($rows as $kostl) {
            DB::table('vehicles')->updateOrInsert(
                ['KOSTL' => $kostl],
                ['name' => null, 'created_at' => now(), 'updated_at' => now()]
            );
        }
    }
}
