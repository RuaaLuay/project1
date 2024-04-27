<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function view($id)
    {
        $user = User::findorfail($id);
        return view('User.Pages.profile')->with(['user'=>$user]);
    }

    public function update(Request $request)
    {
        if ($request->file('avatar')) {
//            $path = $imagePath;
            $image = $request->file('avatar');
            $image_name = time();
            $extension = $image->extension();
            $path = "uploads/avatars/$image_name" . '.' . $extension;
            Storage::disk('public')->put($path, file_get_contents($image));
            // Create a new user
        } /*else {
            $path = null;
        }*/
        // Find the user by their ID
        $user = User::find($request->input('id'));
        if (!$user) {
            return response()->json('Error');
        }

        // Update the user's attributes
        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->file('avatar')) {
            $user->image = $path; // Assuming $path is the new image path
        }

        // Save the changes to the database
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'User has been updated!',
//            'user' => $user, // Include user data if needed
        ]);
    }
}
