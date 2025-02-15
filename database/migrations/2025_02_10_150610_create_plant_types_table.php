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
            $table->integer('plant_spacing')->nullable()->comment('The number of inches between this plant and others in the garden.');
            $table->integer('plant_depth')->nullable()->comment('The number of inches below the surface of the soil that the plant should be planted.');
            $table->integer('sun_needed')->nullable()->comment('How much sun the plant needs in minutes per day.');
            $table->integer('germination_days')->nullable()->comment('The number of days it takes for the plant to germinate from seed.');
            $table->integer('growth_days_min')->nullable()->comment('The shortest number of days it takes for the plant to grow from seed to harvest.');
            $table->integer('growth_days_max')->nullable()->comment('The longest number of days it takes for the plant to grow from seed to harvest.');
            $table->integer('indoor_seed_start_days')->nullable()->comment('How many days before last frost date to start seeds indoors for the plant to be ready to plant outside after the last frost date.');
            $table->integer('outdoor_seed_start_days')->nullable()->comment('How many days after last frost date to start seeds outdoors.');
            $table->integer('transplant_days')->nullable()->comment('How many days after last frost date to transition the plant from indoors to outdoors.');
            $table->integer('last_plant_days')->nullable()->comment('The number of days after last frost date to plant the plant outdoors and still have time to harvest before the first frost date.');
            $table->integer('watering_frequency')->nullable()->comment('How many days between watering the plant.');
            $table->integer('fertilizing_frequency')->nullable()->comment('How many days between fertilizing the plant.');
            $table->integer('pest_control_frequency')->nullable()->comment('How many days between pest controlling the plant.');
            $table->string('image_url')->nullable()->comment('The URL of the image for the plant.');
            $table->foreignUuid('created_by_user_id')->index()->comment('The user that created the plant type.');
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
