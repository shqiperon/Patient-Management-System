<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Speciality;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Speciality",
 *     required={"id", "name"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="Speciality Name")
 * )
 */
class SpecialityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @OA\Get(
     *     path="/api/speciality",
     *     operationId="getSpecialities",
     *     tags={"Specialities"},
     *     summary="Get all specialities",
     *     description="Retrieve all specialities",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="specialities", type="array", @OA\Items(ref="#/components/schemas/Speciality"))
     *         )
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     */
    public function index()
    {
        $specialities = Speciality::all();

        return response()->json(['specialities' => $specialities]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @OA\Post(
     *     path="/api/speciality",
     *     operationId="createSpeciality",
     *     tags={"Specialities"},
     *     summary="Create a new speciality",
     *     description="Create a new speciality",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Speciality")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Speciality created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Speciality was created successfully.")
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

        if (Speciality::create($data)) {
            return response()->json(['message' => 'Speciality was created successfully.']);
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
     *     path="/api/speciality/{id}",
     *     summary="Get a specific speciality",
     *     tags={"Specialities"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the speciality",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="speciality", ref="#/components/schemas/Speciality")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Speciality not found.")
     *         )
     *     )
     * )
     */
    public function show(string $id)
    {
        $speciality = Speciality::findOrFail($id);

        return response()->json(['speciality' => $speciality]);
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
     *     path="/api/speciality/{id}",
     *     operationId="updateSpeciality",
     *     tags={"Specialities"},
     *     summary="Update a speciality",
     *     description="Update a speciality",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the speciality to update",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Speciality")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Speciality updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Speciality was updated successfully.")
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
        $speciality = Speciality::findOrFail($id);
        $speciality->name = $request['name'];

        if ($speciality->save()) {
            return response()->json(['message' => 'Speciality was updated successfully.']);
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
     *     path="/api/speciality/{id}",
     *     operationId="deleteSpeciality",
     *     tags={"Specialities"},
     *     summary="Delete a speciality",
     *     description="Delete a speciality",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the speciality to delete",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Speciality deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Speciality was deleted successfully.")
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
        $speciality = Speciality::findOrFail($id);

        if ($speciality->delete()) {
            return response()->json(['message' => 'Speciality was deleted successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }
}
