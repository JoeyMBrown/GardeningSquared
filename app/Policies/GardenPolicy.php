<?php

namespace App\Policies;

use App\Models\Garden;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class GardenPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Garden $garden): Response
    {
        $isOwner = $user->gardens()->where('garden_id', $garden->id)->exists();

        return $isOwner
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Garden $garden): Response
    {
        $isOwner = $user->gardens()->where('garden_id', $garden->id)->exists();

        return $isOwner
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Garden $garden): Response
    {
        $isOwner = $user->gardens()->where('garden_id', $garden->id)->exists();

        return $isOwner
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Garden $garden): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Garden $garden): bool
    {
        return false;
    }
}
