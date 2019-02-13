<div class="modal fade" id="delete-item" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <form data-toggle="validator" action="/item-ajax/14" method="DELETE">
            {{ csrf_field() }}    
        
            <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Eliminar Ubicacion del Cliente</h4>
            </div>
            <div class="modal-body"> 
                <p>Desea eliminar la ubicacion del cliente?</p>
                <input type="double" name="latitud" disabled>     
                <input type="double" name="longitud" disabled>                
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-danger crud-submit-ubicacionCliente-delete">Eliminar</button>
                        <button type="button"  class="btn btn-default" data-dismiss='modal'>Cerrar</button>
                    </div>            
                </div>    
            </div>    
        </div>    
    </form>
    </div>   