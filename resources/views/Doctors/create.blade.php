
    
    @extends('admin.app')
    
    @section('admin','Create Doctor')

    @section('content')

    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Create Doctor</h1>
        <a href="{{route('doctors.index')}}" class="btn btn-sm btn-outline-primary" >Back</a>
    </div>
    @if(Session::get('error'))
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        {{ Session::get('error') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    @endif
    <form action="{{route('doctors.store')}}" method="POST" enctype="multipart/form-data">
    @csrf
    <div class="form-group mb-2">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" class="form-control"/>
    </div>
    <div class="form-group mb-2">
        <label for="phone">Phone</label>
        <input type="number" name="phone" id="phone" class="form-control"/>
    </div>
    
    @csrf
    <div class="form-group mb-2">
    <label for="speciality">Speciality</label>
    <select name="speciality" id="speciality" class="form-control">
        <option value="">Select a speciality</option>
        @foreach(DB::table('Specialities')->select('id', 'name')->get() as $speciality)
            <option value="{{ $speciality->name }}">{{ $speciality->name }}</option>
        @endforeach
    </select>
    </div>



    <div class="form-group mb-2">
        <label for="image">Image</label>
        <input type="file" name="image" id="image" class="form-control"/>
    </div>
    <button type="submit" class="btn btn-sm btn-outline-secondary">Submit</button>
    </form>
@endsection
