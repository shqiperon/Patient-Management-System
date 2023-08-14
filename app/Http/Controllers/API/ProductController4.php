<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product4;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Product4",
 *     required={"name", "category", "price", "qty", "image"},
 *     @OA\Property(property="id", type="integer", format="int64"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="category", type="string"),
 *     @OA\Property(property="price", type="number", format="float"),
 *     @OA\Property(property="qty", type="integer", format="int32"),
 *     @OA\Property(property="image", type="string")
 * )
 */

class ProductController4 extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @OA\Get(
     *     path="/api/product4s",
     *     summary="Get all product4s",
     *     tags={"Product4s"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="product4s", type="array", @OA\Items(ref="#/components/schemas/Product4"))
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
    public function index()
    {
        $product4s = Product4::all();

        return response()->json(['product4s' => $product4s]);
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
     *     path="/api/product4s",
     *     summary="Create a new product4",
     *     tags={"Product4s"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(ref="#/components/schemas/Product4")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Product4 was created successfully.")
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
    public function store(Request $request)
    {
        $data = $request->except('_token');

        if ($request->hasfile('image')) {
            $file = $request['image']->getClientOriginalName();
            $image = time() . "_" . pathinfo($file, PATHINFO_FILENAME) . "." . pathinfo($file, PATHINFO_EXTENSION);
            $data['image'] = $image;
            Storage::putFileAs('public/product4s/', $request['image'], $image);
        }

        if (Product4::create($data)) {
            return response()->json(['message' => 'Product4 was created successfully.']);
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
     *     path="/api/product4s/{id}",
     *     summary="Get a specific product4",
     *     tags={"Product4s"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the product4",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="product4", ref="#/components/schemas/Product4")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Product4 not found.")
     *         )
     *     )
     * )
     */
    public function show(string $id)
    {
        $product4 = Product4::findOrFail($id);

        return response()->json(['product4' => $product4]);
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
     *     path="/api/product4s/{id}",
     *     summary="Update a specific product4",
     *     tags={"Product4s"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the product4",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Product4 data",
     *         @OA\JsonContent(ref="#/components/schemas/Product4")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Product4 was updated successfully.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Product4 not found.")
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
    public function update(Request $request, string $id)
    {
        $product4 = Product4::findOrFail($id);
        $product4->name = $request->input('name');
        $product4->category = $request->input('category');
        $product4->price = $request->input('price');
        $product4->qty = $request->input('qty');

        if ($request->hasfile('image')) {
            $file = $request['image']->getClientOriginalName();
            $image = time() . "_" . pathinfo($file, PATHINFO_FILENAME) . "." . pathinfo($file, PATHINFO_EXTENSION);
            $product4->image = $image;
            Storage::putFileAs('public/product4s/', $request['image'], $image);
        }

        if ($product4->save()) {
            return response()->json(['message' => 'Product4 was updated successfully.']);
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
     *     path="/api/product4s/{id}",
     *     summary="Delete a specific product4",
     *     tags={"Product4s"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the product4",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Product4 was deleted successfully.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Product4 not found.")
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
    public function destroy(string $id)
    {
        $product4 = Product4::findOrFail($id);

        if ($product4->delete()) {
            return response()->json(['message' => 'Product4 was deleted successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }
}
