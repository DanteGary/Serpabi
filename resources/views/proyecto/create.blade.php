<div class="modal fade" id="create-proyecto" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Registro de Proyecto</h4>
            </div>
            <div class="modal-body">
      
                    <form data-toggle="validator" action="{{ route('proyectos.store') }}" method="POST">
                            {{ csrf_field() }}    
                        <div class="form-group">
                              <label class="control-label" for="nombre">Nombre:</label>
                                 <input type="text" name="nombre" class="form-control" data-error="nombre." required />
                              <div class="help-block with-errors"></div>
                          </div>

                      <div class="form-group">

                        <label class="control-label" for="fecha_inicio">Fecha Inicio:</label>
                           <input type="date" name="fecha_inicio" class="form-control" data-error="Fecha Inicio del Proyecto." value="<?php echo date('Y-m-d');?>" required />
                        <div class="help-block with-errors"></div>
                      </div>
                         
                     <div class="form-group">
                        <label class="control-label" for="fecha_fin">Fecha Fin:</label>
                           <input type="date" name="fecha_fin" class="form-control" data-error="Fecha Fin del Proyecto." value="<?php echo date('Y-m-d');?>" required />
                        <div class="help-block with-errors"></div>
                      </div>
                      
                      <div class="form-group">
                           <label class="control-label" for="id_estado">Estado:</label>
                           <select class="form-control selectpicker " data-live-search=("true") name="id_estado" data-error="Selccione un Estado" disabled>
                             
                                 @foreach($estados as $estado)
                              <option value={{$estado->id}}>{{$estado->nombre}}</option>
                                 @endforeach
                           </select>
                           <div class="help-block with-errors"></div>
                      </div>
                      
                      <div class="form-group">
                          <button type="submit" class="btn proyecto-submit btn-success">Crear</button>
                      </div>
                    </form>
            </div>
          </div>
        </div>
      </div>