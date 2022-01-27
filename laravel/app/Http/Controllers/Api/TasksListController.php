<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TasksListCollection;
use App\Http\Resources\TasksListResource;
use App\Models\TasksList;
use Illuminate\Http\Request;

class TasksListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
            $tasksList = TasksList::all();
            return response()->json(new TasksListCollection($tasksList), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $tasksList = new TasksList();
        $tasksList->name = $request->name;
        $tasksList->description = $request->description;
        $tasksList->save();
        return response()->json(new TasksListResource($tasksList), 201);


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TasksList  $tasksList
     * @return \Illuminate\Http\Response
     */
    public function show(TasksList $tasksList)
    {
        return response()->json( new TasksListResource($tasksList), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TasksList  $tasksList
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TasksList $tasksList)
    {
        $tasksList->name = $request->name;
        $tasksList->name = $request->description;
        $tasksList->save();
        return response()->json(new TasksListResource($tasksList), 202);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TasksList  $tasksList
     * @return \Illuminate\Http\Response
     */
    public function destroy(TasksList $tasksList)
    {
        $tasksList->delete();
        return response()->json([], 204);
    }
}
