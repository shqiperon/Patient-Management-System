    
    @extends('admin.app')
    
    @section('admin','Nurses')

    @section('content')

    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Nurses</h1>
        <a href="{{ route('nurses.create') }}" class="btn btn-sm btn-outline-primary" >Create</a>
    </div>
    @if(Session::get('status'))
    <div class="alert alert-info alert-dismissible fade show" role="alert">
        {{ Session::get('status') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    @endif
    @if($nurses && count($nurses))
        <div class="table-responsive">
            <table class="table table-bordered">
                <tr>
                    <th>#</th>
                    <th>name</th>
                    <th>phone</th>
                    <th>Image</th>
                    <th></th>
                </tr>
        @foreach($nurses as $nurse)
                <tr>
                    <td>{{ $nurse->id }}</td>
                    <td>{{ $nurse->name }}</td>
                    <td>{{ $nurse->phone }}</td>   
                    <td>
                        <img src="{{ asset('storage/nurses/' .$nurse->image) }}"alt="{{ $nurse->name }}" style="height:90px"/>
                    </td>  
                    <td>
                        <a href="{{ route('nurses.edit', ['nurse' => $nurse->id]) }}" class="btn btn-sm btn-outline-secondary">Edit</a>
                        <form action="{{ route('nurses.destroy', ['nurse' => $nurse->id]) }}" class="d-inline" method="POST">
                            @method('DELETE')
                            @csrf
                            <button typr="submit" class="btn btn-sm btn-outline-danger">Delete</button>
                        </form>
                    </td>     
                </tr>
        @endforeach   
            </table>
        </div>
    @else
        <p>0 Nurse!</p>
    @endif
    @endsection

