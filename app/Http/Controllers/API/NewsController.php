<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="News",
 *     required={"title", "content", "published_at"},
 *     @OA\Property(property="title", type="string"),
 *     @OA\Property(property="content", type="string"),
 *     @OA\Property(property="published_at", type="string", format="date-time")
 * )
 */
class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    /**
     * @OA\Get(
     *     path="/api/news",
     *     summary="Get all news",
     *     tags={"News"},
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="news", type="array", @OA\Items(ref="#/components/schemas/News"))
     *         )
     *     )
     * )
     */
    public function index()
    {
        $news = News::all();

        return response()->json(['news' => $news]);
    }

    public function create()
    {
        //duhet me hek qito mdoket s vyn  creat-i
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @OA\Post(
     *     path="/api/news",
     *     summary="Create a new news",
     *     tags={"News"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/News")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        $data = $request->except('_token');


        if (News::create($data)) {
            return response()->json(['message' => 'News was created successfully.']);
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
     *     path="/api/news/{id}",
     *     summary="Get a specific news",
     *     tags={"News"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the news",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="news", ref="#/components/schemas/News")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string")
     *         )
     *     )
     * )
     */
    public function show(string $id)
    {
        $news = News::findOrFail($id);

        return response()->json(['news' => $news]);
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
     *     path="/api/news/{id}",
     *     summary="Update a specific news",
     *     tags={"News"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the news",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="title", type="string"),
     *             @OA\Property(property="content", type="string"),
     *             @OA\Property(property="published_at", type="string", format="date-time")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string")
     *         )
     *     )
     * )
     */
    public function update(Request $request, string $id)
    {
        $news = News::findOrFail($id);
        $news->title = $request['title'];
        $news->content = $request['content'];
        $news->published_at = $request['published_at'];

        if ($news->save()) {
            return response()->json(['message' => 'News was updated successfully.']);
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
     *     path="/api/news/{id}",
     *     summary="Delete a specific news",
     *     tags={"News"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the news",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string")
     *         )
     *     )
     * )
     */
    public function destroy(string $id)
    {
        $news = News::findOrFail($id);

        if ($news->delete()) {
            return response()->json(['message' => 'News was deleted successfully.']);
        } else {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }
}
