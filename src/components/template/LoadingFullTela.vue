<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
            <div class="loading">
                <img src="@/assets/loadingt.gif" alt="Loading" 
                style="width: 200px; height: 200px;">
            </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalLayout"
};
</script>

<style scoped>
.loading {
      width: 100px;
      height: 100px;
    }

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 10px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

/** Estilos do Modal */
.modal-header {
  margin-top: 0;
  color: rgb(0, 0, 0);
  font-size: 1.2em;
  text-align: center;
}

.modal-body {
  margin: 5px 0;
  text-align: justify;
}



/*
 * Os estilos a seguir são auto-aplicados à elementos com transition="modal"
 * quando sua visibilidade for trocada pelo Vue.js.
 */
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>