<style type="text/css">
/* #mdialTamanio{
  width: 100% !important;
}
*/
#mapaEdit {
        /* height: 100%px !important;
        width: 100% !important;  */
        height: 300px !important;
        width: 400px !important;
} 
</style>
<div class="modal fade bd-example-modal-lg" id="edit-item" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-lg" role="document" id="mdialTamanio">
          <div class="modal-content" >
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Editar Cliente</h4>
            </div>
            <div class="modal-body" >
              <div class="row">
                <div class="col-md-6 col-xs-6">
                    <form data-toggle="validator" action="/item-ajax/14" method="put">
                        <div class="form-group">
                            <label class="control-label" for="nombre">Nombre:</label>
                              <input type="text" name="nombre" class="form-control" data-error="nombre." required />
                            <div class="help-block with-errors"></div>
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="telefono">Telefono:</label>
                              <input type="number" name="telefono" class="form-control" data-error="telefono." required />
                            <div class="help-block with-errors"></div>
                        </div>

                          <div class="form-group">
                            <label class="control-label" for="nit">NIT</label>
                              <input type="number" name="nit" class="form-control" data-error="nit." required />
                            <div class="help-block with-errors"></div>
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="precio_venta">Precio de Venta:</label>
                              <input type="double" name="precio_venta" class="form-control" data-error="Precio de Venta." required />
                            <div class="help-block with-errors"></div>
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="tiempo">Fecha de Venta:</label>
                              <input type="date" name="tiempo" class="form-control" data-error="Ultima Fecha de Venta." required />
                            <div class="help-block with-errors"></div>
                        </div>

                          <div class="form-group">
                            <label class="control-label" for="estado">Estado:</label>
                              <select class="form-control selectpicker " data-live-search=("true") name="estado" data-error="Selccione Estado">   
                                      <option value="ACTIVO">ACTIVO</option>
                                      <option value="INACTIVO">INACTIVO</option>
                              </select>
                            <div class="help-block with-errors"></div>
                        </div>

                        <div class="form-group">
                            <button type="submit" class="btn btn-success crud-submit-cliente-edit">Guardar</button>
                        </div>
                      </form>
                    </div>
                    <div class="col-md-6 col-xs-12">
                      <h1>Ubicacion Cliente</h1>
                      <div  id="mapaEdit"></div>
                      <button type="button" id="botonBorrar">Elimina marcadores</button>
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </div>