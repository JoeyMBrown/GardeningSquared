<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrUpdatePlantRequest;
use App\Models\Bed;
use App\Models\Garden;
use App\Models\Plant;
use App\Services\PlantTypeService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Routing\Controller;
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
} 