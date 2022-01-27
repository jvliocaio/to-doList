<?php

namespace App\Http\Requests;

use App\Models\TasksList;
use Illuminate\Foundation\Http\FormRequest;

class TasksListRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }


    public function prepareForValidation ()
    {
        if ($this->route('tasksList') instanceof TasksList)
        {
            $tasksList = $this->route('tasksList');

            if ( ! $this->route('tasksList'));
            {
                $this->merge(['name' => $tasksList->name]);
            }
            if ( ! $this->route('tasksList'));
            {
                $this->merge(['description' => $tasksList->description]);
            }
        }
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'bail|required|string',
            'description' => 'bail|required|string'
        ];
    }
}
