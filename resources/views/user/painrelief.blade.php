@extends('user.app')
    
@section('title','painrelief')

@section('content')
@foreach($data as $products1)
<div class="item d-inline-block ml-3 py-3">
    <div class="card-doctor">
        <div class="header">
            <img src="{{ asset('storage/products1/' .$products1->image) }}" alt="{{ $products1->name }}" style="height:300px"/>
        </div>
        <div class="body">
            <p class="text-xl mb-0">{{$products1->name}}</p>
            <span class="text-sm text-grey">{{$products1->category}}</span>
        </div>
        <div class="footer">
            <a href="#" class="btn btn-primary">Buy Now</a>
        </div>
    </div>
</div>
@endforeach
@endsection
