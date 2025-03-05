<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAddressRequest;
use App\Models\Address;

class AddressController extends Controller
{
    public function store(StoreAddressRequest $request)
    {
        $validated = $request->validated();

        // Create the address
        $address = Address::create($validated);
        
        // Attach the address to the authenticated user
        $request->user()->addresses()->attach($address->id);

        return back()->with('address', $address);
    }
} 