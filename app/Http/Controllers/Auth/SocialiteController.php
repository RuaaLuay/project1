<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SocialiteController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $user = Socialite::driver('google')->stateless()->user();
        $user = User::updateOrCreate([
            'google_id' => $user->id,
        ], [
            'name' => $user->name,
            'email' => $user->email,
        ]);

        Auth::guard('user')->login($user);
        return redirect()->route('user-dashboard');
//
//        return redirect('/dashboard');
        // Use $user to create or authenticate a user in your application
        dd($user);
        //  return redirect('/user/dashboard'); // Redirect to a dashboard or profile page
    }
}
