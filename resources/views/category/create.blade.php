@extends('admin.app')

@section('admin','Create Category')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Create Speciality</h1>
        <a href="{{route('category.index')}}" class="btn btn-sm btn-outline-primary" >Back</a>
    </div>
        <form method="POST" action="{{ route('category.store') }}">
            @csrf
            <div class="form-group mb-3">
                <label for="name">Name</label>
                <input type="text" class="form-control" name="name" id="name" required>
            </div>
            <button type="submit" class="btn btn-primary">Create</button>
        </form>
    </div>
</div>

@endsection
