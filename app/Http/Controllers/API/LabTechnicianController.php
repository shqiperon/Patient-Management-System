<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\LabTechnician;
use App\Models\Speciality;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="LabTechnician",
 *     required={"name", "phone", "speciality", "image"},
 *     @OA\Property(property="name", type="string", example="John Doe"),
 *     @OA\Property(property="phone", type="string", example="1234567890"),
 *     @OA\Property(property="speciality", type="string", example="Laboratory Technician"),
 *     @OA\Property(property="image", type="string", format="binary")
 * )
 */
class LabTechnicianController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    /**
     * Retrieve all lab technicians.
     *
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Get(
     *     path="/api/labtechnicians",
     *     summary="Get all lab technicians",
     *     tags={"Lab Technicians"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="integer", example=200),
     *             @OA\Property(property="labtechnicians", type="array", @OA\Items(ref="#/components/schemas/LabTechnician"))
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
        $labtechnicians = LabTechnician::all();
        return response()->json([
            'status' => 200,
            'labtechnicians' => $labtechnicians
        ], 200);
    }

    /**
     * Get technicians based on their speciality.
     */
    /**
     * Get lab technicians by speciality.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Get(
     *     path="/api/labtechnicians/by-speciality",
     *     summary="Get lab technicians by speciality",
     *     tags={"Lab Technicians"},
     *     @OA\Parameter(
     *         name="speciality",
     *         in="query",
     *         description="Speciality of lab technicians",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="labtechnicians", type="array", @OA\Items(ref="#/components/schemas/LabTechnician"))
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function getBySpeciality(Request $request)
    {
        $speciality = $request->query('speciality');

        $query = LabTechnician::query();

        if ($speciality) {
            $query->where('speciality', $speciality);
        }

        $labTechnicians = $query->get();

        return response()->json(['labtechnicians' => $labTechnicians]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $speciality = Speciality::all();
        return response()->json([
            'specialities' => $speciality
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    /**
     * Store a new lab technician.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Post(
     *     path="/api/labtechnicians",
     *     summary="Store a new lab technician",
     *     tags={"Lab Technicians"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"name", "phone", "speciality", "image"},
     *                 @OA\Property(property="name", type="string"),
     *                 @OA\Property(property="phone", type="string"),
     *                 @OA\Property(property="speciality", type="string"),
     *                 @OA\Property(property="image", type="string", format="binary")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="object",
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
            Storage::putFileAs('public/labtechnicians/', $request['image'], $image);
        }

        if (LabTechnician::create($data)) {
            return response()->json(['message' => 'Lab technician was created successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    /**
     * @OA\Get(
     *     path="/api/labtechnicians/{id}",
     *     summary="Get a specific lab technician",
     *     tags={"Lab Technicians"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the lab technician",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="labtechnician", ref="#/components/schemas/LabTechnician")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Lab technician not found.")
     *         )
     *     )
     * )
     */
    public function show(string $id)
    {
        $labtechnician = LabTechnician::findOrFail($id);

        return response()->json(['labtechnician' => $labtechnician]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    /**
     * Update a lab technician.
     *
     * @param \Illuminate\Http\Request $request
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Put(
     *     path="/api/labtechnicians/{id}",
     *     summary="Update a lab technician",
     *     tags={"Lab Technicians"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/LabTechnician")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function update(Request $request, string $id)
    {
        $labtechnician = LabTechnician::findOrFail($id);
        $labtechnician->name = $request['name'];
        $labtechnician->phone = $request['phone'];
        $labtechnician->speciality = $request['speciality'];
        $labtechnician->image = $request['image'];

        if ($request->hasfile('image')) {
            $file = $request['image']->getClientOriginalName();
            $image = time() . "_" . pathinfo($file, PATHINFO_FILENAME) . "." . pathinfo($file, PATHINFO_EXTENSION);
            $labtechnician->image = $image;
            Storage::putFileAs('public/labtechnicians/', $request['image'], $image);
        }

        if ($labtechnician->save()) {
            return response()->json(['message' => 'Lab technician was updated successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
     * Delete a lab technician.
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Delete(
     *     path="/api/labtechnicians/{id}",
     *     summary="Delete a lab technician",
     *     tags={"Lab Technicians"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function destroy(string $id)
    {
        $labtechnician = LabTechnician::findOrFail($id);

        if ($labtechnician->delete()) {
            return response()->json(['message' => 'lab$labtechnician was deleted successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }
}
