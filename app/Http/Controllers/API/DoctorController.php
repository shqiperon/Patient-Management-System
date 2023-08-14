<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\Speciality;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Doctor",
 *     required={"name", "phone", "speciality"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="John Doe"),
 *     @OA\Property(property="phone", type="string", example="1234567890"),
 *     @OA\Property(property="speciality", type="string", example="Cardiology"),
 *     @OA\Property(property="image", type="string", nullable=true),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time"),
 * )
 */
class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @OA\Get(
     *     path="/api/doctors",
     *     summary="Get all doctors",
     *     tags={"Doctors"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="doctors", type="array", @OA\Items(ref="#/components/schemas/Doctor"))
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function index()
    {
        $doctors = Doctor::all();

        return response()->json(['doctors' => $doctors]);
    }

    public function create()
    {
        $speciality = Speciality::all();
        return response()->json([
            'specialities' => $speciality
        ]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @OA\Post(
     *     path="/api/doctors",
     *     summary="Create a new doctor",
     *     tags={"Doctors"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Doctor")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Doctor created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $data = $request->except('_token');

        if ($request->hasfile('image')) {
            $file = $request['image']->getClientOriginalName();
            $image = time() . "_" . pathinfo($file, PATHINFO_FILENAME) . "." . pathinfo($file, PATHINFO_EXTENSION);
            $data['image'] = $image;
            Storage::putFileAs('public/doctors/', $request['image'], $image);
        }

        if (Doctor::create($data)) {
            return response()->json(['message' => 'Doctor was created successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @OA\Get(
     *     path="/api/doctors/{id}",
     *     summary="Get a specific doctor",
     *     tags={"Doctors"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the doctor",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="doctor", ref="#/components/schemas/Doctor")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Doctor not found.")
     *         )
     *     )
     * )
     */
    public function show(string $id)
    {
        $doctor = Doctor::findOrFail($id);

        return response()->json(['doctor' => $doctor]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @OA\Put(
     *     path="/api/doctors/{id}",
     *     summary="Update a doctor",
     *     tags={"Doctors"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the doctor",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Doctor")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Doctor updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Doctor not found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function update(Request $request, string $id)
    {
        $doctor = Doctor::findOrFail($id);
        $doctor->name = $request['name'];
        $doctor->phone = $request['phone'];
        $doctor->speciality = $request['speciality'];
        $doctor->image = $request['image'];

        if ($request->hasfile('image')) {
            $file = $request['image']->getClientOriginalName();
            $image = time() . "_" . pathinfo($file, PATHINFO_FILENAME) . "." . pathinfo($file, PATHINFO_EXTENSION);
            $doctor->image = $image;
            Storage::putFileAs('public/doctors/', $request['image'], $image);
        }

        if ($doctor->save()) {
            return response()->json(['message' => 'Doctor was updated successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @OA\Delete(
     *     path="/api/doctors/{id}",
     *     summary="Delete a doctor",
     *     tags={"Doctors"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the doctor",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Doctor deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Doctor not found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function destroy(string $id)
    {
        $doctor = Doctor::findOrFail($id);

        if ($doctor->delete()) {
            return response()->json(['message' => 'Doctor was deleted successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }
}
