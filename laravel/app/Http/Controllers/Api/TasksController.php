<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\TaskResource;
use App\Models\Tasks;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasks = Tasks::all();
        return response()->json(new TaskCollection($tasks), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $task = new Tasks();
        $task->description = $request->description;
        $task->list_id = $request->list_id;
        $task->done = false;
        $task->save();
        return response()->json(new TaskResource($task), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tasks  $tasks
     * @return \Illuminate\Http\Response
     */
    public function show(Tasks $task)
    {
        return response()->json( new TaskResource($task), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tasks  $tasks
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tasks $task)
    {
        $task->description = $request->description;
        $task->list_id = $request->list_id;
        $task->done = $request->done;
        $task->save();
        return response()->json(new TaskResource($task), 202);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tasks  $tasks
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tasks $task)
    {
        $task->delete();
        return response()->json([], 204);
    }
}
