<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\cargos;
use Illuminate\Http\Request;

use DB;

class CargosController extends Controller
{

    public function myCargo(Request $request) {
       $cargos = cargos::paginate(20);
        if($request->ajax()){
            return response()->json(view('cargo.cargos',compact('cargos')->render()));
        }else{
          
        return view('cargo.my-cargos',compact('cargos'));
        }
    }

    public function index()
    {
        $cargo=DB::table('cargos')
           ->select('*')
           ->paginate(1000);
        return response()->json($cargo);
    }

     public function cargosM(Request $request) {
        $cargos = cargos::paginate(2);
        if($request->ajax()){
            return response()->json(view('cargo.cargos',compact('cargos')->render()));
        }
        return view('cargo.my-cargos',compact('cargos'));
    }

    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $cargo=cargos::create($request->all());
        return response()->json($cargo);
    }

   
    public function show(cargos $cargos)
    {
        //
    }

    
    public function edit(cargos $cargos)
    {
        //
    }

 
    public function update(Request $request, $id)
    {
       $cargo=cargos::find($id)->update($request->all());
       return response()->json($cargo);
    }

 
    public function destroy($id)
    {
        $cargo=cargos::find($id);
        $cargo->delete();
        return response()->json($cargo);
    }
}
