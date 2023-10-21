<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;
use Auth;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UserController extends Controller
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    public function getUser($id)
    {
        // Sử dụng id để lấy dữ liệu người dùng từ cơ sở dữ liệu
        $user = User::find($id);
    
        // Kiểm tra xem người dùng có tồn tại hay không
        if (!$user) {
            return response()->json(['message' => 'Người dùng không tồn tại'], 404);
        }
    
        return response()->json($user);
    }
    
    public function register(RegisterRequest $request)
    {
     
        // return ($request->all());

        $data = $request->validated();
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $avatarPath = $avatar->store('avatars', 'public'); // Lưu ảnh vào thư mục 'avatars' trong storage/public
            $data['avatar'] = $avatarPath; // Lưu đường dẫn đến ảnh vào cơ sở dữ liệu
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
