<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (auth()->guard('user')->check()) {
            Auth::guard('user')->logout();

            $request->session()->invalidate();

            $request->session()->regenerateToken();
        }
        if (auth()->guard('admin')->check()) { // 'web' guard for users
            return $next($request);
        }
        return redirect('/admin/login'); // Redirect to user login page
    }
}
