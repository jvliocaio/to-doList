<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TasksList  $tasksList
     * @return \Illuminate\Http\Response
     */
    public function show(TasksList $tasksList)
    {
        // 
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TasksList  $tasksList
     * @return \Illuminate\Http\Response
     */
    public function destroy(TasksList $tasksList)
    {
        //
    }
}
