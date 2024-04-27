<?php

use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;

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

Route::post('/register', [RegisteredUserController::class, 'store'])->name('user.register')->middleware('check-auth');
Route::get('/dashboard', function () {
    return view('User.Pages.Index');
})->name('user-dashboard')->middleware('user');
Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('user-login')->middleware('check-auth');
Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('user.login')->middleware('check-auth');
Route::get('/register', [RegisteredUserController::class, 'create'])->name('user-register')->middleware('check-auth');
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('user-logout')->middleware('user');
Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])
    ->name('password.request');
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
    ->name('password.email');
Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])
    ->name('password.reset');
Route::post('/reset-password', [NewPasswordController::class, 'store'])
    ->name('password.store');
Route::get('view/{id}', [UserController::class, 'view'])->middleware('user');
Route::get('/auth/google', [SocialiteController::class, 'redirectToGoogle'])->middleware('check-auth');
Route::get('/auth/google/callback', [SocialiteController::class, 'handleGoogleCallback'])->middleware('check-auth');
Route::get('/', function () {
    return view('User.Pages.Index');
})->middleware('user');
