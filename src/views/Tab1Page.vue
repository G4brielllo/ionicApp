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
        <ion-item>{{ photo.name }}</ion-item>
      </ion-list>
    </ion-content>
    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button @click="takePhoto">
        <ion-icon :icon="camera"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-page>
</template>
<script setup>
import { camera } from "ionicons/icons";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Geolocation } from "@capacitor/geolocation";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/vue";

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
    const position = await Geolocation.getCurrentPosition();
    const newPhoto = {
      id: `${store.state.photos.length + 1}`,
      name: `Photo + ${store.state.photos.length + 1}`,
      description: "Lorem ipsum",
      date: new Date().toLocaleDateString(),
      location: `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`,
      url: photo.webPath,
    };
    store.comit("addPhoto", newPhoto);
    // photoUrl.value = photo.webPath;
    // console.log(photo);
  } catch (error) {
    console.error("Błąd podczas robienia zdjęcia:", error);
  }
};
</script>
