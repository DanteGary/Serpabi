<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Tipo;
use Illuminate\Http\Request;

use DB;

class TipoController extends Controller
{
   public function myTipo(Request $request) {
      $tipos = Tipo::paginate(2);
        if($request->ajax()){
            return response()->json(view('tipo.tipos',compact('tipos')->render()));
        }else{
          return view('tipo.my-tipos',compact('tipos'));
        }
    }


    public function index()
    {
        $tipo=DB::table('tipos')
           ->select('*')
           ->paginate(1000);
        return response()->json($tipo);
    }

    public function tipos(Request $request) {
        $tipos = Tipo::paginate(2);
        if($request->ajax()){
            return response()->json(view('tipo.tipos',compact('tipos')->render()));
        }
        return view('tipo.my-tipos',compact('tipos'));
    }

    public function create()
    {
        //
    }

 
    public function store(Request $request)
    {
        $tipos=Tipo::create($request->all());
       return response()->json($tipos);
    }

  
    public function show(Tipo $tipo)
    {
        //
    }

   
    public function edit(Tipo $tipo)
    {
        //
    }

   
    public function update(Request $request, $id)
    {
        $tipos=Tipo::find($id)->update($request->all());
       return response()->json($tipos);
    }

    
    public function destroy($id)
    {
         $tipos=Tipo::find($id);
       $tipos->delete();
       return response()->json($tipos);
    }
}
