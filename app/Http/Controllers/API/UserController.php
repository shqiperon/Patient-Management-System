<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="User",
 *     required={"name", "email", "password"},
 *     @OA\Property(property="id", type="integer", format="int64"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="email", type="string", format="email"),
 *     @OA\Property(property="password", type="string", format="password"),
 *     @OA\Property(property="email_verified_at", type="string", format="date-time"),
 *     @OA\Property(property="remember_token", type="string"),
 *     @OA\Property(property="two_factor_recovery_codes", type="array", @OA\Items(type="string")),
 *     @OA\Property(property="two_factor_secret", type="string"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time"),
 *     @OA\Property(property="profile_photo_url", type="string")
 * )
 */
class UserController extends Controller
{
    /**
     * Register a new user.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */

    /**
     * @OA\Post(
     *     path="/api/register",
     *     summary="Register a new user",
     *     tags={"Users"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User registered successfully",
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation errors",
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     * )
     */

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
        ]);
    }

    /**
     * Log in a user.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @OA\Post(
     *     path="/api/login",
     *     summary="User login",
     *     tags={"Users"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="email", type="string", format="email"),
     *             @OA\Property(property="password", type="string", format="password"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful login",
     *         @OA\JsonContent(
     *             @OA\Property(property="user", ref="#/components/schemas/User"),
     *             @OA\Property(property="userType", type="string"),
     *             @OA\Property(property="access_token", type="string"),
     *             @OA\Property(property="token_type", type="string"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Invalid credentials",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string"),
     *         ),
     *     ),
     * )
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('MyApp')->plainTextToken;

            return response()->json([
                'user' => $user,
                'userType' => $user->usertype, // Include the userType field in the response
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]);
        }


        return response()->json([
            'message' => 'Invalid credentials',
        ], 401);
    }

    /**
     * @OA\Get(
     *     path="/api/users/{id}",
     *     summary="Get user by ID",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="User ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User found",
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string")
     *         )
     *     ),
     * )
     */
    public function getUser($id)
    {
        $user = User::find($id);

        if ($user) {
            return response()->json([
                'name' => $user->name,
            ]);
        }

        return response()->json(['error' => 'User not found'], 404);
    }


    /**
     * Get all users.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @OA\Get(
     *     path="/api/users",
     *     summary="Get all users",
     *     tags={"Users"},
     *     @OA\Response(
     *         response=200,
     *         description="List of users",
     *         @OA\JsonContent(
     *             @OA\Property(property="users", type="array", @OA\Items(ref="#/components/schemas/User"))
     *         )
     *     )
     * )
     */
    public function index()
    {
        $users = User::all();

        return response()->json(['users' => $users]);
    }
}
