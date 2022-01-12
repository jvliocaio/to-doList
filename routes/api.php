<?php

use App\Http\Controllers\Api\TasksController;
use App\Http\Controllers\Api\TasksListController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/* Route::get('tasks', [TasksController::class, 'index'])->name('index.tasks');
Route::post('tasks', [TasksController::class, 'store'])->name('store.tasks');
Route::get('tasks/{task}', [TasksController::class, 'show'])->name('show.tasks');
Route::put('tasks/{task}', [TasksController::class, 'update'])->name('update.tasks');
Route::delete('tasks/{task}', [TasksController::class, 'destroy'])->name('destroy.tasks'); */

Route::apiResource('tasks', TasksController::class);
Route::apiResource('tasksList', TasksListController::class);