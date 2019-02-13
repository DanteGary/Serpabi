<div class="modal fade" id="create-empleado" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Registro de Empleado</h4>
            </div>
            <div class="modal-body">
      
                    <form data-toggle="validator" action="{{ route('empleados.store') }}" method="POST">
                            {{ csrf_field() }}    
                        <div class="form-group">
                              <label class="control-label" for="nombre">nombre:</label>
                                 <input type="text" name="nombre" class="form-control" data-error="nombre." required />
                              <div class="help-block with-errors"></div>
                        </div>

                        <div class="form-group">
                        <label class="control-label" for="telefono">Telefono:</label>
                           <input type="text" name="telefono" class="form-control" data-error="telefono." required />
                        <div class="help-block with-errors"></div>
                      </div>

                       <div class="form-group">
                        <label class="control-label" for="ci_nit">CI/NIT</label>
                           <input type="number" name="ci_nit" class="form-control" data-error="Numero de CI o NIT." required />
                        <div class="help-block with-errors"></div>
                      </div>
                      
                        <div class="form-group">
                           <label class="control-label" for="id_cargo">Cargo:</label>
                           <select class="form-control selectpicker " data-live-search=("true") name="id_cargos" data-error="selccione Cargo" required>
                             
                                 @foreach($cargos1 as $cat)
                              <option value={{$cat->id}}>{{$cat->nombre}}</option>
                                 @endforeach
                           </select>
                           <div class="help-block with-errors"></div>
                        </div>

                      <div class="form-group">
                          <button type="submit" class="btn empleado-submit btn-success">Crear Empleado</button>
                      </div>
                    </form>
            </div>
          </div>
        </div>
      </div>