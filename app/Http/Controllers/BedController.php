<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBedRequest;
use App\Http\Requests\UpdateBedRequest;
use App\Models\Bed;
use App\Models\Garden;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class BedController extends Controller
{
    public function create(Request $request, Garden $garden)
    {
        // TODO: This whole thing will need reworked.
        // Once routes are refactored to follow gardens/{garden}/beds/{bed}
        // we can use the policy to authorize the action.

        return Inertia::render('Beds/Create', [
            'garden' => $garden,
            'success' => session('success')
        ]);
    }

    public function store(StoreBedRequest $request, Garden $garden)
    {
        Gate::authorize('create', Bed::class);
        
        $data = $request->validated();

        $bed = Bed::create($data);

        // TODO: Update to use new alert component when built.
        return redirect()
            ->route('gardens.beds.show', [
                'garden' => $garden->id,
                'bed' => $bed->id
            ])
            ->with('success', 'Bed added successfully.');
    }

    public function show(Garden $garden, Bed $bed)
    {
        Gate::authorize('view', $bed);

        return Inertia::render('Beds/Show', [
            'bed' => $bed->load(['garden', 'plants.plantType']),
            'success' => session('success')
        ]);
    }

    public function edit(Garden $garden, Bed $bed)
    {
        Gate::authorize('update', $bed);

        return Inertia::render('Beds/Edit', [
            'bed' => $bed,
            'garden' => $bed->garden,
            'success' => session('success')
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
            ->with('success', 'Bed updated successfully.');
    }

    public function destroy(Garden $garden, Bed $bed)
    {
        Gate::authorize('delete', $bed);

        $bed->delete();

        return redirect()
            ->route('gardens.show', [
                'garden' => $garden->id
            ])
            ->with('success', 'Bed deleted successfully.');
    }
} 