<?php

namespace App\Http\Controllers;

use App\Models\TableUsers;
use Illuminate\Http\Request;

class TableUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tableUsers = TableUsers::orderByDesc('id')->get();
        return view('crud.listUser', compact('tableUsers'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('crud.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $datos = $request->validate([
            'name' => 'required|max:60',
            'apellido' => 'required|max:60',
            'descriptions' => 'nullable|max:255',

        ]);
        $setDtos = TableUsers::create($datos);
        return redirect()->route('tablet.listUser');
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TableUsers  $tableUsers
     * @return \Illuminate\Http\Response
     */
    public function show(TableUsers $tableUsers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TableUsers  $tableUsers
     * @return \Illuminate\Http\Response
     */
    public function edit(TableUsers $tableUsers)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TableUsers  $tableUsers
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TableUsers $tableUsers)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TableUsers  $tableUsers
     * @return \Illuminate\Http\Response
     */
    public function destroy(TableUsers $tableUsers)
    {
        //
    }
}
