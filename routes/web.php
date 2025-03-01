<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GardenController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\PlantController;
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
    
    Route::get('/plants/create', [PlantController::class, 'create'])->name('plants.create');
    Route::post('/plants', [PlantController::class, 'store'])->name('plants.store');
    
    Route::resource('gardens', GardenController::class);
    
    Route::post('/addresses', [AddressController::class, 'store'])->name('addresses.store');
});

require __DIR__.'/auth.php';
