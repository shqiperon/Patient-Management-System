
    @extends('admin.app')
    
    @section('admin','Edit Doctor')

    @section('content')

    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Edit Doctor</h1>
        <a href="{{ route('doctors.index') }}" class="btn btn-sm btn-outline-primary" >Create</a>
    </div>
    @if(Session::get('error'))
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        {{ Session::get('error') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    @endif
    <form action="{{ route('doctors.update', ['doctor' => $doctor->id]) }}" method="POST" enctype="multipart/form-data">
    @method('PUT')    
    @csrf
    <div class="form-group mb-2">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" class="form-control" value="{{$doctor->name}}"/>
    </div>
    <div class="form-group mb-2">
        <label for="phone">Phone</label>
        <input type="number" name="phone" id="phone mb-2" class="form-control" value="{{$doctor->phone}}"/>
    </div>
    <div class="form-group mb-2">
        <label for="speciality">Speciality</label>
        <input type="text" name="speciality" id="speciality" class="form-control" value="{{$doctor->speciality}}"/>
    </div>
    <div class="form-group mb-2">
        <label for="image">Image</label>
        <input type="file" name="image" id="image" class="form-control"/>
    </div>
    <button type="submit" class="btn btn-sm btn-outline-secondary">Submit</button>
    </form>

@endsection