<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\LaboratoryTest;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="LaboratoryTest",
 *     required={"id", "name"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="Laboratory test name")
 * )
 */
class LaboratoryTestController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    /**
     * @OA\Get(
     *     path="/api/laboratorytests",
     *     operationId="getLaboratoryTests",
     *     tags={"Laboratory Tests"},
     *     summary="Get all laboratory tests",
     *     description="Retrieve all laboratory tests",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="integer", example=200),
     *             @OA\Property(property="laboratorytests", type="array", @OA\Items(ref="#/components/schemas/LaboratoryTest"))
     *         )
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     */
    public function index()
    {
        $laboratory = LaboratoryTest::all();

        return response()->json([
            'status' => 200,
            'laboratorytests' => $laboratory
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */

    /**
     * @OA\Post(
     *     path="/api/laboratorytests",
     *     operationId="createLaboratoryTest",
     *     tags={"Laboratory Tests"},
     *     summary="Create a new laboratory test",
     *     description="Store a newly created laboratory test in the database",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/LaboratoryTest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Laboratory test created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Laboratory test was created successfully.")
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

        if (LaboratoryTest::create($data)) {
            return response()->json(['message' => 'Laboratory test was created successfully.']);
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
        $labtest = LaboratoryTest::findOrFail($id);
        return response()->json([
            'labtest' => $labtest
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    /**
     * @OA\Put(
     *     path="/api/laboratorytests/{id}",
     *     operationId="updateLaboratoryTest",
     *     tags={"Laboratory Tests"},
     *     summary="Update a laboratory test",
     *     description="Update an existing laboratory test in the database",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the laboratory test to update",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/LaboratoryTest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Laboratory test updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Laboratory test was updated successfully.")
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
        $laboratory = LaboratoryTest::findOrFail($id);
        $laboratory->name = $request['name'];

        if ($laboratory->save()) {
            return response()->json(['message' => 'Laboratory test was updated successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
     * @OA\Delete(
     *     path="/api/laboratorytests/{id}",
     *     operationId="deleteLaboratoryTest",
     *     tags={"Laboratory Tests"},
     *     summary="Delete a laboratory test",
     *     description="Delete an existing laboratory test from the database",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the laboratory test to delete",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Laboratory test deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Laboratory test was deleted successfully.")
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
        $laboratory = LaboratoryTest::findOrFail($id);

        if ($laboratory->delete()) {
            return response()->json(['message' => 'Laboratory test was deleted successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }
}
