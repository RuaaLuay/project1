<!--begin:: Avatar -->
<div class="symbol symbol-circle symbol-50px overflow-hidden me-3">
    <a href="{{--{{ route('user-management.users.show', $user) }}--}}">
        @if($admin->image)
            <div class="symbol-label">
                <img src="{{ url('storage/' . $admin->image ) }}" class="w-100">
            </div>
        @else
            <div class="symbol-label fs-3 {{ app(\App\Actions\GetThemeType::class)->handle('bg-light-? text-?', $admin->name) }}">
                {{ substr($admin->name, 0, 1) }}
            </div>
        @endif
    </a>
</div>
<!--end::Avatar-->
<!--begin::User details-->
<div class="d-flex flex-column">
    <a href="{{--{{ route('user-management.users.show', $user) }}--}}" class="text-gray-800 text-hover-primary mb-1">
        {{ $admin->name }}
    </a>
    <span>{{ $admin->email }}</span>
</div>
<!--begin::User details-->
