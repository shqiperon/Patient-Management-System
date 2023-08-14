<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Appointment extends Model
{
    use HasFactory;

    use Notifiable;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'doctor',
        'date',
        'message',
        'user_id',
        'status',
        'room_department',
        'diagnose',
        'treated',
        'note'
    ];
}
