@extends('admin.app')
    
@section('title','Appointments')

@section('content')
    
<div class="container py-5">
    <h1 class="text-center mb-5">My Appointments</h1>
    <div class="table-responsive">
        <table class="table table-bordered table-hover">
            <thead class="table-dark">
                <tr>
                    <th>Customer name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Docotor name </th>
                    <th>Date</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Approved</th>
                    <th>Canceled</th>
                    <th>Send Mail</th>
                </tr>
            </thead>
            <tbody>
                @foreach($data as $appoint)
                <tr>
                    <td>{{$appoint->name}}</td>
                    <td>{{$appoint->email}}</td>
                    <td>{{$appoint->phone}}</td>
                    <td>{{$appoint->doctor}}</td>
                    <td>{{$appoint->date}}</td>
                    <td>{{$appoint->message}}</td>
                    <td>{{$appoint->status}}</td>
                    <td>
                        <a class="btn btn-success" href="{{url('approved',$appoint->id)}}">Approved</a>    
                    </td>
                    <td>
                        <a class="btn btn-danger" href="{{url('canceled',$appoint->id)}}">Canceled</a>
                    </td>
                    <td>
                        <a class="btn btn-primary" href="{{url('emailview2',$appoint->id)}}">Send Mail</a>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection
