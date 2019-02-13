<style type="text/css">
#mapa1 {
        height: 300px;
        width: 500px;
      }
</style>
<div class="modal fade" id="my-Modal1" tabindex="-1" role="dialog" aria-labelledby="my-ModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="my-ModalLabel">Crear Ubicacion</h4>
      </div>
      <div class="modal-body">
          <div id="mapa1"></div>
          <input type="text" name="lati1" id="lati1" disabled>
          <input type="text" name="longi1" id="longi1" disabled>
          <input type="text" name="idCliente" id="idCliente" style="display: none">
      </div>
      <div class="modal-footer">
        <button class="btn btn-info" id="btnMapa1">Guardar Ubicacion</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
</div>