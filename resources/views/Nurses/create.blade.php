
    
    @extends('admin.app')
    
    @section('admin','Create Nurse')

    @section('content')

    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Create Nurse</h1>
        <a href="{{route('nurses.index')}}" class="btn btn-sm btn-outline-primary" >Back</a>
    </div>
    @if(Session::get('error'))
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        {{ Session::get('error') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    @endif
    <form action="{{route('nurses.store')}}" method="POST" enctype="multipart/form-data">
    @csrf
    <div class="form-group mb-2">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" class="form-control"/>
    </div>
    <div class="form-group mb-2">
        <label for="phone">Phone</label>
        <input type="number" name="phone" id="phone" class="form-control"/>
    </div>
    <div class="form-group mb-2">
        <label for="image">Image</label>
        <input type="file" name="image" id="image" class="form-control"/>
    </div>
    <button type="submit" class="btn btn-sm btn-outline-secondary">Submit</button>
    </form>
@endsection
