<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\NurseController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController1;
use App\Http\Controllers\ProductController2;
use App\Http\Controllers\ProductController3;
use App\Http\Controllers\ProductController4;
use App\Http\Controllers\SpecialityController;

/*
|-------------------------------- ------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/




Route::get('/admin', function () {
  return view('admin.home');
})->name('admin.home');

Route::get('/dashboard', function () {
  return view('doctors.home');
})->name('doctors.home');


Route::get('/nurses', function () {
  return view('nurses.home');
})->name('nurses.home');

Route::get('/about', function () {
  return view('user.about');
})->name('user.about');

Route::get('/nurse', function () {
  return view('user.nurses');
})->name('user.nurses');



Route::get('/', [HomeController::class, 'index']);

Route::get('/home', [HomeController::class, 'redirect']);

Route::get('/create', [DoctorController::class, 'create']);

Route::post('/appointment' , [HomeController::class, 'appointment']);

Route::get('/myappointment' , [HomeController::class, 'myappointment']);

Route::get('/cancel_appoint/{id}' , [HomeController::class, 'cancel_appoint']);

Route::get('/showappointment' , [AdminController::class, 'showappointment']);

Route::get('/approved/{id}' , [AdminController::class, 'approved']);

Route::get('/canceled/{id}' , [AdminController::class, 'canceled']);

Route::get('/emailview2/{id}' , [AdminController::class, 'emailview2']);

Route::post('/sendmail2/{id}', [AdminController::class, 'sendemail2'])->name('sendmail2');

Route::get('/emailview/{id}' , [AdminController::class, 'emailview']);

Route::post('/sendmail/{id}', [AdminController::class, 'sendemail'])->name('sendmail');

Route::post('/contact' , [HomeController::class, 'contact']);

Route::get('/mycontact' , [HomeController::class, 'mycontact']);

Route::get('/cancel_contact/{id}' , [HomeController::class, 'cancel_contact']);

Route::get('/showcontact' , [AdminController::class, 'showcontact']);

Route::get('/shownurses' , [NurseController::class, 'shownurses']);

Route::get('/showdoctors' , [DoctorController::class, 'showdoctors']);

Route::get('/painrelief' , [AdminController::class, 'painrelief']);

Route::get('/coldandflu' , [AdminController::class, 'coldandflu']);

Route::get('/skincare' , [AdminController::class, 'skincare']);

Route::get('/oralcare' , [AdminController::class, 'oralcare']);

Route::get('/vitaminsandsupplements' , [AdminController::class, 'vitaminsandsupplements']);




//Route::get('/doctors', [DoctorController::class, 'index'])->name('doctors.index');


Route::middleware(['auth:sanctum','verified'])->get('/
dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

Route::resource('/doctors', DoctorController::class )->except('show');//qeto expect show duhet me ja hjek kur te boj me pa mjekun useri t kalumen e tij pra

Route::resource('/nurses', NurseController::class )->except('show');




//nashta duhet me bo edhe qato me get per me i marr me kqyr masnej 
Route::resource('products', ProductController::class)->except('show');

Route::resource('product1s', ProductController1::class)->except('show');

Route::resource('product2s', ProductController2::class)->except('show');

Route::resource('product3s', ProductController3::class)->except('show');

Route::resource('product4s', ProductController4::class)->except('show');

Route::resource('/category', CategoryController::class )->except('show');