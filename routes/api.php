<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\DoctorController;
use App\Http\Controllers\Api\DataController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PromotionController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController1;
use App\Http\Controllers\API\ProductController2;
use App\Http\Controllers\API\ProductController3;
use App\Http\Controllers\API\ProductController4;
use App\Http\Controllers\API\SpecialityController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\NewsController;
use App\Http\Controllers\API\NurseController;
use App\Http\Controllers\API\RoomController;
use App\Http\Controllers\API\DepartmentController;
use App\Http\Controllers\API\LaboratoryTestController;
use App\Http\Controllers\API\TestRequestController;
use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\LabTechnicianController;


Route::get('/speciality', [SpecialityController::class, 'index'])->name('speciality.index');
Route::post('/speciality', [SpecialityController::class, 'store'])->name('speciality.store');
Route::get('/speciality/{id}', [SpecialityController::class, 'show'])->name('speciality.show');
Route::put('/speciality/{id}', [SpecialityController::class, 'update'])->name('speciality.update');
Route::delete('/speciality/{id}', [SpecialityController::class, 'destroy'])->name('speciality.destroy');

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::get('users/{id}', [UserController::class, 'getUser']);
Route::get('users', [UserController::class, 'index']);
Route::post('users', [UserController::class, 'register']);

Route::get('/promotions', [PromotionController::class, 'index'])->name('promotion.index');
Route::post('/promotions', [PromotionController::class, 'store'])->name('promotion.store');
Route::get('/promotions/{id}', [PromotionController::class, 'show'])->name('promotion.show');
Route::put('/promotions/{id}', [PromotionController::class, 'update'])->name('promotion.update');
Route::delete('/promotions/{id}', [PromotionController::class, 'destroy'])->name('promotion.destroy');

Route::get('doctors', [DoctorController::class, 'index']);
Route::get('doctors/{id}', [DoctorController::class, 'show']);
Route::post('doctors', [DoctorController::class, 'store']);
Route::put('doctors/{id}', [DoctorController::class, 'update']);
Route::delete('doctors/{id}', [DoctorController::class, 'destroy']);

Route::get('nurses', [NurseController::class, 'index']);
Route::get('nurses/{id}', [NurseController::class, 'show']);
Route::post('nurses', [NurseController::class, 'store']);
Route::put('nurses/{id}', [NurseController::class, 'update']);
Route::delete('nurses/{id}', [NurseController::class, 'destroy']);

Route::get('/category', [CategoryController::class, 'index'])->name('category.index');
Route::post('/category', [CategoryController::class, 'store'])->name('category.store');
Route::get('/category/{id}', [CategoryController::class, 'show'])->name('category.show');
Route::put('/category/{id}', [CategoryController::class, 'update'])->name('category.update');
Route::delete('/category/{id}', [CategoryController::class, 'destroy'])->name('category.destroy');

Route::get('/products', [ProductController::class, 'index'])->name('product.index');
Route::post('/products', [ProductController::class, 'store'])->name('product.store');
Route::get('/products/{id}', [ProductController::class, 'show'])->name('product.show');
Route::put('/products/{id}', [ProductController::class, 'update'])->name('product.update');
Route::delete('/products/{id}', [ProductController::class, 'destroy'])->name('product.destroy');

Route::get('/product1s', [ProductController1::class, 'index'])->name('product1.index');
Route::post('/product1s', [ProductController1::class, 'store'])->name('product1.store');
Route::get('/product1s/{id}', [ProductController1::class, 'show'])->name('product1.show');
Route::put('/product1s/{id}', [ProductController1::class, 'update'])->name('product1.update');
Route::delete('/product1s/{id}', [ProductController1::class, 'destroy'])->name('product1.destroy');

Route::get('/product2s', [ProductController2::class, 'index'])->name('product2.index');
Route::post('/product2s', [ProductController2::class, 'store'])->name('product2.store');
Route::get('/product2s/{id}', [ProductController2::class, 'show'])->name('product2.show');
Route::put('/product2s/{id}', [ProductController2::class, 'update'])->name('product2.update');
Route::delete('/product2s/{id}', [ProductController2::class, 'destroy'])->name('product2.destroy');

