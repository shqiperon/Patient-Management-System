    @extends('admin.app')
    
    @section('admin','SPeciality')

    @section('content')

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Speciality</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
<div class="dashboard my-5">
    <div class="container">

        <h3 class="mb-4">speciality</h3>
        <a href="{{ route('speciality.create') }}" class="btn btn-outline-primary mb-4">Create speciality</a>

        @if($speciality && count($speciality))
        <div class="card">
            <div class="card-body">
                @if(session('status'))
                    <div class="alert alert-info alert-dismissible fade show" role="alert">
                        {{ session('status') }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                @endif
                <div class="table-responsive">
                    <table class="table table-borderd">
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th></th>
                            </tr>
                            @foreach($speciality as $speciality)
                            <tr>
                                <td>{{ $speciality->id }}</td>
                                <td>{{ $speciality->name }}</td>
                                <td>
                                    <a href="{{ route('speciality.edit', ['speciality' => $speciality->id]) }}" class="btn btn-sm btn-outline-secondary">Edit</a>
                                    <form action="{{ route('speciality.destroy', ['speciality' => $speciality->id]) }}" method="POST" style="display:inline-block;">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-outline-danger">Delete</button>
                                    </form>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        @else
        <p>0 Speciality!</p>
        @endif
    @endsection

