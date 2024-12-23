<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Photos List</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense"> </ion-header>
      <ion-list :inset="true" v-for="photo in photos" :key="photo.id">
        <ion-item>{{photo.name}}</ion-item>
      </ion-list>
      <ion-fab slot="fixed" vertical="center" horizontal="center">
        <ion-fab-button @click="takePhoto">
          <ion-icon :icon="camera"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>
<script setup>
import { camera } from "ionicons/icons";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

const store = useStore();


const photos = computed(() => store.state.photos);

const photoUrl = ref(null);
const takePhoto = async () => {
  try {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 90,
    });
    photoUrl.value = photo.webPath;
    console.log(photo);
  } catch (error) {
    console.error("Błąd podczas robienia zdjęcia:", error);
  }
};
</script>
