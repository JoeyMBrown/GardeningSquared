<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrUpdatePlantRequest extends FormRequest
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
            'bed_id' => 'required|exists:beds,id',
            'plant_type_id' => 'required|exists:plant_types,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'seed_start_date' => 'nullable|date',
            'transplant_date' => 'nullable|date|after_or_equal:seed_start_date'
        ];
    }
}
