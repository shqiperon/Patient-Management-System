@extends('admin.app')

@section('title', 'Create Product')

@section('content')
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Create Product1</h1>
        <a href="{{ route('product1s.index') }}" class="btn btn-sm btn-outline-primary">Back</a>
    </div>
    @if(Session::get('error'))
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        {{ Session::get('error') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    @endif
    <form action="{{ route('product1s.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="form-group mb-2">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" class="form-control" />
        </div>
        <div class="form-group mb-2">
            <label for="qty">Qty</label>
            <input type="number" name="qty" id="qty" class="form-control" />
        </div>
        <div class="form-group mb-2">
            <label for="price">Price</label>
            <input type="text" name="price" id="price" class="form-control" />
        </div>

        
        @csrf
    <div class="form-group mb-2">
    <label for="category">Category</label>
    <select name="category" id="category" class="form-control">
        <option value="">Select a category</option>
        @foreach(DB::table('categories')->select('id', 'name')->get() as $category)
            <option value="{{ $category->name }}">{{ $category->name }}</option>
        @endforeach
    </select>
</div>

        <div class="form-group mb-2">
            <label for="image">Image</label>
            <input type="file" name="image" id="image" class="form-control" />
        </div>
        <button type="submit" class="btn btn-sm btn-outline-secondary">Submit</button>
    </form>
@endsection