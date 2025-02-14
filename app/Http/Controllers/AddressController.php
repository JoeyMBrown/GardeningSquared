<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'street_address' => 'required|string|max:255',
            'unit_number' => 'nullable|string|max:255',
            'city' => 'required|string|max:255',
            'state_province_region' => 'required|string|max:255',
            'postal_code' => 'required|string|max:255',
            'country' => 'nullable|string|max:255',
        ]);

        // Create the address
        $address = Address::create($validated);
        
        // Attach the address to the authenticated user
        $request->user()->addresses()->attach($address->id);

        return back()->with('address', $address);
    }
} 