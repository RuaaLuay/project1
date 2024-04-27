<?php

namespace App\Http\Controllers\Admin;

use App\DataTables\AdminsDataTable;
use App\Http\Controllers\Controller;
use App\Http\Requests\AddUserRequest;
use App\Models\Admin;

//use App\Models\Student;
//use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;
use Spatie\Permission\Models\Role;
use Yajra\DataTables\DataTables;

//use App\DataTables\UsersDataTable;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;


class AdminManagementController extends Controller
{
    public function index(AdminsDataTable $dataTable)
    {
        // Create an array with some data
//        $roles = Role::all('name');
//        $data = [
//            'key1' => 'value1',
//            'key2' => 'value2',
//            // Add more key-value pairs as needed
//        ];
//        $dataTable->with(['roles' => $roles]);
        $roles = Role::all('name');

//        return $dataTable->render('Admin.Pages.admin-managment.list');
        return $dataTable->render('Admin.Pages.admin-managment.list', compact('roles'));




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

//    public function view(): View
//    {
//        return view('Admin.Pages.user-managment.view');
//    }
//
    public function create(AddUserRequest $request)
    {
//        $imagePath = $request->file('avatar')->store('images'); // 'images' is the storage directory
//        if ($request->file('avatar')) {
////            $path = $imagePath;
//            $image = $request->file('avatar');
//            $image_name = time();
//            $extension = $image->extension();
//            $path = "uploads/avatars/$image_name" . '.' . $extension;
//            Storage::disk('public')->put($path, file_get_contents($image));
//            // Create a new user
//        } else {
//            $path = null;
//        }
        $admin = Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
//            'image' => $path
        ]);
//        $user->guardName('your_guard_name')->assignRole('writer');

        $admin->assignRole($request->role);

        $admin->save();
        return response()->json([
            'status' => true,
            'message' => 'Form has been successfully submitted!',
//            'user' => $user, // Include user data if needed
        ]);
    }
//
    public function destroy(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);
        $admin->delete();
        return response()->json([
            'status' => true,
            'message' => 'Admin has been deleted successfully',
//            'user' => $user, // Include user data if needed
        ]);
    }

//
    public function edit(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);
        $roles = Role::all('name');
        if ($admin) {
            return view('Admin.Pages.admin-managment.view')->with('admin', $admin)->with('roles',$roles);
        } else {
            return response()->json('Error');
        }
    }

//
    public function update(AddUserRequest $request)
    {
        // Find the user by their ID
        $admin = Admin::find($request->input('id'));
        if (!$admin) {
            return response()->json('Error');
        }

        // Update the user's attributes
        $admin->name = $request->name;
        $admin->email = $request->email;
        // Save the changes to the database

        $admin->roles()->detach(); // This will remove all roles from the user
        $admin->assignRole('Editor');
        $admin->save();
        return response()->json([
            'status' => true,
            'message' => 'Admin has been updated!',
//            'user' => $user, // Include user data if needed
        ]);
    }
}
