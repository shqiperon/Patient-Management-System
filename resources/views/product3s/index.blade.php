@extends('admin.app')

@section('title', 'Pain relief')

@section('content')
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Pain relief</h1>
        <a href="{{ route('product3s.create') }}" class="btn btn-sm btn-outline-primary">Create</a>
    </div>
    @if(Session::get('status'))
    <div class="alert alert-info alert-dismissible fade show" role="alert">
        {{ Session::get('status') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    @endif
    @if($product3s && count($product3s)) 
        <div class="table-responsive">
            <table class="table table-bordred">
                <tr>
                    <th>#</th>
                    <th>Product3</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th></th>
                </tr>
                @foreach($product3s as $product3)
                <tr>
                    <td>{{ $product3->id }}</td>
                    <td>{{ $product3->name }}</td>
                    <td>{{ $product3->qty }}</td>
                    <td>{{ number_format($product3->price, 2, "." , "") }} EUR</td>
                    <td>
                        <img src="{{ asset('storage/products3/'.$product3->image) }}" alt="{{ $product3->name }}" style="height: 90px" />
                    </td>
                    <td>
                        <a href="{{ route('product3s.edit', ['product3' => $product3->id]) }}" class="btn btn-sm btn-outline-secondary">Edit</a>
                        <form action="{{ route('product3s.destroy', ['product3' => $product3->id]) }}" class="d-inline" method="POST">
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
