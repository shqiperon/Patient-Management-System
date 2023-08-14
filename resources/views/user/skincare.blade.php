@extends('user.app')
    
    @section('title','skincare')

    @section('content')
    @foreach($data as $products3)
    <div class="item d-inline-block ml-3 py-3">
    <div class="card-doctor">
        <div class="header">
            <img src="{{ asset('storage/products3/' .$products3->image) }}" alt="{{ $products3->name }}" style="height:300px"/>
        </div>
        <div class="body">
            <p class="text-xl mb-0">{{$products3->name}}</p>
            <span class="text-sm text-grey">{{$products3->category}}</span>
        </div>
        <div class="footer">
            <a href="#" class="btn btn-primary">Buy Now</a>
        </div>
    </div>
</div>
        
            @endforeach
    @endsection