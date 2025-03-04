<?php

namespace App\Services;

use App\Models\Garden;
use Illuminate\Support\Facades\DB;

class GardenService
{
    public function delete(Garden $garden)
    {
        DB::beginTransaction();
        
        try {
            // Soft delete all related beds
            foreach ($garden->beds as $bed) {
                $bed->plants()->delete();
                $bed->delete();
            }
            
            // Soft delete the garden
            $garden->delete();
            
            // Commit the transaction
            DB::commit();
        } catch (\Exception $e) {
            // Rollback the transaction if something goes wrong
            DB::rollBack();

            throw $e;
        }
    }
}
