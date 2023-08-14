@extends('user.app')
    
    @section('title','oralcare')

    @section('content')
    @foreach($data as $products4)
    <div class="item d-inline-block ml-3 py-3">
    <div class="card-doctor">
        <div class="header">
            <img src="{{ asset('storage/products4/' .$products4->image) }}" alt="{{ $products4->name }}" style="height:300px"/>
        </div>
        <div class="body">
            <p class="text-xl mb-0">{{$products4->name}}</p>
            <span class="text-sm text-grey">{{$products4->category}}</span>
        </div>
        <div class="footer">
            <a href="#" class="btn btn-primary">Buy Now</a>
        </div>
    </div>
</div>
    @endforeach
@endsection