<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Room;
use Illuminate\Http\Request;
use DB;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Appointment",
 *     required={"name", "email", "date", "phone", "doctor", "user_id"},
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="email", type="string", format="email"),
 *     @OA\Property(property="date", type="string", format="date"),
 *     @OA\Property(property="phone", type="string"),
 *     @OA\Property(property="doctor", type="string"),
 *     @OA\Property(property="user_id", type="integer"),
 *     @OA\Property(property="message", type="string", nullable=true)
 * )
 */

class AdminController extends Controller
{
    
    /**
     * @OA\Post(
     *     path="/api/appointments",
     *     operationId="createAppointment",
     *     tags={"Admin"},
     *     summary="Create a new appointment",
     *     description="Creates a new appointment with the provided details",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Appointment")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Appointment created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Appointment")
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'date' => 'required|date',
            'phone' => 'required',
            'doctor' => 'required',
            'user_id' => 'required',
            'message' => 'nullable',
        ]);

        // Create a new appointment
        $appointment = Appointment::create($validatedData);

        // Return a response
        return response()->json($appointment, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/getUserId/{appointmentId}",
     *     operationId="getUserId",
     *     tags={"Admin"},
     *     summary="Get user ID of an appointment",
     *     description="Retrieve the user ID associated with the specified appointment",
     *     @OA\Parameter(
     *         name="appointmentId",
     *         in="path",
     *         description="ID of the appointment",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User ID retrieved successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="userId", type="integer", example=123)
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Appointment not found"
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     */
    public function getUserId($appointmentId)
    {
        $appointment = Appointment::find($appointmentId);

        if ($appointment) {
            $userId = $appointment->user_id;
            return $userId;
        }

        return null;
    }

    /**
     * @OA\Get(
     *     path="/api/appointments",
     *     operationId="getAppointmentsByUser",
     *     tags={"Admin"},
     *     summary="Get appointments by user ID",
     *     description="Retrieve appointments associated with the specified user ID",
     *     @OA\Parameter(
     *         name="userId",
     *         in="query",
     *         description="ID of the user",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Appointments retrieved successfully",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Appointment")
     *         )
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     */
    public function index(Request $request)
    {
        $userId = $request->input('userId');

        // Retrieve appointments based on the user's ID
        $appointments = Appointment::where('user_id', $userId)->get();

        return response()->json($appointments);
    }

    /**
     * @OA\Get(
     *     path="/api/showappointment",
     *     operationId="showAppointment",
     *     tags={"Admin"},
     *     summary="Show all appointments",
     *     description="Retrieve all appointments",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="showappointment", type="array", @OA\Items(ref="#/components/schemas/Appointment"))
     *         )
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     */
    public function showappointment()
    {
        $data = Appointment::all();
        return response()->json([
            'showappointment' => $data
        ], 200);
    }

    public function showrooms()
    {
        $rooms = Room::all();
        return response()->json([
            'showrooms' => $rooms
        ], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/sendtoroom/{id}",
     *     operationId="sendToRoom",
     *     tags={"Admin"},
     *     summary="Get appointment details by ID",
     *     description="Retrieve appointment details by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the appointment",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="sendtoroom", ref="#/components/schemas/Appointment")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Appointment not found"
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     */
    public function sendtoroom($id)
    {
        $data = Appointment::find($id);
        return response()->json([
            'sendtoroom' => $data
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="/api/updateNote/{id}",
     *     operationId="updateNote",
     *     tags={"Admin"},
     *     summary="Update appointment note",
     *     description="Update the note of an appointment",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the appointment",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Note updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Note updated successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Appointment not found"
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     */
    public function updateNote($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->note = 'laboratory test has been requested';
        $appointment->save();

        return response()->json(['message' => 'Note updated successfully']);
    }

    /**
     * @OA\Post(
     *     path="/api/updateNoteInAdvance/{id}",
     *     operationId="updateNoteInAdvance",
     *     tags={"Admin"},
     *     summary="Update appointment note in advance",
     *     description="Update the note of an appointment in advance",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the appointment",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Note updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Note updated successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Appointment not found"
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     */
    public function updateNoteInAdvance($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->note = 'test request will be sent soon';
        $appointment->save();

        return response()->json(['message' => 'Note updated successfully']);
    }

    /**
     * @OA\Put(
     *     path="/api/updatetable/{id}",
     *     operationId="updateTable",
     *     tags={"Admin"},
     *     summary="Update appointment table",
     *     description="Update the table of an appointment",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the appointment",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Updated appointment data",
     *         @OA\JsonContent(
     *             @OA\Property(property="room_department", type="string", example="Room 101 - Department A"),
     *             @OA\Property(property="diagnose", type="string", example="Some diagnosis details"),
     *             @OA\Property(property="treated", type="string", example="YES")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Appointment was updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Appointment was updated successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Appointment not found"
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     */
    public function updatetable(Request $req, string $id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->room_department = $req['room_department'];
        $appointment->diagnose = $req['diagnose'];
        $appointment->treated = "YES";
        $trimmedRoomNumber = preg_replace('/\D/', '', $appointment['room_department']);
        DB::table('rooms')->where('room_number', $trimmedRoomNumber)->update(['status' => 'BUSY']);

        if ($appointment->save()) {
            return response()->json(['message' => 'Appointment was updated successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }    

    /**
     * @OA\Get(
     *     path="/api/approved/{id}",
     *     operationId="approved",
     *     tags={"Admin"},
     *     summary="Approve an appointment",
     *     description="Approve an appointment by updating its status",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the appointment",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Appointment approved successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Approved successfully.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Appointment not found"
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     */
    public function approved($id)
    {
        $data = appointment::find($id);
        $data->status = 'approved';
        $data->save();
        return response()->json(['message' => 'approved successfully.']);
    }

    /**
     * @OA\Get(
     *     path="/api/canceled/{id}",
     *     operationId="canceled",
     *     tags={"Admin"},
     *     summary="Cancel an appointment",
     *     description="Cancel an appointment by updating its status",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the appointment",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Appointment canceled successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Canceled successfully.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Appointment not found"
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     */
    public function canceled($id)
    {
        $data = appointment::find($id);
        $data->status = 'canceled';
        $data->save();
        return response()->json(['message' => 'canceled successfully.']);
    }

}


