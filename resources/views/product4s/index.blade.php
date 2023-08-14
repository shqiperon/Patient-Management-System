@extends('admin.app')

@section('title', 'Pain relief')

@section('content')
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Pain relief</h1>
        <a href="{{ route('product4s.create') }}" class="btn btn-sm btn-outline-primary">Create</a>
    </div>
    @if(Session::get('status'))
    <div class="alert alert-info alert-dismissible fade show" role="alert">
        {{ Session::get('status') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    @endif
    @if($product4s && count($product4s)) 
        <div class="table-responsive">
            <table class="table table-bordred">
                <tr>
                    <th>#</th>
                    <th>Product4</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th></th>
                </tr>
                @foreach($product4s as $product4)
                <tr>
                    <td>{{ $product4->id }}</td>
                    <td>{{ $product4->name }}</td>
                    <td>{{ $product4->qty }}</td>
                    <td>{{ number_format($product4->price, 2, "." , "") }} EUR</td>
                    <td>
                        <img src="{{ asset('storage/products4/'.$product4->image) }}" alt="{{ $product4->name }}" style="height: 90px" />
                    </td>
                    <td>
                        <a href="{{ route('product4s.edit', ['product4' => $product4->id]) }}" class="btn btn-sm btn-outline-secondary">Edit</a>
                        <form action="{{ route('product4s.destroy', ['product4' => $product4->id]) }}" class="d-inline" method="POST">
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
