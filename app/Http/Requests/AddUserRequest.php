<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;


class AddUserRequest extends FormRequest
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
//        return [
//            'name' => ['required', 'min:3' , 'string', 'max:255'],
//            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
//
//        ];

        $rules = [
            'name' => ['required', 'min:3' , 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
        ];

        // Get the current request URL
        $currentUrl = $this->getRequestUri();

        // Check if the URL matches a specific pattern
        if (strpos($currentUrl, 'register') !== false) {
            // Apply specific rules for the 'specific/route/uri'
            $rules['password'] =  ['required', 'same:confirm_password',/*, 'required|numeric' */Rules\Password::defaults()]; // Add your specific rules here
        }
        if (strpos($currentUrl, 'admin/users/add') !== false) {
            // Apply specific rules for the 'specific/route/uri'
            $rules['image'] =  ['nullable','image', 'mimes:jpeg,png,jpg,gif','max:2048'];
        }

        if (strpos($currentUrl, 'admin/users/edit/{id}') !== false) {
            // Apply specific rules for the 'specific/route/uri'
            $rules['image'] =  ['nullable','image', 'mimes:jpeg,png,jpg,gif','max:2048'];
        }

        if ($this->has('edit_mode')) {
            if(strpos($currentUrl, 'admin/users/edit/{id}') !== false){
                $rules['email'][] = 'unique:users,email,' . $this->id;
            }elseif(strpos($currentUrl, 'admin/admins/edit/{id}') !== false){
                $rules['email'][] = 'unique:admins,email,' . $this->id;
                $rules['role'] = 'required';
            }
//            $this->dd($this);
            // If edit_mode is present in the request, it's an edit operation
            // In this case, we add the unique rule for email, excluding the current user's ID

        } else {
            // If edit_mode is not present, it's a new registration
            // In this case, we add the unique rule for email without any exclusions
            if(strpos($currentUrl, 'admin/users/edit/{id}') !== false){
                $rules['email'][] = 'unique:users';

            }elseif(strpos($currentUrl, 'admin/admins/edit/{id}') !== false){
                $rules['email'][] = 'unique:admins';
                $rules['role'] = 'required';
            }

        }
        if(strpos($currentUrl, 'admin/admins/add') !== false){
            $rules['email'][] = 'unique:admins';
            $rules['role'] = 'required';
        }
        // Return the rules
        return $rules;
    }

//    public function messages()
//    {
////        return [
////            'name.required' => "",
////            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
////
////        ];
//    }


}
