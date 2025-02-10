<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('plant_types', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('description')->nullable();
            $table->integer('growth_time_min')->nullable()->comment('The shortest number of days it takes for the plant to grow from seed to harvest.');
            $table->integer('growth_time_max')->nullable()->comment('The longest number of days it takes for the plant to grow from seed to harvest.');
            $table->integer('indoor_seed_start_date')->nullable()->comment('The earliest date (in days) to start seeds indoors for the plant to be ready to plant outside after the last frost date.');
            $table->integer('outdoor_seed_start_date')->nullable()->comment('The earliest date (in days) to start seeds outdoors after the last frost date.');
            $table->integer('transplant_date')->nullable()->comment('The earliest date (in days) to transition the plant from indoors to outdoors after the last frost date.');
            $table->integer('last_plant_date')->nullable()->comment('The latest date (in days) to plant the plant outdoors after the last frost date.');
            $table->integer('recommended_watering_frequency')->nullable()->comment('The recommended watering frequency for the plant in days.');
            $table->integer('recommended_fertilizing_frequency')->nullable()->comment('The recommended fertilizing frequency for the plant in days.');
            $table->integer('recommended_pest_control_frequency')->nullable()->comment('The recommended pest control frequency for the plant in days.');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plant_types');
    }
};
