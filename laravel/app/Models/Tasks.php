<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
   public function list (){
       return $this->belongsTo(TasksList::class, 'list_id', 'id')->first();
   }
}
