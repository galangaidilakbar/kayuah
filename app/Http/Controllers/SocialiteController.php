<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(string $driver)
    {
        return Socialite::driver($driver)->redirect();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $driver)
    {
        $currentUser = Socialite::driver($driver)->user();
        $providerId = $driver.'_id';

        // First check if a user with this email already exists
        $existingUser = User::where('email', $currentUser->email)->first();

        if ($existingUser) {
            // User exists with this email, update the social ID for this provider
            $existingUser->{$providerId} = $currentUser->id;
            $existingUser->save();

            $this->assignRoleVisitor($existingUser);

            Auth::login($existingUser, true);

            return redirect()->intended(route('dashboard', absolute: false));
        }

        // Otherwise create a new user or update existing one by provider ID
        $user = User::updateOrCreate(
            [$providerId => $currentUser->id],
            [
                'name' => $currentUser->name,
                'email' => $currentUser->email,
                'email_verified_at' => now(), // Only set this if it's a new record
            ]
        );

        $this->assignRoleVisitor($user);

        Auth::login($user, true);

        return redirect()->intended(route('dashboard', absolute: false));
    }

    protected function assignRoleVisitor(User $user)
    {
        if ($user->roles->isEmpty()) {
            $user->assignRole(Role::visitor->value);
        }
    }
}
