<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ZiadankyNaVozidlach;

class VehicleController extends Controller
{
        public function requisitionsByVehicleId(string $vehicleId)
    {
        $rows = ZiadankyNaVozidlach::query()
            ->where('KOSTL', $vehicleId)
            ->orderBy('ID_Ziadanky')
            ->get()
            ->makeHidden(['KOSTL']);

        return response()->json($rows->toArray());
    }

    public function kostlList()
    {
        $kostl = ZiadankyNaVozidlach::query()
            ->whereNotNull('KOSTL')
            ->where('KOSTL', '<>', '')
            ->distinct()
            ->orderBy('KOSTL')
            ->pluck('KOSTL')
            ->values();

        return response()->json($kostl);
    }
}
