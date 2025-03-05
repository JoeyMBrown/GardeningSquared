<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAddressRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'street_address' => 'required|string|max:255',
            'unit_number' => 'nullable|string|max:255',
            'city' => 'required|string|max:255',
            'state_province_region' => 'required|string|max:255',
            'postal_code' => 'required|string|max:255',
            'country' => 'nullable|string|max:255'
        ];
    }
}
