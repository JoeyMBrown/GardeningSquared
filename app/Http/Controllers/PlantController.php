<?php

namespace App\Http\Controllers;

use App\Models\Plant;
use App\Models\Garden;
use App\Models\PlantType;
use App\Services\PlantTypeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PlantController extends Controller
{
    protected $plantTypeService;

    public function __construct(PlantTypeService $plantTypeService)
    {
        $this->plantTypeService = $plantTypeService;
    }

    public function create(Request $request)
    {
        $garden = Garden::findOrFail($request->garden);

        // Ensure user has access to this garden
        // TODO: this should be a policy
        if (!$garden->users->contains(Auth::id())) {
            abort(403);
        }

        return Inertia::render('Plants/Create', [
            'garden' => $garden,
            'plantTypes' => $this->plantTypeService->getOrderedPlantTypes($garden)
        ]);
    }

    public function store(Request $request)
    {
        // TODO: this should be a form request
        $validated = $request->validate([
            'garden_id' => 'required|exists:gardens,id',
            'plant_type_id' => 'required|exists:plant_types,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'seed_start_date' => 'nullable|date',
            'transplant_date' => 'nullable|date|after_or_equal:seed_start_date',
        ]);

        // Ensure user has access to this garden
        // TODO: this should be a policy
        $garden = Garden::findOrFail($validated['garden_id']);
        if (!$garden->users->contains(Auth::id())) {
            abort(403);
        }

        $plant = Plant::create($validated);

        return redirect()->route('gardens.show', $garden)
            ->with('success', 'Plant added successfully.');
    }
} 