Route::get('/product3s', [ProductController3::class, 'index'])->name('product3.index');
Route::post('/product3s', [ProductController3::class, 'store'])->name('product3.store');
Route::get('/product3s/{id}', [ProductController3::class, 'show'])->name('product3.show');
Route::put('/product3s/{id}', [ProductController3::class, 'update'])->name('product3.update');
Route::delete('/product3s/{id}', [ProductController3::class, 'destroy'])->name('product3.destroy');

Route::get('/product4s', [ProductController4::class, 'index'])->name('product4.index');
Route::post('/product4s', [ProductController4::class, 'store'])->name('product4.store');
Route::get('/product4s/{id}', [ProductController4::class, 'show'])->name('product4.show');
Route::put('/product4s/{id}', [ProductController4::class, 'update'])->name('product4.update');
Route::delete('/product4s/{id}', [ProductController4::class, 'destroy'])->name('product4.destroy');

Route::get('/news', [NewsController::class, 'index'])->name('news.index');
Route::post('/news', [NewsController::class, 'store'])->name('news.store');
Route::get('/news/{id}', [NewsController::class, 'show'])->name('news.show');
Route::put('/news/{id}', [NewsController::class, 'update'])->name('news.update');
Route::delete('/news/{id}', [NewsController::class, 'destroy'])->name('news.destroy'); 

Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
Route::get('/getOrderByUserId', [OrderController::class, 'getOrderByUserId']);
Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
Route::get('/orders/{id}', [OrderController::class, 'show'])->name('orders.show');
Route::put('/orders/{id}', [OrderController::class, 'update'])->name('orders.update');
Route::delete('/orders/{id}', [OrderController::class, 'destroy'])->name('orders.destroy');

Route::get('rooms', [RoomController::class, 'index']);
Route::post('rooms', [RoomController::class, 'store']);
Route::put('rooms/{id}', [RoomController::class, 'update']);
Route::delete('rooms/{id}', [RoomController::class, 'destroy']);

Route::get('departments', [DepartmentController::class, 'index']);
Route::post('departments', [DepartmentController::class, 'store']);
Route::put('departments/{id}', [DepartmentController::class, 'update']);
Route::delete('departments/{id}', [DepartmentController::class, 'destroy']);

Route::get('laboratorytests', [LaboratoryTestController::class, 'index']);
Route::post('laboratorytests', [LaboratoryTestController::class, 'store']);
Route::put('laboratorytests/{id}', [LaboratoryTestController::class, 'update']);
Route::delete('laboratorytests/{id}', [LaboratoryTestController::class, 'destroy']);

Route::get('testrequests', [TestRequestController::class, 'index']);
Route::get('/getByUserId', [TestRequestController::class, 'getByUserId']);
Route::post('testrequests', [TestRequestController::class, 'store']);
Route::put('testrequests/{id}', [TestRequestController::class, 'update']);
Route::delete('testrequests/{id}', [TestRequestController::class, 'destroy']);
Route::post('/updateStatus/{id}', [TestRequestController::class, 'updateStatus']);

Route::post('/appointments', [AdminController::class, 'store']);
Route::get('/appointments', [AdminController::class, 'index']);
Route::get('/getUserId/{appointmentId}', [AdminController::class, 'getUserId']);
Route::get('/showappointment', [AdminController::class, 'showappointment']);
Route::get('/showrooms', [AdminController::class, 'showrooms']);
Route::get('/sendtoroom/{id}', [AdminController::class, 'sendtoroom']);
Route::put('/updatetable/{id}', [AdminController::class, 'updatetable']);
Route::post('/updateNote/{id}', [AdminController::class, 'updateNote']);
Route::post('/updateNoteInAdvance/{id}', [AdminController::class, 'updateNoteInAdvance']);
Route::get('/approved/{id}', [AdminController::class, 'approved']);
Route::get('/canceled/{id}', [AdminController::class, 'canceled']);


Route::get('labtechnicians', [LabTechnicianController::class, 'index']);
Route::get('labtechnicians/by-speciality', [LabTechnicianController::class, 'getBySpeciality']);
Route::get('labtechnicians/{id}', [LabTechnicianController::class, 'show']);
Route::post('labtechnicians', [LabTechnicianController::class, 'store']);
Route::put('labtechnicians/{id}', [LabTechnicianController::class, 'update']);
Route::delete('labtechnicians/{id}', [LabTechnicianController::class, 'destroy']);
