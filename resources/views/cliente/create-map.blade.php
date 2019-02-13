<style type="text/css">
#mapa {
        height: 300px;
        width: 500px;
      }
</style>
<div class="modal fade" id="my-Modal" tabindex="-1" role="dialog" aria-labelledby="my-ModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="my-ModalLabel">Crear Ubicacion</h4>
      </div>
      <div class="modal-body">
          <div id="mapa"></div>
          <input type="text" name="lati" id="lati" disabled>
          <input type="text" name="longi" id="longi" disabled>
          <input type="text" name="mapID" id="mapID" style="display: none">
          
      </div>
      <div class="modal-footer">
        <button class="btn btn-info" id="btnMapa">Guardar Ubicacion</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Sin ubicacion</button>
      </div>
    </div>
  </div>
</div>