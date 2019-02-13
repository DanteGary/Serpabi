<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\tareas;
use Illuminate\Http\Request;

use DB;

class TareasController extends Controller
{

     public function myTarea(Request $request) {
       $tareas = tareas::paginate(20);
        if($request->ajax()){
            return response()->json(view('tarea.tareas',compact('tareas')->render()));
        }else{
          
        return view('tarea.my-tareas',compact('tareas'));
        }
    }

    public function index()
    {
        $tasks=\DB::select('SELECT tareas.*,estado_tareas.id id_estado,estado_tareas.nombre nombreEstado, productos.nombre nombreProducto, productos.id id_producto, proyectos.nombre nombreProyecto, proyectos.id idProyecto FROM tareas, estado_tareas, productos, proyectos WHERE tareas.id_estado=estado_tareas.id AND tareas.id_producto=productos.id AND tareas.id_proyecto=proyectos.id');

        $tareasS=["current_page"=>1, 'data'=>$tasks, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($tareasS);
        return($jsondata);
    }

    public function tareas($id)
    {
        $productos=\DB::table('productos')
        ->select('*')
        ->get();
        $tasks=\DB::select("SELECT tareas.*,estado_tareas.id id_estado,estado_tareas.nombre nombreEstado, productos.nombre nombreProducto, productos.id id_producto, proyectos.nombre nombreProyecto, proyectos.id idProyecto FROM tareas, estado_tareas, productos, proyectos WHERE tareas.id_estado=estado_tareas.id AND tareas.id_producto=productos.id AND tareas.id_proyecto=proyectos.id AND tareas.id_proyecto='$id'");
        $tareasS=["current_page"=>1, 'data'=>$tasks, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($tareasS);
        return view('tarea.my-tareas', compact('tasks','jsondata'))->with('id_proyecto',$id)->with('product',$productos);
        // return response()->json($jsondata);
    }

    public function mostrar($idPro,$idTa){
        $tas=\DB::select("SELECT tareas.*,estado_tareas.id id_estado,estado_tareas.nombre nombreEstado, productos.nombre nombreProducto, productos.id id_producto, proyectos.nombre nombreProyecto, proyectos.id idProyecto FROM tareas, estado_tareas, productos, proyectos WHERE tareas.id_estado=estado_tareas.id AND tareas.id_producto=productos.id AND tareas.id_proyecto=proyectos.id AND tareas.id_proyecto='$idPro' AND tareas.id='$idTa'");
        // $tar=["current_page"=>1, 'data'=>$tas, "per_page_url"=>null, "to"=>1,"total"=>1];
        // $jsondata=json_encode($tar);
        return response()->json($tas);
    }

    public function tareasp()
    {
        return view('tarea.my-tareas');
    }
    public function myTareasM() {
        $estados=\DB::table('estado_tareas')
        ->select('*')
        ->get();
        $productos=\DB::table('productos')
        ->select('*')
        ->get();
        $proyectos=\DB::table('proyectos')
        ->select('*')
        ->get();

        return view('tarea.my-tareas', compact('estados'))
        ->with('productos',$productos)
        ->with('proyectos',$proyectos);
    }

    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $tarea=tareas::create($request->all());
        return response()->json($tarea);
    }


    public function show(tareas $tareas)
    {
        //
    }


    public function edit(tareas $tareas)
    {
        //
    }


    public function update(Request $request, $id)
    {
        $tarea=tareas::find($id)->update($request->all());
       return response()->json($tarea);
    }


    public function destroy($id)
    {
        $tarea=tareas::find($id);
        $tarea->delete();
        return response()->json($tarea);
    }
}
