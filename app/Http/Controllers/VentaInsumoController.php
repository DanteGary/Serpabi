<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\VentaInsumo;
use Illuminate\Http\Request;

use DB;

class VentaInsumoController extends Controller
{
    public function myVentaInsumo(Request $request) {
       $ventasInsumos = VentaInsumo::paginate(20);
        if($request->ajax()){
            return response()->json(view('ventaInsumo.ventasInsumos',compact('ventasInsumos')->render()));
        }else{
          
        return view('ventaInsumo.my-ventasInsumos',compact('ventasInsumos'));
        }
    }

    public function index()
    {
        $ventaInsum=\DB::select('SELECT ventas_insumos.*,clientes.id id_cliente,clientes.nombre nombrecli, materiales_insumos.nombre nombreInsumo, materiales_insumos.id id_insumo FROM ventas_insumos, clientes, materiales_insumos WHERE ventas_insumos.id_cliente=clientes.id AND ventas_insumos.id_material=materiales_insumos.id');

        $ventasInsumos=["current_page"=>1, 'data'=>$ventaInsum, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($ventasInsumos);
        return($jsondata);
    }

    public function myVentasInsumos(Request $request) {
        $clientes=\DB::table('clientes')
        ->select('*')
        ->get();
        $materiales_insumos=\DB::table('materiales_insumos')
        ->select('*')
        ->get();

        return view('ventaInsumo.my-ventasInsumos', compact('clientes'))
        ->with('materiales_insumos',$materiales_insumos);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
       $ventaInsumo=VentaInsumo::create($request->all());
        return response()->json($ventaInsumo);
    }

    public function show(VentaInsumo $ventaInsumo)
    {
        //
    }

    public function edit(VentaInsumo $ventaInsumo)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $ventaInsumo=VentaInsumo::find($id)->update($request->all());
       return response()->json($ventaInsumo);
    }

    public function destroy($id)
    {
        $ventaInsumo=VentaInsumo::find($id);
        $ventaInsumo->delete();
        return response()->json($ventaInsumo);
    }
}
