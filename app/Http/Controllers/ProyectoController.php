<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Proyecto;
use Illuminate\Http\Request;

use DB;

class ProyectoController extends Controller
{   
    public function myProyecto(Request $request) {
       $proyectos = Proyectos::paginate(20);
        if($request->ajax()){
            return response()->json(view('proyecto.proyectos',compact('proyectos')->render()));
        }else{
          
        return view('proyecto.my-proyectos',compact('proyectos'));
        }
    }

    public function index()
    {
        $project=\DB::select('SELECT proyectos.*, ROUND((SUM(tareas.avance)*100)/(SUM(tareas.total)),1) avanceP,estado_tareas.nombre nombreEst FROM tareas,proyectos,estado_tareas WHERE tareas.id_proyecto = proyectos.id AND proyectos.id_estado = estado_tareas.id GROUP BY proyectos.id,estado_tareas.nombre');

        $proyec=["current_page"=>1, 'data'=>$project, "per_page_url"=>null, "to"=>1,"total"=>1];

        $jsondata=json_encode($proyec);
        return($jsondata);
    }


    public function myProyectos() {
        $estados=\DB::table('estado_tareas')
        ->select('*')
        ->get();
        return view('proyecto.proyectos-asignados', compact('estados'));
    }

    public function projects(){
        $estados=\DB::table('estado_tareas')
        ->select('*')
        ->get();
        return view('proyecto.my-proyectos', compact('estados'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $proyecto=Proyecto::create($request->all());
        return response()->json($proyecto);
    }


    public function show(Proyecto $proyecto)
    {
        //
    }


    public function edit(Proyecto $proyecto)
    {
        //
    }


    public function update(Request $request, $id)
    {
        $proyecto=Proyecto::find($id)->update($request->all());
       return response()->json($proyecto);
    }


    public function destroy($id)
    {
        $proyecto=Proyecto::find($id);
        $proyecto->delete();
        return response()->json($proyecto);
    }
}
