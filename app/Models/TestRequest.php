<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestRequest extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'status',
        'patient_name',
        'patient_phone',
        'patient_email',
        'lab_technician',
        'user_id'
    ];
}
