<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Prestamo;
use Illuminate\Http\Request;

use DB;

class PrestamoController extends Controller
{

    public function myPrestamo(Request $request) {
       $prestamos = Prestamo::paginate(20);
        if($request->ajax()){
            return response()->json(view('prestamo.prestamos',compact('prestamos')->render()));
        }else{
          
        return view('prestamo.my-prestamos',compact('prestamos'));
        }
    }

    public function index()
    {
        $pres=\DB::select('SELECT prestamos.*,clientes.id id_cliente,clientes.nombre nombrecli, materiales_insumos.nombre nombreInsumo, materiales_insumos.id id_insumo FROM prestamos, clientes, materiales_insumos WHERE prestamos.id_cliente=clientes.id AND prestamos.id_insumo=materiales_insumos.id');

        $prestam=["current_page"=>1, 'data'=>$pres, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($prestam);
        return($jsondata);
    }

    public function myPrestamos(Request $request) {
        $clientes=\DB::table('clientes')
        ->select('*')
        ->get();
        $materiales_insumos=\DB::table('materiales_insumos')
        ->select('*')
        ->get();

        return view('prestamo.my-prestamos', compact('clientes'))
        ->with('materiales_insumos',$materiales_insumos);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $prestamo=Prestamo::create($request->all());
        return response()->json($prestamo);
    }

    public function show(Prestamo $prestamo)
    {
        //
    }

    public function edit(Prestamo $prestamo)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $prestamo=Prestamo::find($id)->update($request->all());
       return response()->json($prestamo);
    }

    public function destroy($id)
    {
        $prestamo=Prestamo::find($id);
        $prestamo->delete();
        return response()->json($prestamo);
    }
}
