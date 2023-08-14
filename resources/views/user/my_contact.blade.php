@extends('user.app')

@section('title', 'My Appointments')

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
                        <th>Cancel Appointment</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($contact as $contacts)
                        <tr>
                            <td>{{ $contacts->emri }}</td>
                            <td>{{ $contacts->mbiemri }}</td>
                            <td>{{ $contacts->emaili }}</td>
                            <td>{{ $contacts->tema }}</td>
                            <td>{{ $contacts->mesazhi }}</td>
                            <td>
                                <a class="btn btn-danger btn-sm" onclick="return confirm('are u sure to delete this')" href="{{url('cancel_contact',$contacts->id)}}">Cancel Contact</a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection
