<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\AsStringable;
use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{

    protected $casts = [
        'done' => 'boolean'
    ];

   public function list (){
       return $this->belongsTo(TasksList::class, 'list_id', 'id')->first();
   }
}
