<?php

namespace App\Providers;

use App\Models\Bed;
use App\Models\Garden;
use App\Policies\BedPolicy;
use App\Policies\GardenPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Gate::policy(Bed::class, BedPolicy::class);
        Gate::policy(Garden::class, GardenPolicy::class);
    }
}
