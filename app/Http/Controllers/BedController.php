<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBedRequest;
use App\Http\Requests\UpdateBedRequest;
use App\Models\Bed;
use App\Models\Garden;
use App\Support\SnackBarAlert;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class BedController extends Controller
{
    public function create(Garden $garden)
    {
        return Inertia::render('Beds/Create', [
            'garden' => $garden
        ]);
    }

    public function store(StoreBedRequest $request, Garden $garden)
    {
        Gate::authorize('create', Bed::class);
        
        $data = $request->validated();

        $bed = Bed::create($data);

        return redirect()
            ->route('gardens.beds.show', [
                'garden' => $garden->id,
                'bed' => $bed->id
            ])
            ->with('alert', new SnackBarAlert('Bed created successfully.'));
    }

    public function show(Garden $garden, Bed $bed)
    {
        Gate::authorize('view', $bed);

        return Inertia::render('Beds/Show', [
            'bed' => $bed->load(['plants.plantType']),
            'garden' => $garden
        ]);
    }

    public function edit(Garden $garden, Bed $bed)
    {
        Gate::authorize('update', $bed);

        return Inertia::render('Beds/Edit', [
            'bed' => $bed,
            'garden' => $garden
        ]);
    }

    public function update(UpdateBedRequest $request, Garden $garden, Bed $bed)
    {
        Gate::authorize('update', $bed);
        
        $validated = $request->validated();

        $bed->update($validated);

        return redirect()
            ->route('gardens.beds.show', [
                'garden' => $garden->id,
                'bed' => $bed->id
            ])
            ->with('alert', new SnackBarAlert('Bed updated successfully.'));
    }

    public function destroy(Garden $garden, Bed $bed)
    {
        Gate::authorize('delete', $bed);

        $bed->delete();

        return redirect()
            ->route('gardens.show', [
                'garden' => $garden->id
            ])
            ->with('alert', new SnackBarAlert('Bed deleted successfully.'));
    }
} 