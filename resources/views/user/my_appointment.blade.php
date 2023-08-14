@extends('user.app')

@section('title', 'My Appointments')

@section('content')
    <div class="container py-5">
        <h1 class="text-center mb-5">My Appointments</h1>
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>Doctor Name</th>
                        <th>Date</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Cancel Appointment</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($appoint as $appoints)
                        <tr>
                            <td>{{ $appoints->doctor }}</td>
                            <td>{{ $appoints->date }}</td>
                            <td>{{ $appoints->message }}</td>
                            <td>{{ $appoints->status }}</td>
                            <td>
                                <a class="btn btn-danger btn-sm" onclick="return confirm('are u sure to delete this')" href="{{url('cancel_appoint',$appoints->id)}}">Cancel Appointment</a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection
