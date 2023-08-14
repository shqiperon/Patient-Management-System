<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Promotion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use OpenApi\Annotations as OA;


/**
 * @OA\Schema(
 *     schema="Promotion",
 *     title="Promotion",
 *     description="Promotion model",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="title", type="string", example="Summer Sale"),
 *     @OA\Property(property="description", type="string", example="Get 20% off on selected items"),
 *     @OA\Property(property="image", type="string", example="promotion.jpg")
 * )
 */
class PromotionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @OA\Get(
     *     path="/api/promotions",
     *     summary="Get all Promotion",
     *     tags={"Promotion"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="Promotion", type="array", @OA\Items(ref="#/components/schemas/Promotion"))
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error"
     *     )
     * )
     */
    public function index()
    {
        $promotion = Promotion::all();

        return response()->json(['promotions' => $promotion]);
    }

    public function create()
    {
        //qiky creat-i s vyn sen nashta
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @OA\Post(
     *     path="/api/promotions",
     *     summary="Store a new promotion",
     *     tags={"Promotion"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"image"},
     *                 @OA\Property(property="image", type="file", format="binary"),
     *                 @OA\Property(property="title", type="string"),
     *                 @OA\Property(property="description", type="string"),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Promotion created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error"
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
            Storage::putFileAs('public/promotions/', $request['image'], $image);
        }

        if (Promotion::create($data)) {
            return response()->json(['message' => 'Promotion was created successfully.']);
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
     *     path="/api/promotions/{id}",
     *     summary="Get a specific promotion",
     *     tags={"Promotion"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the promotion",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="promotion", ref="#/components/schemas/Promotion")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Promotion not found.")
     *         )
     *     )
     * )
     */
    public function show(string $id)
    {
        $promotion = Promotion::findOrFail($id);

        return response()->json(['promotions' => $promotion]);
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
     *     path="/api/promotions/{id}",
     *     summary="Update a promotion",
     *     tags={"Promotion"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the promotion",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="title", type="string"),
     *             @OA\Property(property="description", type="string"),
     *             @OA\Property(property="image", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Promotion updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Promotion not found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error"
     *     )
     * )
     */
    public function update(Request $request, string $id)
    {
        $promotion = Promotion::findOrFail($id);
        $promotion->title = $request['title'];
        $promotion->description = $request['description'];
        $promotion->image = $request['image'];

        if ($request->hasfile('image')) {
            $file = $request['image']->getClientOriginalName();
            $image = time() . "_" . pathinfo($file, PATHINFO_FILENAME) . "." . pathinfo($file, PATHINFO_EXTENSION);
            $promotion->image = $image;
            Storage::putFileAs('public/promotions/', $request['image'], $image);
        }

        if ($promotion->save()) {
            return response()->json(['message' => 'Promotion was updated successfully.']);
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
     *     path="/api/promotions/{id}",
     *     summary="Delete a promotion",
     *     tags={"Promotion"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the promotion",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Promotion deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Promotion not found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error"
     *     )
     * )
     */
    public function destroy(string $id)
    {
        $promotion = Promotion::findOrFail($id);

        if ($promotion->delete()) {
            return response()->json(['message' => 'Promotion was deleted successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }
}
