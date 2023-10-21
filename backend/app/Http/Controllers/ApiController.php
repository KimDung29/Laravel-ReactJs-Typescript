<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Services\UserService;
use Exception;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    public function getUser($id)
    {
        // Find $id in users table 
        $user = User::find($id);
    
        // Check the id exists
        if (!$user) {
            return response()->json(['message' => 'User id does not exist'], 404);
        }
    
        return response()->json($user);
    }
    
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            // Store the avatar image into 'avatars' folder inside storage/app/public
            $avatarPath = $avatar->store('avatars', 'public');
            // Store the path to database (at avatar column)
            $data['avatar'] = $avatarPath; 
        }

        if ($this->userService->createUser($data)) {
            return response()->json(['message' => 'Created successfully'], 201);
        } else {
            return response()->json(['message' => 'Failed to create user'], 500);
        }
    }
    
    public function login(LoginRequest $request) {
        $credential = $request->validated();
        try{
            $result = $this->userService->loginUser($credential);

            return response()->json($result);
            
        }catch (Exception $e){
            return response()->json(['message' => `There are some errors: $e `], 500);
        }
    }

    public function logout(Request $request) {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
