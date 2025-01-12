<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Photos List</ion-title>
      </ion-toolbar>
      <h1 v-if="!photos.length">Dodaj zdjęcie</h1>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item
          v-for="photo in photos"
          :key="photo.id"
          @click="checkPhotoData(photo.id)"
        >
          <ion-thumbnail slot="start">
            <img :src="photo.url" alt="Photo" />
          </ion-thumbnail>
          <ion-label>
            <h2>{{ photo.name }}</h2>
            <p>{{ photo.description }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button @click="takePhoto">
        <ion-icon :icon="camera"></ion-icon>
      </ion-fab-button>
    </ion-fab>

    <ion-alert
      :is-open="showAlert"
      header="Please enter your info"
      :buttons="alertButtons"
      :inputs="alertInputs"
      @didDismiss="showAlert = false"
    ></ion-alert>
  </ion-page>
</template>

<script setup>
import { camera } from "ionicons/icons";
import { ref } from "vue";
import { useRouter } from "vue-router";
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
  IonThumbnail,
  IonLabel,
  IonAlert,
} from "@ionic/vue";

const router = useRouter();
const photos = ref([]);

const showAlert = ref(false);
const currentPhoto = ref(null);

const alertInputs = [
  { name: "name", placeholder: "Photo name", type: "text" },
  { name: "description", placeholder: "Description", type: "textarea" },
];

const alertButtons = [
  {
    text: "Cancel",
    role: "cancel",
    handler: () => {
      console.log("Cancelled");
    },
  },
  {
    text: "OK",
    handler: (data) => {
      if (data.name && data.description) {
        const position = currentPhoto.value.position;

        const newPhoto = {
          id: `${photos.value.length + 1}`,
          name: data.name,
          description: data.description,
          date: new Date().toISOString(),
          location: `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`,
          url: currentPhoto.value.url,
        };

        photos.value.push(newPhoto);
        savePhotosToLocalStorage();
        console.log("Dodano zdjęcie:", newPhoto);
      } else {
        console.error("Brak wymaganych danych");
      }
    },
  },
];

const savePhotosToLocalStorage = () => {
  localStorage.setItem("photos", JSON.stringify(photos.value));
};

const loadPhotosFromLocalStorage = () => {
  const storedPhotos = localStorage.getItem("photos");
  if (storedPhotos) {
    photos.value = JSON.parse(storedPhotos);
  }
};

const takePhoto = async () => {
  try {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 90,
    });

    const position = await Geolocation.getCurrentPosition();

    currentPhoto.value = { url: photo.webPath, position, id: photo.id };

    showAlert.value = true;
  } catch (error) {
    console.error("Błąd podczas robienia zdjęcia:", error);
  }
};

const checkPhotoData = (selectedPhotoId) => {
  const selectedPhoto = photos.value.find((photo) => photo.id === selectedPhotoId);
  if (selectedPhoto) {
    console.log("Selected photo:", selectedPhoto);

    // Przekierowanie do tab2 z użyciem routera
    router.push({
      path: '/tabs/tab2',
      query: {
        id: selectedPhoto.id,
        name: selectedPhoto.name,
        description: selectedPhoto.description,
        date: selectedPhoto.date,
        location: selectedPhoto.location,
        url: selectedPhoto.url,
      },
    });
  } else {
    console.error("Zdjęcie nie zostało znalezione.");
  }
};


loadPhotosFromLocalStorage();
</script>

<style>
h1 {
  display: flex;
  margin: 3%;
}
</style>
