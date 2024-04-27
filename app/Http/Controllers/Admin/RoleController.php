<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddRoleRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::with('permissions')->get();
        $permissions = Permission::where('guard_name','admin')->get();
        // Calculate the user counts for each role and add them to the roles array
        foreach ($roles as $role) {
            $role->userCount = $role->users()->count();
        }
        return view('Admin.Pages.roles.roles')->with(['roles'=>$roles,'permissions'=>$permissions]);
    }

    public function store(AddRoleRequest $request)
    {
        // Create the role
        $role = Role::create(['name' => $request->input('name'),
            'guard_name' => 'admin', // Replace 'your_guard_name' with the actual guard name
        ]);

        // Get an array of permission names from the request
//        $permissions = $request->input('checkedValues');
        $permissions = explode(',', $request->input('checkedValues'));


        foreach ($permissions as $permission){
            $role->givePermissionTo($permission);
            // Check if the assigned permission is "edit user"
            if ($permission === 'Edit user'|| $permission === 'Delete user') {
                // If "edit user" is assigned, also assign the default permission "show user"
                $role->givePermissionTo('Show user');
            }
            $role->givePermissionTo($permission);
        }
        return response()->json([
                'status' => true,
                'message' => 'Role has been added!',
            ]
        );
    }

    public function show($id)
    {
        $role = Role::with('permissions')->find($id);
        $permissions = Permission::where('guard_name','admin')->get();
        return view('Admin.Pages.roles.update')->with(['role'=>$role,'permissions'=>$permissions]);
    }

    public function update(AddRoleRequest $request)
    {
        $role = Role::find($request->input('id'));
        if (!$role) {
            return response()->json('Error');
        }
        // Get all permissions associated with the role
        $permissions = $role->permissions;
        // Revoke each permission
        foreach ($permissions as $permission) {
            $role->revokePermissionTo($permission);
        }
        // Update the user's attributes
        $role->name = $request->input('name');
        $role->save();
        $permissions = $request->input('checkedValues');
        // Check if $permissions is an array and convert it to a comma-separated string if needed
        if (is_array($permissions)) {
            $permissions = implode(',', $permissions);
        }
        // Now $permissions should be a comma-separated string
        $permissionsArray = explode(',', $permissions);

        foreach ($permissionsArray  as $permission){
            $role->givePermissionTo($permission);
            // Check if the assigned permission is "edit user"
            if ($permission === 'Edit user'|| $permission === 'Delete user') {
                // If "edit user" is assigned, also assign the default permission "show user"
                $role->givePermissionTo('Show user');
            }
            $role->givePermissionTo($permission);
        }
        // Save the changes to the database
        return response()->json([
            'status' => true,
            'message' => 'Role has been updated!',
'data'=> route('admin.roles.index')
//            'user' => $user, // Include user data if needed
        ]);
    }

}
