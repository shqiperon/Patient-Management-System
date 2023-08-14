<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product3;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Product3",
 *     required={"name", "category", "price", "qty", "image"},
 *     @OA\Property(property="id", type="integer", format="int64"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="category", type="string"),
 *     @OA\Property(property="price", type="number", format="float"),
 *     @OA\Property(property="qty", type="integer", format="int32"),
 *     @OA\Property(property="image", type="string")
 * )
 */
class ProductController3 extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @OA\Get(
     *     path="/api/product3s",
     *     summary="Retrieve all product3s",
     *     tags={"Product3s"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="product3s", type="array", @OA\Items(ref="#/components/schemas/Product3"))
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Something went wrong!")
     *         )
     *     )
     * )
     */
    public function index()
    {
        $product3s = Product3::all();

        return response()->json(['product3s' => $product3s]);
    }

    public function create()
    {
        $category = Category::all();

        return response()->json([
            'categories' => $category
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
     *     path="/api/product3s",
     *     summary="Create a new product3",
     *     tags={"Product3s"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="name", type="string"),
     *                 @OA\Property(property="category", type="string"),
     *                 @OA\Property(property="price", type="number"),
     *                 @OA\Property(property="qty", type="integer"),
     *                 @OA\Property(property="image", type="string", format="binary")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Product3 was created successfully.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Something went wrong!")
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
            Storage::putFileAs('public/product3s/', $request['image'], $image);
        }

        if (Product3::create($data)) {
            return response()->json(['message' => 'Product3 was created successfully.']);
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
     *     path="/api/product3s/{id}",
     *     summary="Get a specific product3",
     *     tags={"Product3s"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the product3",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="product3", ref="#/components/schemas/Product3")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Product3 not found.")
     *         )
     *     )
     * )
     */
    public function show(string $id)
    {
        $product3 = Product3::findOrFail($id);

        return response()->json(['product3' => $product3]);
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
     *     path="/api/product3s/{id}",
     *     summary="Update a specific product3",
     *     tags={"Product3s"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the product3",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Product3")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Product3 was updated successfully.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Product3 not found.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Something went wrong!")
     *         )
     *     )
     * )
     */
    public function update(Request $request, string $id)
    {
        $product3 = Product3::findOrFail($id);
        $product3->name = $request->input('name');
        $product3->category = $request->input('category');
        $product3->price = $request->input('price');
        $product3->qty = $request->input('qty');

        if ($request->hasfile('image')) {
            $file = $request['image']->getClientOriginalName();
            $image = time() . "_" . pathinfo($file, PATHINFO_FILENAME) . "." . pathinfo($file, PATHINFO_EXTENSION);
            $product3->image = $image;
            Storage::putFileAs('public/product3s/', $request['image'], $image);
        }

        if ($product3->save()) {
            return response()->json(['message' => 'Product3 was updated successfully.']);
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
     *     path="/api/product3s/{id}",
     *     summary="Delete a specific product3",
     *     tags={"Product3s"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the product3",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Product3 was deleted successfully.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Product3 not found.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Something went wrong!")
     *         )
     *     )
     * )
     */
    public function destroy(string $id)
    {
        $product3 = Product3::findOrFail($id);

        if ($product3->delete()) {
            return response()->json(['message' => 'Product3 was deleted successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }
}
