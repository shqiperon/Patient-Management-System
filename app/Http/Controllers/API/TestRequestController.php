<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\TestRequest;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="TestRequest",
 *     title="Test Request",
 *     description="Test Request model",
 *     @OA\Property(property="id", type="integer", readOnly=true),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="status", type="string"),
 *     @OA\Property(property="patient_name", type="string"),
 *     @OA\Property(property="patient_phone", type="string"),
 *     @OA\Property(property="patient_email", type="string"),
 *     @OA\Property(property="lab_technician", type="string"),
 *     @OA\Property(property="user_id", type="integer")
 * )
 */
class TestRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    /**
     * @OA\Get(
     *     path="/api/testrequests", 
     *     operationId="getTestRequests",
     *     tags={"Test Requests"},
     *     summary="Get all test requests",
     *     description="Returns all test requests",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="testrequests",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/TestRequest")
     *             )
     *         )
     *     )
     * )
     */
    public function index()
    {
        $testRequests = TestRequest::all();

        return response()->json(['testrequests' => $testRequests]);
    }

    /**
     * @OA\Get(
     *     path="/api/getByUserId",
     *     operationId="getTestRequestsByUserId",
     *     tags={"Test Requests"},
     *     summary="Get test requests by user ID",
     *     description="Retrieves test requests based on the user's ID",
     *     @OA\Parameter(
     *         name="userId",
     *         in="query",
     *         required=true,
     *         description="User ID",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="appointments",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/TestRequest")
     *             )
     *         )
     *     )
     * )
     */
    public function getByUserId(Request $request)
    {
        $userId = $request->input('userId');

        // Retrieve appointments based on the user's ID
        $appointments = TestRequest::where('user_id', $userId)->get();

        return response()->json($appointments);
    }

    /**
     * @OA\Post(
     *     path="/api/updateStatus/{id}",
     *     operationId="updateTestRequestStatus",
     *     tags={"Test Requests"},
     *     summary="Update test request status",
     *     description="Updates the status of a test request",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Test Request ID",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 description="Success message"
     *             )
     *         )
     *     )
     * )
     */
    public function updateStatus($id)
    {
        $testrequest = TestRequest::findOrFail($id);
        $testrequest->status = 'laboratory test is ready';
        $testrequest->save();

        return response()->json(['message' => 'Test request status updated successfully']);
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
     *     path="/api/testrequests",
     *     operationId="createTestRequest",
     *     tags={"Test Requests"},
     *     summary="Create a test request",
     *     description="Creates a new test request",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/TestRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 description="Success message"
     *             )
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        $data = $request->except('_token');
        if (TestRequest::create($data)) {
            return response()->json(['message' => 'test request was created successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $testreq = TestRequest::findOrFail($id);

        return response()->json(['testreq' => $testreq]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $testreq = TestRequest::findOrFail($id);
        return response()->json([
            'testrequest' => $testreq
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $testrequest = TestRequest::findOrFail($id);
        $testrequest->name = $request['name'];

        if ($testrequest->save()) {
            return response()->json(['message' => 'test request was updated successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
     * @OA\Delete(
     *     path="/api/testrequests/{id}",
     *     operationId="deleteTestRequest",
     *     tags={"Test Requests"},
     *     summary="Delete a test request",
     *     description="Deletes an existing test request",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the test request",
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 description="Success message"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Test request not found",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="error",
     *                 type="string",
     *                 description="Error message"
     *             )
     *         )
     *     )
     * )
     */
    public function destroy(string $id)
    {
        $testrequest = TestRequest::findOrFail($id);

        if ($testrequest->delete()) {
            return response()->json(['message' => 'test request was deleted successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }
}
