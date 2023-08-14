<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Nurse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use OpenApi\Annotations as OA;


/**
 * @OA\Schema(
 *     schema="Nurse",
 *     required={"name", "phone"},
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="phone", type="string"),
 *     @OA\Property(property="image", type="string")
 * )
 */
class NurseController extends Controller
{
    /**
     * Get all nurses.
     *
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Get(
     *     path="/api/nurses",
     *     summary="Get all nurses",
     *     tags={"Nurses"},
     *     @OA\Response(
     *         response=200,
     *         description="List of nurses",
     *         @OA\JsonContent(
     *             @OA\Property(property="nurses", type="array", @OA\Items(ref="#/components/schemas/Nurse"))
     *         )
     *     )
     * )
     */
    public function index()
    {
        $nurses = Nurse::all();

        return response()->json(['nurses' => $nurses]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * Store a new nurse.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Post(
     *     path="/api/nurses",
     *     summary="Store a new nurse",
     *     tags={"Nurses"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="phone", type="string"),
     *             @OA\Property(property="image", type="string", format="binary"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Nurse created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string"),
     *         )
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
            Storage::putFileAs('public/nurses/', $request['image'], $image);
        }

        if (Nurse::create($data)) {
            return response()->json(['message' => 'Nurse was created successfully.']);
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
     * Display the specified nurse.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Get(
     *     path="/api/nurses/{id}",
     *     summary="Display the specified nurse",
     *     tags={"Nurses"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Nurse ID",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Nurse found",
     *         @OA\JsonContent(
     *             @OA\Property(property="nurse", ref="#/components/schemas/Nurse"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nurse not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string"),
     *         )
     *     )
     * )
     */
    public function show(string $id)
    {
        $nurse = Nurse::findOrFail($id);

        return response()->json(['nurse' => $nurse]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * Update the specified nurse.
     *
     * @param  Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Put(
     *     path="/api/nurses/{id}",
     *     summary="Update the specified nurse",
     *     tags={"Nurses"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Nurse ID",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="phone", type="string"),
     *             @OA\Property(property="image", type="string"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Nurse updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nurse not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string"),
     *         )
     *     )
     * )
     */
    public function update(Request $request, string $id)
    {
        $nurse = Nurse::findOrFail($id);
        $nurse->name = $request['name'];
        $nurse->phone = $request['phone'];
        $nurse->image = $request['image'];

        if ($request->hasfile('image')) {
            $file = $request['image']->getClientOriginalName();
            $image = time() . "_" . pathinfo($file, PATHINFO_FILENAME) . "." . pathinfo($file, PATHINFO_EXTENSION);
            $nurse->image = $image;
            Storage::putFileAs('public/nurses/', $request['image'], $image);
        }

        if ($nurse->save()) {
            return response()->json(['message' => 'Nurse was updated successfully.']);
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
     * Delete the specified nurse.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Delete(
     *     path="/api/nurses/{id}",
     *     summary="Delete the specified nurse",
     *     tags={"Nurses"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Nurse ID",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Nurse deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nurse not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string"),
     *         )
     *     )
     * )
     */
    public function destroy(string $id)
    {
        $nurse = Nurse::findOrFail($id);

        if ($nurse->delete()) {
            return response()->json(['message' => 'Nurse was deleted successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }
}
