<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\VehicleController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/vehicles/requisitions/{vehicleId}', [VehicleController::class, 'requisitionsByVehicleId']);
Route::get('/vehicles/kostl', [VehicleController::class, 'kostlList']);