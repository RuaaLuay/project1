<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddUserRequest;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;
use Yajra\DataTables\DataTables;
use App\DataTables\UsersDataTable;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;


class UserManagementController extends Controller
{
    public function index(UsersDataTable $dataTable)
    {
        return $dataTable->render('Admin.Pages.user-managment.list');

//        if ($request->ajax()) {
//            $data = User::select('*');
//            return Datatables::of($data)
//                ->addIndexColumn()
//                ->addColumn('action', function($row){
//
//                    $btn = '<a href="javascript:void(0)" class="edit btn btn-primary btn-sm">View</a>';
//
//                    return $btn;
//                })
//                ->rawColumns(['action'])
//                ->make(true);
//        }
//        return view('Admin.Pages.user-managment.list');
//
//        return view('users');
//        $data = Student::select('*');
//        $students = DataTables::of($data)
//            ->addIndexColumn()
//            ->make(true);
////        dd($students);
//        return view('Admin.Pages.user-managment.list');
    }

    public function view(): View
    {
        return view('Admin.Pages.user-managment.view');
    }

    public function create(AddUserRequest $request)
    {
//        $imagePath = $request->file('avatar')->store('images'); // 'images' is the storage directory
        if ($request->file('avatar')) {
//            $path = $imagePath;
            $image = $request->file('avatar');
            $image_name = time();
            $extension = $image->extension();
            $path = "uploads/avatars/$image_name" . '.' . $extension;
            Storage::disk('public')->put($path, file_get_contents($image));
            // Create a new user
        } else {
            $path = null;
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'image' => $path
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Form has been successfully submitted!',
//            'user' => $user, // Include user data if needed
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json([
            'status' => true,
            'message' => 'User has been deleted successfully',
//            'user' => $user, // Include user data if needed
        ]);
    }

    public function edit(Request $request, $id)
    {
        $user = User::findOrFail($id);
        if ($user) {
            return view('Admin.Pages.user-managment.view')->with('user', $user);
        } else {
            return response()->json('Error');
        }
    }

    public function update(AddUserRequest $request)
    {
//        $imagePath = $request->file('avatar')->store('images'); // 'images' is the storage directory
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
