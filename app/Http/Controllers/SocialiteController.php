<?php

namespace App\Http\Controllers;

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

        $user = User::updateOrCreate(
            [
                $providerId => $currentUser->id,
            ],
            [
                'name' => $currentUser->name,
                'email' => $currentUser->email,
            ]
        );

        Auth::login($user);

        return to_route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
