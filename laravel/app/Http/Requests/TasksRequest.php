<?php

namespace App\Http\Requests;

use App\Models\Tasks;
use Illuminate\Foundation\Http\FormRequest;

class TasksRequest extends FormRequest
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



    public function prepareForValidation ()
    {

        if ($this->route('task') instanceof Tasks) // se passar o ID na rota e ele existir na tb
        {
            $task = $this->route('task');

            if ( ! $this->has('description')) // usa o mesmo campo do troco la
            {
                $this->merge(['description' => $task->description]);
            }
            if ( ! $this->has('list_id')) // usa o mesmo campo do troco la
            {
                $this->merge(['list_id' => $task->list_id]);
            }
            if ( ! $this->has('done')) // usa o mesmo campo do troco la
            {
                $this->merge(['done' => $task->done]);
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
            'description' => 'bail|required|string|',
            'list_id' => 'bail|required|integer|exists:App\Models\TasksList,id',
            'done' => 'bail|boolean'
        ];
    }
}

