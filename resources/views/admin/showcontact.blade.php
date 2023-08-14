@extends('Admin.app')
    
@section('title','Contacts')

@section('content')
    
<div class="container py-5">
        <h1 class="text-center mb-5">My Contacts</h1>
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>Emri</th>
                        <th>Mbiemri</th>
                        <th>Email-i</th>
                        <th>Tema</th>
                        <th>Mesazhi</th>
                        <th>Send Mail</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($data as $contacts)
                        <tr>
                            <td>{{ $contacts->emri }}</td>
                            <td>{{ $contacts->mbiemri }}</td>
                            <td>{{ $contacts->emaili }}</td>
                            <td>{{ $contacts->tema }}</td>
                            <td>{{ $contacts->mesazhi }}</td>
                            <td>
                                <a class="btn btn-primary" href="{{url('emailview',$contacts->id)}}">Send Mail</a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection
