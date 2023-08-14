<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Room;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Room",
 *     required={"id", "room_number", "department"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="room_number", type="string", example="421"),
 *     @OA\Property(property="status", type="string", example="FREE"),
 *     @OA\Property(property="department", type="string", example="Department1")
 * )
 */
class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    /**
     * @OA\Get(
     *     path="/api/rooms",
     *     operationId="getRooms",
     *     tags={"Rooms"},
     *     summary="Get all rooms",
     *     description="Retrieve all rooms",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="rooms", type="array", @OA\Items(ref="#/components/schemas/Room"))
     *         )
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     */
    public function index()
    {

        $room = Room::all();

        return response()->json([
            'rooms' => $room
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $department = Department::all();
        return response()->json([
            'rooms' => $department
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    /**
     * @OA\Post(
     *     path="/api/rooms",
     *     operationId="createRoom",
     *     tags={"Rooms"},
     *     summary="Create a new room",
     *     description="Store a newly created room in storage",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Room")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Room created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Room was created successfully.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Something went wrong",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Something went wrong!")
     *         )
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     */
    public function store(Request $request)
    {
        $data = $request->except('_token');

        if (Room::create($data)) {
            return response()->json(['message' => 'Room was created successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $room = Room::findOrFail($id);

        return response()->json([
            'rooms' => $room
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    /**
     * @OA\Put(
     *     path="/api/rooms/{id}",
     *     operationId="updateRoom",
     *     tags={"Rooms"},
     *     summary="Update an existing room",
     *     description="Update the details of an existing room",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the room to update",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Room")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Room updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Room was updated successfully.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Something went wrong",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Something went wrong!")
     *         )
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     */
    public function update(Request $request, string $id)
    {
        $room = Room::findOrFail($id);
        $room->room_number = $request['room_number'];
        $room->department = $request['department'];
        $room->status = $request['status'];

        if ($room->save()) {
            return response()->json(['message' => 'Room was updated successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
     * @OA\Delete(
     *     path="/api/rooms/{id}",
     *     operationId="deleteRoom",
     *     tags={"Rooms"},
     *     summary="Delete a room",
     *     description="Delete a room by its ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the room to delete",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Room deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Room was deleted successfully.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Something went wrong",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Something went wrong!")
     *         )
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     */
    public function destroy(string $id)
    {
        $room = Room::findOrFail($id);

        if ($room->delete()) {
            return response()->json(['message' => 'Doctor was deleted successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }
}
