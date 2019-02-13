<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\MaterialInsumo;

use DB;


class MaterialesInsumosController extends Controller
{
      public function myMaterialInsumo(Request $request) {
       $materialesInsumos = MaterialInsumo::paginate(20);
        if($request->ajax()){
            return response()->json(view('materialInsumo.materialesInsumos',compact('materialesInsumos')->render()));
        }else{
        return view('materialInsumo.my-materialesInsumos',compact('materialesInsumos'));
        }
    }

   	public function index() {
        $cliente=DB::table('materiales_insumos')
        ->select('*')
        ->paginate(1000);
        return response()->json($cliente);
   	}

    public function materialesInsumos() {
        $materialesInsumos=\DB::table('materiales_insumos')
        ->select('*')
        ->get();

        return view('materialInsumo.my-materialesInsumos', compact('materialesInsumos'));
    }

    // public function stock($cantidad, $costov, $id){
    //   $materialStock=\DB::Update(materiales_insumos SET cantidad = $cantidad, costov = $costov WHERE id.materiales_insumos = $id);
    //   return response()->json($materialInsumo);
    // }
    // 
    public function show(MaterialInsumo $materialInsumo)
    {
        //
    }

   	public function store(Request $request) {
       $materialInsumo=MaterialInsumo::create($request->all());
       return response()->json($materialInsumo);
   	}

   	public function update(Request $request, $id) {
       $materialInsumo=MaterialInsumo::find($id)->update($request->all());
       return response()->json($materialInsumo);
   	}

   	public function destroy($id) {
       $materialInsumo=MaterialInsumo::find($id);
       $materialInsumo->delete();
       return response()->json($materialInsumo);
   }

}
