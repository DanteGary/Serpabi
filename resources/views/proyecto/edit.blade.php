<div class="modal fade" id="edit-item" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Editar Proyecto</h4>
            </div>
            <div class="modal-body">
      
                  <form data-toggle="validator" action="/item-ajax/14" method="put">
                     <div class="form-group">
                        <label class="control-label" for="nombre">nombre:</label>
                           <input type="text" name="nombre" class="form-control" data-error="nombre." required />
                        <div class="help-block with-errors"></div>
                     </div>
                     <div class="form-group">
                        <label class="control-label" for="fecha_inicio">Fecha Inicio:</label>
                           <input type="date" name="fecha_inicio" class="form-control" data-error="Fecha Inicio." required />
                        <div class="help-block with-errors"></div>
                     </div>
                     <div class="form-group">
                        <label class="control-label" for="fecha_fin">Fecha Fin:</label>
                           <input type="date" name="fecha_fin" class="form-control" data-error="Fecha Fin." required />
                        <div class="help-block with-errors"></div>
                     </div>

                      <div class="form-group">
                           <label class="control-label" for="id_estado">Estado:</label>
                           <select class="form-control selectpicker " data-live-search=("true") name="id_estado" data-error="Selccione un Estado">
                             
                                 @foreach($estados as $estado)
                              <option value={{$estado->id}}>{{$estado->nombre}}</option>
                                 @endforeach
                           </select>
                           <div class="help-block with-errors"></div>
                      </div>
                     <div class="form-group">
                        <button type="submit" class="btn btn-success crud-submit-proyecto-edit">Guardar</button>
                     </div>
                  </form>
      
            </div>
          </div>
        </div>
      </div>