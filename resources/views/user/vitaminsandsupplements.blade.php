@extends('user.app')
    
    @section('title','vitaminsandsupplements')

    @section('content')
    @foreach($data as $products)
    <div class="item d-inline-block ml-3 py-3">
    <div class="card-doctor">
        <div class="header">
            <img src="{{ asset('storage/products/' .$products->image) }}" alt="{{ $products->name }}" style="height:300px"/>
        </div>
        <div class="body">
            <p class="text-xl mb-0">{{$products->name}}</p>
            <span class="text-sm text-grey">{{$products->category}}</span>
        </div>
        <div class="footer">
            <a href="#" class="btn btn-primary">Buy Now</a>
        </div>
    </div>
</div>
        
            @endforeach
    @endsection