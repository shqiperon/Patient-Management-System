@extends('admin.app')

@section('title', 'Vitamins and supplements')

@section('content')
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Vitamins and supplements</h1>
        <a href="{{ route('products.create') }}" class="btn btn-sm btn-outline-primary">Create</a>
    </div>
    @if(Session::get('status'))
    <div class="alert alert-info alert-dismissible fade show" role="alert">
        {{ Session::get('status') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    @endif
    @if($products && count($products)) 
        <div class="table-responsive">
            <table class="table table-bordred">
                <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th></th>
                </tr>
                @foreach($products as $product)
                <tr>
                    <td>{{ $product->id }}</td>
                    <td>{{ $product->name }}</td>
                    <td>{{ $product->qty }}</td>
                    <td>{{ number_format($product->price, 2, "." , "") }} EUR</td>
                    <td>
                        <img src="{{ asset('storage/products/'.$product->image) }}" alt="{{ $product->name }}" style="height: 90px" />
                    </td>
                    <td>
                        <a href="{{ route('products.edit', ['product' => $product->id]) }}" class="btn btn-sm btn-outline-secondary">Edit</a>
                        <form action="{{ route('products.destroy', ['product' => $product->id]) }}" class="d-inline" method="POST">
                            @method('DELETE')
                            @csrf
                            <button type="submit" class="btn btn-sm btn-outline-danger">Delete</button>
                        </form>
                    </td>
                </tr>
                @endforeach
            </table>
        </div>
    @else 
        <p>0 products</p>
    @endif
@endsection