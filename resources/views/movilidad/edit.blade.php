<div class="modal fade" id="edit-item" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Editar Movilidad</h4>
            </div>
            <div class="modal-body">
      
                  <form data-toggle="validator" action="/item-ajax/14" method="put">
                     <div class="form-group">
                        <label class="control-label" for="placa">Placa:</label>
                           <input type="text" name="placa" class="form-control" data-error="placa." required />
                        <div class="help-block with-errors"></div>
                     </div>

                     <div class="form-group">
                          <label class="control-label" for="nit">Descripcion:</label>
                             <textarea class="form-control" name="descripcion" placeholder="Ingresa una descripcion" rows="3" cols="35" data-error="Descripcion del Auto." required></textarea>
                          <div class="help-block with-errors"></div>
                        </div>

                           <div class="form-group">
                               <label class="control-label" for="id_empleados">Empleado:</label>
                               <select class="form-control selectpicker " data-live-search=("true") name="id_empleados" data-error="selccione Empleado" >
                                    <option>Seleccione...</option>>
                                     @foreach($employee as $empleados)
                                  <option value={{$empleados->id}}>{{$empleados->nombre}}</option>
                                     @endforeach
                               </select>
                               <div class="help-block with-errors"></div>
                            </div>

                     <div class="form-group">
                        <button type="submit" class="btn btn-success crud-submit-movilidad-edit">Guardar</button>
                     </div>
                  </form>
      
            </div>
          </div>
        </div>
      </div>