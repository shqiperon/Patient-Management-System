@extends('user.app')
    
    @section('title','coldandflu')

    @section('content')
    @foreach($data as $nurses)
            <div class="item d-inline-block ml-3 py-3">
                <div class="card-doctor">
                    <div class="header">
                    <img src="{{ asset('storage/nurses/' .$nurses->image) }}"alt="{{ $nurses->name }}" style="height:300px"/>
                    <div class="meta">
                            <a href="#"><span class="mai-call"></span></a>
                            <a href="#"><span class="mai-logo-whatsapp"></span></a>
                        </div>
                    </div>
                    <div class="body">
                        <p class="text-xl mb-0">{{$nurses->name}}</p>
                        <span class="text-sm text-grey">{{$nurses->speciality}}</span>
                    </div>
                </div>
            </div>
            @endforeach
    @endsection
        
