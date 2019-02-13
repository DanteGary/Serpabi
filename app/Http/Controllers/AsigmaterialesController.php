<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\asigmateriales;
use Illuminate\Http\Request;

use DB;

class AsigmaterialesController extends Controller
{
    
    public function myAsignarMaterial() {
       return view('asignarMaterial.my-asignarMateriales');
    }
    public function index()
    {
       $asignarMaterial=DB::table('asigmateriales')
           ->select('*')
           ->paginate(1000);
       return response()->json($asignarMaterial);
    }

     public function asignarMateriales(Request $request) {
        $proveedores = asigmateriales::paginate(2);
        if($request->ajax()){
            return response()->json(view('asignarMaterial.asignarMateriales',compact('asignarMateriales')->render()));
        }
        return view('asignarMaterial.my-asignarMateriales',compact('asignarMateriales'));
      }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }


    public function show(asigmateriales $asigmateriales)
    {
        //
    }


    public function edit(asigmateriales $asigmateriales)
    {
        //
    }


    public function update(Request $request, asigmateriales $asigmateriales)
    {
        //
    }

  
    public function destroy(asigmateriales $asigmateriales)
    {
        //
    }
}
