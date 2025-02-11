<?php

namespace App\Http\Controllers;

use App\Models\Garden;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GardenController extends Controller
{
    public function create()
    {
        return Inertia::render('Gardens/Create', [
            'addresses' => Auth::user()->addresses
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address_id' => 'required|exists:addresses,id',
        ]);

        $garden = Garden::create($validated);

        // Attach the current user to the garden
        $garden->users()->attach(Auth::id());

        return redirect()->route('gardens.index')
            ->with('success', 'Garden created successfully.');
    }

    public function show(Garden $garden)
    {
        return Inertia::render('Gardens/Show', [
            'garden' => $garden->load('address')
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
            'garden' => $garden
        ]);
    }
} 
