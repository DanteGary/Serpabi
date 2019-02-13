<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Venta;

use DB;

class VentasController extends Controller
{
    public function myVenta(Request $request) {
       $ventas = Venta::paginate(20);
        if($request->ajax()){
            return response()->json(view('venta.ventas',compact('ventas')->render()));
        }else{
          
        return view('venta.my-ventas',compact('ventas'));
        }
    }


   	public function index() {
       $vent=\DB::select('SELECT ventas.*,materiales_insumos.nombre nombrematerial,materiales_insumos.id id_mat, productos.nombre nombreprod, productos.id id_prod FROM ventas, materiales_insumos, productos WHERE ventas.id_materiales=materiales_insumos.id AND ventas.id_productos=productos.id');

        $ven=["current_page"=>1, 'data'=>$vent, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($ven);
        return($jsondata);
   	}

   	public function myVentasM() {
         $matIns=\DB::table('materiales_insumos')
        ->select('*')
        ->get();
        $productos=\DB::table('productos')
        ->select('*')
        ->get();

        return view('venta.my-ventas', compact('matIns'))
        ->with('productos',$productos);
    }

    public function store(Request $request) {
       $venta=Venta::create($request->all());
       return response()->json($venta);
   	}

   	public function update(Request $request, $id) {
       $venta=Venta::find($id)->update($request->all());
       return response()->json($venta);
   	}

   	public function destroy($id) {
       $venta=Venta::find($id);
       $venta->delete();
       return response()->json($venta);
   }
}
