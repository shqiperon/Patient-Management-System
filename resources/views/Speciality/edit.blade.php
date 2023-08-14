@extends('admin.app')
    
    @section('admin','Edit Speciality')

    @section('content')

    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Edit Speciality</h1>
        <a href="{{ route('speciality.index') }}" class="btn btn-sm btn-outline-primary" >Create</a>
    </div>
    @if(Session::get('error'))
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        {{ Session::get('error') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    @endif
    <form action="{{ route('speciality.update', ['speciality' => $speciality->id]) }}" method="POST" enctype="multipart/form-data">
    @method('PUT')    
    @csrf
    <div class="form-group mb-2">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" class="form-control" value="{{$speciality->name}}"/>
    </div>
        <button type="submit" class="btn btn-sm btn-outline-secondary">Submit</button>
    </form>

@endsection