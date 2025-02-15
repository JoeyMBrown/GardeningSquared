<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AddressFactory extends Factory
{
    public function definition(): array
    {
        return [
            'street_address' => $this->faker->streetAddress(),
            'unit_number' => $this->faker->optional(0.3)->buildingNumber(),
            'city' => $this->faker->city(),
            'state_province_region' => $this->faker->state(),
            'postal_code' => $this->faker->postcode(),
            'country' => $this->faker->country(),
        ];
    }
} 