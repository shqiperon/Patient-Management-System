    
    @extends('admin.app')
    
    @section('admin','Doctors')

    @section('content')

    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Doctors</h1>
        <a href="{{ route('doctors.create') }}" class="btn btn-sm btn-outline-primary" >Create</a>
    </div>
    @if(Session::get('status'))
    <div class="alert alert-info alert-dismissible fade show" role="alert">
        {{ Session::get('status') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    @endif
    @if($doctors && count($doctors))
        <div class="table-responsive">
            <table class="table table-bordered">
                <tr>
                    <th>#</th>
                    <th>name</th>
                    <th>phone</th>
                    <th>speciality</th>
                    <th>Image</th>
                    <th></th>
                </tr>
        @foreach($doctors as $doctor)
                <tr>
                    <td>{{ $doctor->id }}</td>
                    <td>{{ $doctor->name }}</td>
                    <td>{{ $doctor->phone }}</td>   
                    <td>{{ $doctor->speciality }}</td>   
                    <td>
                        <img src="{{ asset('storage/doctors/' .$doctor->image) }}"alt="{{ $doctor->name }}" style="height:90px"/>
                    </td>  
                    <td>
                        <a href="{{ route('doctors.edit', ['doctor' => $doctor->id]) }}" class="btn btn-sm btn-outline-secondary">Edit</a>
                        <form action="{{ route('doctors.destroy', ['doctor' => $doctor->id]) }}" class="d-inline" method="POST">
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
        <p>0 Doctors!</p>
    @endif
    @endsection

