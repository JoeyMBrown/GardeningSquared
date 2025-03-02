<?php

namespace App\Policies;

use App\Models\Bed;
use App\Models\Garden;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class BedPolicy
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
    public function view(User $user, Bed $bed): Response
    {
        $garden = Garden::findOrFail($bed->garden_id)
            ->with('users')
            ->first();

        $isOwner = false;

        // A garden can have many owners, we need to check if the user is one of them.
        foreach ($garden->users as $gardenUser) {

            if ($gardenUser->id === $user->id) {
                $isOwner = true;
                break;
            }
        }

        // Here we can deny as not found to avoid exposing if the resource exists or not.
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
    public function update(User $user, Bed $bed): Response
    {
        $garden = Garden::findOrFail($bed->garden_id)
            ->with('users')
            ->first();

        $isOwner = false;

        foreach ($garden->users as $gardenUser) {

            if ($gardenUser->id === $user->id) {
                $isOwner = true;
                break;
            }
        }

        return $isOwner
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Bed $bed): Response
    {
        $garden = Garden::findOrFail($bed->garden_id)
        ->with('users')
        ->first();

        $isOwner = false;

        foreach ($garden->users as $gardenUser) {

            if ($gardenUser->id === $user->id) {
                $isOwner = true;
                break;
            }
        }

        return $isOwner
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Bed $bed): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Bed $bed): bool
    {
        return false;
    }
}
