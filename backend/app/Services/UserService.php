<?php 
namespace App\Services;

use App\Models\User;
use Auth;
use Exception;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function createUser(array $data)
    {
        try {
            User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'role' => $data['role'],
                'avatar' => $data['avatar'] 
            ]);    
         
            return true;
        } catch (Exception $e) {
            throw $e;
        }
    }

	public function loginUser(array $credentials)
    {
        try {
            if (!Auth::attempt($credentials)) {
                return response()->json(['message' => 'Provided email or password is incorrect.'], 422);
            }else {
    
                $user = Auth::user();
                $token = $user->createToken('userToken')->plainTextToken;
                $message = 'Login successfully';
                $info = compact('user', 'token', 'message');
    
                return $info;
            }
        } catch (Exception $e) {
            throw $e;
        }
    }

}
