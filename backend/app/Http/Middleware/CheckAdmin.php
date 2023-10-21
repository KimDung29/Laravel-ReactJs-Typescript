<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle( $request, Closure $next)
    {
        $id = $request->header("X-Id");
        $user = User::find($id);

        if($user && $user->role === "admin") {
            return $next($request);
        } 
        return response('Unauthorized', 403);
    }
}
