<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order; // Import the Order model
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Order",
 *     required={"fullname", "email", "phone", "address", "notes", "total"},
 *     @OA\Property(property="fullname", type="string"),
 *     @OA\Property(property="email", type="string", format="email"),
 *     @OA\Property(property="phone", type="string"),
 *     @OA\Property(property="address", type="string"),
 *     @OA\Property(property="notes", type="string"),
 *     @OA\Property(property="total", type="number", format="float"),
 * )
 */
class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    /**
     * @OA\Get(
     *     path="/api/orders",
     *     summary="Get all orders",
     *     tags={"Orders"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Order")
     *         ),
     *     ),
     * )
     */
    public function index()
    {
        $orders = Order::all(); // Fetch all orders from the database
        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    /**
     * @OA\Post(
     *     path="/api/orders",
     *     summary="Create a new order",
     *     tags={"Orders"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Order")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Order created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Order")
     *     )
     * )
     */
    public function store(Request $request)
    {
        // Extract the form data from the request
        $formData = $request->all();

        // Create a new order using the form data
        $order = Order::create($formData);

        // Return the created order
        return response()->json($order);
    }

    /**
     * Display the specified resource.
     */
    /**
     * @OA\Get(
     *     path="/api/orders/{id}",
     *     summary="Get a specific order",
     *     tags={"Orders"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the order",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Order found",
     *         @OA\JsonContent(ref="#/components/schemas/Order")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Order not found"
     *     )
     * )
     */
    public function show($id)
    {
        $order = Order::findOrFail($id); // Find the order by its ID
        return response()->json($order);
    }

    /**
     * Update the specified resource in storage.
     */
    /**
     * @OA\Put(
     *     path="/api/orders/{id}",
     *     summary="Update an existing order",
     *     tags={"Orders"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the order",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Order")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Order updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Order")
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'fullname' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'address' => 'required',
            'notes' => 'nullable',
            'total' => 'required|numeric',
        ]);

        // Find the order by its ID and update it with the form data
        $order = Order::findOrFail($id);
        $order->update($request->all());

        // Return the updated order
        return response()->json($order);
    }


    /**
     * Remove the specified resource from storage.
     */
    /**
     * @OA\Delete(
     *     path="/api/orders/{id}",
     *     summary="Delete an order",
     *     tags={"Orders"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the order",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Order deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Order not found"
     *     )
     * )
     */
    public function destroy($id)
    {
        $order = Order::findOrFail($id); // Find the order by its ID
        $order->delete(); // Delete the order

        // Return a response indicating success
        return response()->json(['message' => 'Order deleted successfully']);
    }


    /**
     * @OA\Get(
     *     path="/api/getOrderByUserId",
     *     summary="Get orders by user ID",
     *     tags={"Orders"},
     *     @OA\Parameter(
     *         name="userId",
     *         in="query",
     *         description="ID of the user",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successfully retrieved orders",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Order")
     *         )
     *     ),
     * )
     */
    public function getOrderByUserId(Request $request)
    {
        $userId = $request->input('userId');

        // Retrieve appointments based on the user's ID
        $orders = Order::where('user_id', $userId)->get();

        return response()->json($orders);
    }
}
