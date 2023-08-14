@extends('admin.app')
    
    @section('admin','Category')

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

        <h3 class="mb-4">category</h3>
        <a href="{{ route('category.create') }}" class="btn btn-outline-primary mb-4">Create category</a>

        @if($category && count($category))
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
                            @foreach($category as $category)
                            <tr>
                                <td>{{ $category->id }}</td>
                                <td>{{ $category->name }}</td>
                                <td>
                                    <a href="{{ route('category.edit', ['category' => $category->id]) }}" class="btn btn-sm btn-outline-secondary">Edit</a>
                                    <form action="{{ route('category.destroy', ['category' => $category->id]) }}" method="POST" style="display:inline-block;">
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
        <p>0 Category!</p>
        @endif
    @endsection

