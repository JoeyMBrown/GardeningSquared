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
        Schema::create('beds', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('garden_id')->index();
            $table->string('name');
            $table->string('description')->nullable();
            $table->decimal('length', 7, 2)->comment('Length of the bed in inches');
            $table->decimal('width', 7, 2)->comment('Width of the bed in inches');
            $table->decimal('height', 7, 2)->comment('Height of the bed in inches');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beds');
    }
};
