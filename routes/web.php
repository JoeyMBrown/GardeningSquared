<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\BedController;
use App\Http\Controllers\GardenController;
use App\Http\Controllers\PlantController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::post('/addresses', [AddressController::class, 'store'])->name('addresses.store');
    
    // More specific routes before resource routes
    Route::post('gardens/{garden}/beds/{bed}/water-all', [BedController::class, 'waterAllPlants'])
        ->name('gardens.beds.water-all');
    Route::post('gardens/{garden}/beds/{bed}/plants/{plant}/events', [PlantController::class, 'storeEvent'])
        ->name('gardens.beds.plants.events.store');
    
    // Resource routes last
    Route::resource('gardens', GardenController::class);
    Route::resource('gardens.beds', BedController::class);
    Route::resource('gardens.beds.plants', PlantController::class);
});

require __DIR__.'/auth.php';
