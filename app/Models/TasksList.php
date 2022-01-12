<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TasksList extends Model
{
    public function tasks (){
        return $this->hasMany(Tasks::class, 'list_id', 'id');
    }
}
