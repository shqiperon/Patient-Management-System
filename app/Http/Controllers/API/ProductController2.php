<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product2;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Product2",
 *     required={"name", "category", "price", "qty", "image"},
 *     @OA\Property(property="id", type="integer", format="int64"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="category", type="string"),
 *     @OA\Property(property="price", type="number", format="float"),
 *     @OA\Property(property="qty", type="integer", format="int32"),
 *     @OA\Property(property="image", type="string")
 * )
 */
class ProductController2 extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @OA\Get(
     *     path="/api/product2s",
     *     summary="Get all product2s",
     *     tags={"Product2s"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="product2s", type="array", @OA\Items(ref="#/components/schemas/Product2")),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Something went wrong!"),
     *         ),
     *     ),
     * )
     */
    public function index()
    {
        $product2s = Product2::all();

        return response()->json(['product2s' => $product2s]);
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
     *     path="/api/product2s",
     *     summary="Create a new product2",
     *     tags={"Product2s"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Product2")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Product2 was created successfully."),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Something went wrong!"),
     *         ),
     *     ),
     * )
     */
    public function store(Request $request)
    {
        $data = $request->except('_token');

        if ($request->hasfile('image')) {
            $file = $request['image']->getClientOriginalName();
            $image = time() . "_" . pathinfo($file, PATHINFO_FILENAME) . "." . pathinfo($file, PATHINFO_EXTENSION);
            $data['image'] = $image;
            Storage::putFileAs('public/product2s/', $request['image'], $image);
        }

        if (Product2::create($data)) {
            return response()->json(['message' => 'Product2 was created successfully.']);
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
     *     path="/api/product2s/{id}",
     *     summary="Get a specific product2",
     *     tags={"Product2s"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the product2",
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="product2", ref="#/components/schemas/Product2")
     *         ),
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Product2 not found.")
     *         ),
     *     ),
     * )
     */
    public function show(string $id)
    {
        $product2 = Product2::findOrFail($id);

        return response()->json(['product2' => $product2]);
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
     *     path="/api/product2s/{id}",
     *     summary="Update a specific product2",
     *     tags={"Product2s"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the product2",
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Updated product2 data",
     *         @OA\JsonContent(ref="#/components/schemas/Product2")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Product2 was updated successfully.")
     *         ),
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Product2 not found.")
     *         ),
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Something went wrong!")
     *         ),
     *     ),
     * )
     */
    public function update(Request $request, string $id)
    {
        $product2 = Product2::findOrFail($id);
        $product2->name = $request->input('name');
        $product2->category = $request->input('category');
        $product2->price = $request->input('price');
        $product2->qty = $request->input('qty');

        if ($request->hasfile('image')) {
            $file = $request['image']->getClientOriginalName();
            $image = time() . "_" . pathinfo($file, PATHINFO_FILENAME) . "." . pathinfo($file, PATHINFO_EXTENSION);
            $product2->image = $image;
            Storage::putFileAs('public/product2s/', $request['image'], $image);
        }

        if ($product2->save()) {
            return response()->json(['message' => 'Product2 was updated successfully.']);
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
     *     path="/api/product2s/{id}",
     *     summary="Delete a specific product2",
     *     tags={"Product2s"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the product2",
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Product2 was deleted successfully.")
     *         ),
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Product2 not found.")
     *         ),
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Something went wrong!")
     *         ),
     *     ),
     * )
     */
    public function destroy(string $id)
    {
        $product2 = Product2::findOrFail($id);

        if ($product2->delete()) {
            return response()->json(['message' => 'Product2 was deleted successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }
}
