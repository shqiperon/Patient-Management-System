@extends('admin.app')

@section('title', 'Pain relief')

@section('content')
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Pain relief</h1>
        <a href="{{ route('product1s.create') }}" class="btn btn-sm btn-outline-primary">Create</a>
    </div>
    @if(Session::get('status'))
    <div class="alert alert-info alert-dismissible fade show" role="alert">
        {{ Session::get('status') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    @endif
    @if($product1s && count($product1s)) 
        <div class="table-responsive">
            <table class="table table-bordred">
                <tr>
                    <th>#</th>
                    <th>Product1</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th></th>
                </tr>
                @foreach($product1s as $product1)
                <tr>
                    <td>{{ $product1->id }}</td>
                    <td>{{ $product1->name }}</td>
                    <td>{{ $product1->qty }}</td>
                    <td>{{ number_format($product1->price, 2, "." , "") }} EUR</td>
                    <td>
                        <img src="{{ asset('storage/products1/'.$product1->image) }}" alt="{{ $product1->name }}" style="height: 90px" />
                    </td>
                    <td>
                        <a href="{{ route('product1s.edit', ['product1' => $product1->id]) }}" class="btn btn-sm btn-outline-secondary">Edit</a>
                        <form action="{{ route('product1s.destroy', ['product1' => $product1->id]) }}" class="d-inline" method="POST">
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
