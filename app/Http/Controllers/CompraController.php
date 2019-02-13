<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Compra;
use Illuminate\Http\Request;

use DB;

class CompraController extends Controller
{

    public function myCompra(Request $request) {
      $compras = Compra::paginate(2);
        if($request->ajax()){
            return response()->json(view('compra.compras',compact('compras')->render()));
        }else{
          return view('compra.my-compras',compact('compras'));
        }
    }


    public function index()
    {
        $comp=\DB::select('SELECT compras.*,materiales_insumos.id id_material,materiales_insumos.nombre nombreMaterial,materiales_insumos.descripcion descripcionMa, proveedores.nombre nombreProveedor, proveedores.id id_proveedor FROM compras, materiales_insumos, proveedores WHERE compras.id_material=materiales_insumos.id AND compras.id_proveedor=proveedores.id');

        $compraS=["current_page"=>1, 'data'=>$comp, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($compraS);
        return($jsondata);
    }

     public function myCompras(Request $request) {
        $materiales_insumos=\DB::table('materiales_insumos')
        ->select('*')
        ->get();
        $proveedores=\DB::table('proveedores')
        ->select('*')
        ->get();

        return view('compra.my-compras', compact('materiales_insumos'))
        ->with('proveedores',$proveedores);
    }

    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $compra=Compra::create($request->all());
       return response()->json($compra);
    }


    public function show(Compra $compra)
    {
        //
    }


    public function edit(Compra $compra)
    {
        //
    }


    public function update(Request $request, $id)
    {
        $compra=Compra::find($id)->update($request->all());
       return response()->json($compra);
    }

 
    public function destroy($id)
    {
        $compra=Compra::find($id);
       $compra->delete();
       return response()->json($compra);
    }
}
