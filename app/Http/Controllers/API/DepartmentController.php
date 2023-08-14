<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Department",
 *     required={"id", "name"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="Department Name")
 * )
 */
class DepartmentController extends Controller
{

    /**
     * Display a listing of the resource.
     */

    /**
     * @OA\Get(
     *     path="/api/departments",
     *     operationId="getDepartments",
     *     tags={"Departments"},
     *     summary="Get all departments",
     *     description="Retrieve all departments",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="integer", example=200),
     *             @OA\Property(property="departments", type="array", @OA\Items(ref="#/components/schemas/Department"))
     *         )
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     */
    public function index()
    {
        $department = Department::all();

        return response()->json([
            'status' => 200,
            'departments' => $department
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    /**
     * @OA\Post(
     *     path="/api/departments",
     *     operationId="createDepartment",
     *     tags={"Departments"},
     *     summary="Create a new department",
     *     description="Store a newly created department in storage",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Department Name")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Department was created successfully.")
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

        if (Department::create($data)) {
            return response()->json(['message' => 'Department was created successfully.']);
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
        $department = Department::findOrFail($id);
        return response()->json([
            'department' => $department
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    /**
     * @OA\Put(
     *     path="/api/departments/{id}",
     *     operationId="updateDepartment",
     *     tags={"Departments"},
     *     summary="Update a department",
     *     description="Update the specified department",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the department to update",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Department data",
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="New Department Name")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Department was updated successfully.")
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
        $department = department::findOrFail($id);
        $department->name = $request['name'];

        if ($department->save()) {
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
     *     path="/api/departments/{id}",
     *     operationId="deleteDepartment",
     *     tags={"Departments"},
     *     summary="Delete a department",
     *     description="Delete the specified department",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the department to delete",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Department was deleted successfully.")
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
        $department = department::findOrFail($id);

        if ($department->delete()) {
            return response()->json(['message' => 'Department was deleted successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }
}
