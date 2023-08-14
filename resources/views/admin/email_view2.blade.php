@extends('admin.app')
    
@section('title', 'Appointment')

@section('content')
    
<form method="POST" action="{{ route('sendmail2', $data->id) }}">

    @csrf

    
    @if (session()->has('message'))
        <div class="alert alert-success alert-dismissible">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
            {{ session()->get('message') }}
        </div>
    @endif

    <div class="form-group">
        <label for="greeting">Greeting</label>
        <input type="text" class="form-control" id="greeting" name="greeting" required>
    </div>

    <div class="form-group">
        <label for="body">Body</label>
        <textarea type="text" class="form-control" id="body" name="body" rows="5" required></textarea>
    </div>

    <div class="form-group">
        <label for="action_text">Action Text</label>
        <input type="text" class="form-control" id="action_text" name="action_text" required>
    </div>

    <div class="form-group">
        <label for="action_url">Action URL</label>
        <input type="text" class="form-control" id="action_url" name="action_url" required>
    </div>

    <div class="form-group">
        <label for="end_part">End Part</label>
        <textarea type="text" class="form-control" id="end_part" name="end_part" rows="3" required></textarea>
    </div>

    <button type="submit" class="btn btn-primary mt-3">Submit</button>
</form>


@endsection

