<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrUpdateGardenRequest;
use App\Models\Garden;
use App\Services\GardenService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GardenController extends Controller
{
    use AuthorizesRequests;

    protected $gardenService;

    public function __construct(GardenService $gardenService)
    {
        $this->authorizeResource(Garden::class, 'garden');
        $this->gardenService = $gardenService;
    }

    public function create()
    {
        return Inertia::render('Gardens/Create', [
            'addresses' => Auth::user()->addresses
        ]);
    }

    public function store(StoreOrUpdateGardenRequest $request)
    {
        $data = $request->validated();

        $garden = Garden::create($data);

        $garden->users()->attach(Auth::id());

        // TODO: Update flash message to use new alert
        return redirect()
            ->route('gardens.index')
            ->with('success', 'Garden created successfully.');
    }

    public function show(Garden $garden)
    {
        return Inertia::render('Gardens/Show', [
            'garden' => $garden->load(['address', 'beds.plants.plantType'])
        ]);
    }

    public function index()
    {
        return Inertia::render('Gardens/Index', [
            'gardens' => Auth::user()->gardens->load('address')
        ]);
    }

    public function edit(Garden $garden)
    {
        return Inertia::render('Gardens/Edit', [
            'garden' => $garden,
            'addresses' => Auth::user()->addresses
        ]);
    }

    public function update(StoreOrUpdateGardenRequest $request, Garden $garden)
    {
        $data = $request->validated();

        $garden->update($data);

        return redirect()
            ->route('gardens.index')
            ->with('success', 'Garden updated successfully.');  
    }

    public function destroy(Garden $garden)
    {
        try {
            $this->gardenService->delete($garden);
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Failed to delete garden. Please try again.');
        }

        return redirect()
            ->route('gardens.index')
            ->with('success', 'Garden deleted successfully.');
    }
} 
