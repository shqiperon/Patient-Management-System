<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\OpenApi(
 *     @OA\Info(
 *         version="1.0",
 *         title="Todo List Api",
 *         description="Demo Todo List Api"
 *     ),
 *     @OA\Server(
 *         url="http://127.0.0.1:8000",
 *         description="API Server"
 *     ),
 *     openapi="3.0.0"
 * )
 */

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}
