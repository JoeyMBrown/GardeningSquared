<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrUpdatePlantRequest;
use App\Models\Bed;
use App\Models\Garden;
use App\Models\Plant;
use App\Models\PlantEventType;
use App\Services\PlantTypeService;
use App\Support\SnackBarAlert;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class PlantController extends Controller
{
    use AuthorizesRequests;

    protected $plantTypeService;

    public function __construct(PlantTypeService $plantTypeService)
    {
        $this->authorizeResource(
            Plant::class,
            'plant',
            [ 'except' => ['create', 'store'] ]
        );
        $this->plantTypeService = $plantTypeService;
    }

    public function create(Garden $garden, Bed $bed)
    {   
        // We delay the authorization until we're able to fetch the bed model
        // and pass it to the policy for authorization.  We can use the bed
        // model to load the associated garden model, and verify that the user
        // has access to the garden they're trying to create a plant in.
        $this->authorize('create', [Plant::class, $garden]);

        return Inertia::render('Plants/Create', [
            'garden' => $garden,
            'bed' => $bed,
            'plantTypes' => $this->plantTypeService->getOrderedPlantTypes($garden)
        ]);
    }

    public function store(StoreOrUpdatePlantRequest $request, Garden $garden, Bed $bed)
    {
        $validated = $request->validated();

        // We delay the authorization until we're able to fetch the bed model
        // and pass it to the policy for authorization.  We can use the bed
        // model to load the associated garden model, and verify that the user
        // has access to the garden they're trying to create a plant in.
        $this->authorize('create', [Plant::class, $garden]);

        Plant::create($validated);

        return redirect()
            ->route('gardens.beds.show', [
                $garden,
                $bed
            ])
            ->with('success', 'Plant added successfully.');
    }
    
    public function edit(Garden $garden, Bed $bed, Plant $plant)
    {    
        return Inertia::render('Plants/Edit', [
            'plant' => $plant,
            'garden' => $garden,
            'bed' => $bed,
            'beds' => $garden->beds,
            'plantTypes' => $this->plantTypeService->getOrderedPlantTypes($garden)
        ]);
    }
    
    public function update(StoreOrUpdatePlantRequest $request, Garden $garden, Bed $bed, Plant $plant)
    {
        $validated = $request->validated();
        
        $plant->update($validated);
        
        return redirect()
            ->route('gardens.beds.show', [
                $garden,
                $bed
            ])
            ->with('success', 'Plant updated successfully.');
    }
    
    public function destroy(Garden $garden, Bed $bed, Plant $plant)
    {
        $plant->delete();
        
        return redirect()
            ->route('gardens.beds.show', [
                $garden,
                $bed
            ])
            ->with('success', 'Plant deleted successfully.');
    }

    public function show(Garden $garden, Bed $bed, Plant $plant)
    {
        Gate::authorize('view', $plant);

        return Inertia::render('Plants/Show', [
            'plant' => $plant->load(['plantType', 'plantEvents.plantEventType']),
            'garden' => $garden,
            'bed' => $bed,
            'plantEventTypes' => PlantEventType::all(),
        ]);
    }

    public function storeEvent(Garden $garden, Bed $bed, Plant $plant)
    {
        Gate::authorize('update', $plant);

        // TODO: Move to request class.
        $validated = request()->validate([
            'plant_event_type_id' => 'required|exists:plant_event_types,id',
            'notes' => 'nullable|string|max:1000',
        ]);

        $plantEvent = $plant->plantEvents()->create($validated);

        return back()->with('alert', new SnackBarAlert("Plant {$plantEvent->plantEventType->name} recorded successfully."));
    }
} 