@extends('user.app')
    
    @section('title','coldandflu')

    @section('content')
    @foreach($data as $doctors)
            <div class="item d-inline-block ml-3 py-3">
                <div class="card-doctor">
                    <div class="header">
                    <img src="{{ asset('storage/doctors/' .$doctors->image) }}"alt="{{ $doctors->name }}" style="height:300px"/>
                        <div class="meta">
                            <a href="#"><span class="mai-call"></span></a>
                            <a href="#"><span class="mai-logo-whatsapp"></span></a>
                        </div>
                    </div>
                    <div class="body">
                        <p class="text-xl mb-0">{{$doctors->name}}</p>
                        <span class="text-sm text-grey">{{$doctors->speciality}}</span>
                    </div>
                </div>
            </div>
            @endforeach//duhet me bo ni button view doxtorr ose me ja shtu naj pershkrim najsen edhe ktu edhe te nurses e kom marr codin copy paste duhet me bo sikur anej me contenta
    
    @endsection
        
        