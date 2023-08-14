<?php

namespace App\Http\Controllers;

use App\Models\User;

use App\Models\Nurse;

use App\Models\Doctor;

use App\Models\Contact;

use App\Models\Appointment;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;




class HomeController extends Controller
{



    public function index()
    {
    
        if(Auth::id())
        {
            return redirect('home');
        }
        
        else
        {
        $doctors = Doctor::all();

        return view('user.home', compact('doctors'));

        }
        
    }
    
    
    
    public function redirect()
    {
        if(Auth::id())
        {
            if(Auth::user()->usertype=='0')
            {
                $doctors = Doctor::all();

                return view('user.home', compact('doctors'));
            }
            else{
                return view('admin.home');
            }
        }
        else{
            return redirect()->back();
        }
    }

    
    
    
    
    
    public function appointment(Request $request)
    {
        $data = new appointment;

        $data->name=$request->name;

        $data->email=$request->email;
        
        $data->date=$request->date;
        
        $data->phone=$request->number;
        
        $data->message=$request->message;
        
        $data->doctor=$request->doctor;

        $data->status='In progress';

        if(Auth::id())
        {
        $data->user_id=Auth::user()->id;
        }

        $data->save();

        return redirect()->back()->with('message','Appointment Request Successful . We will contact with u soon ');

    }

        public function myappointment(){
        
        if(Auth::id())
        
        {
            $userid=Auth::user()->id;

            $appoint=appointment::where('user_id', $userid)->get();
            
            return view('user.my_appointment',compact('appoint'));
        }

        else{
            return redirect()->back();
        }

    }

    public function cancel_appoint($id)
    {
        $data=appointment::find($id);

        $data->delete();

        return redirect()->back();
    
    }









    public function contact(Request $request)
    {
        $data = new contact;

        $data->emri=$request->name;
        
        $data->mbiemri=$request->surname;

        $data->emaili=$request->email;
        
        $data->tema=$request->subject;
        
        $data->mesazhi=$request->message;
        
        if(Auth::id())
        {
        $data->user_id=Auth::user()->id;
        }

        $data->save();

        return redirect()->back()->with('message','Contact Request Successful . We will contact with u soon ');

    }



    public function mycontact(){
        
        if(Auth::id())
        
        {
            $userid=Auth::user()->id;

            $contact=contact::where('user_id', $userid)->get();
            
            return view('user.my_contact',compact('contact'));
        }

        else{
            return redirect()->back();
        }


    }


    public function cancel_contact($id)
    {
        $data=contact::find($id);

        $data->delete();

        return redirect()->back();
    
    }
}
