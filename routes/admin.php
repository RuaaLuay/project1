<?php

use App\Http\Controllers\AdminAuth\RegisteredUserController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Admin\AdminManagementController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminAuth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\AdminAuth\ConfirmablePasswordController;
use App\Http\Controllers\AdminAuth\EmailVerificationNotificationController;
use App\Http\Controllers\AdminAuth\EmailVerificationPromptController;
use App\Http\Controllers\AdminAuth\NewPasswordController;
use App\Http\Controllers\AdminAuth\PasswordController;
use App\Http\Controllers\AdminAuth\PasswordResetLinkController;
use App\Http\Controllers\AdminAuth\VerifyEmailController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
//
//
Route::prefix('admin')->group(function () {
//    Route::post('/register', [RegisteredUserController::class, 'store'])->name('admin.register');
//    Route::get('/register', [RegisteredUserController::class, 'create'])->name('admin-register');
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('admin-login')->middleware('check-auth');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('admin.login')->middleware('check-auth');
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('admin-logout')->middleware('admin');
    Route::get('/dashboard', function () {
        return view('Admin.Pages.Index');
    })->name('admin-dashboard')->middleware('admin');
    Route::get('/users',[UserManagementController::class, 'index'])->name('users.all')->middleware('role:Manager|Editor|Super Admin,admin');
    Route::post('/users/add',[UserManagementController::class, 'create'])->middleware('role:Manager|Super Admin,admin');
    Route::get('/view',[UserManagementController::class, 'view'])->middleware('role:Manager|Editor|Super Admin,admin');
    Route::post('/users/delete/{id}',[UserManagementController::class, 'destroy'])->middleware('role:Manager|Super Admin,admin');
    Route::get('/users/edit/{id}',[UserManagementController::class, 'edit'])->middleware('role:Manager|Editor|Super Admin,admin');
    Route::post('/users/edit',[UserManagementController::class, 'update'])->middleware('role:Manager|Editor|Super Admin,admin');

    Route::get('/admins',[AdminManagementController::class, 'index'])->name('admins.all')->middleware('role:Super Admin|Manager,admin');
    Route::get('/admins/edit/{id}',[AdminManagementController::class, 'edit'])->middleware('role:Super Admin,admin');
    Route::post('/admins/edit',[AdminManagementController::class, 'update'])->middleware('role:Super Admin,admin');
    Route::post('/admins/delete/{id}',[AdminManagementController::class, 'destroy'])->middleware('role:Super Admin,admin');
    Route::post('/admins/add',[AdminManagementController::class, 'create'])->middleware('role:Super Admin,admin');


});


Route::middleware('role:Manager|Super Admin,admin')->name('admin.')->prefix('admin')->group(function (){
    Route::resource('/roles', RoleController::class);
    Route::resource('/permissions', PermissionController::class);
});

//Route::post('/users/edit',[UserManagementController::class, 'update'])->middleware('admin');


