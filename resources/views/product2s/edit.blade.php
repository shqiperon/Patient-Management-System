@extends('admin.app')

@section('title', 'Edit Product2')

@section('content')
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Edit Product</h1>
        <a href="{{ route('product2s.index') }}" class="btn btn-sm btn-outline-primary">Back</a>
    </div>
    @if(Session::get('error'))
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        {{ Session::get('error') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    @endif
    <form action="{{ route('product2s.update', ['product2' => $product2->id]) }}" method="POST" enctype="multipart/form-data">
        @method('PUT')
        @csrf
        <div class="form-group mb-2">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" class="form-control" value="{{ $product2->name }}" />
        </div>
        <div class="form-group mb-2">
            <label for="qty">Qty</label>
            <input type="number" name="qty" id="qty" class="form-control" value="{{ $product2->qty }}" />
        </div>
        <div class="form-group mb-2">
            <label for="price">Price</label>
            <input type="text" name="price" id="price" class="form-control" value="{{ $product2->price }}" />
        </div>
        <div class="form-group mb-2">
            <label for="image">Image</label>
            <input type="file" name="image" id="image" class="form-control" />
        </div>
        <button type="submit" class="btn btn-sm btn-outline-secondary">Submit</button>
    </form>
@endsection