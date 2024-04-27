<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;

class AddRoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $permissions = Permission::where('guard_name', 'admin')->pluck('name')->toArray();
//        $checkedValues = explode(',', $this->input('checkedValues'));
        $rules = [
            'name' => ['required','max:255'],
            'checkedValues' => 'required',
            'checkedValues.*' => Rule::in($permissions), // Replace with your valid permissions
        ];
        if ($this->has('edit_mode')) {
//            $this->dd($this);
            // If edit_mode is present in the request, it's an edit operation
            // In this case, we add the unique rule for email, excluding the current user's ID
            $rules['name'][] = 'unique:roles,name,' . $this->id;
        } else {
            // If edit_mode is not present, it's a new registration
            // In this case, we add the unique rule for email without any exclusions
            $rules['name'][] = 'unique:roles';
        }
        return $rules;

        // Get the current request URL
//        $currentUrl = $this->getRequestUri();




    }
}
