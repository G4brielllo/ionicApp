<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="goBack">Back</ion-button>
        </ion-buttons>
        <ion-title>Photo Data</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-item class="photo-style" v-if="selectedPhoto">
        <img :src="selectedPhoto.url" alt="Photo" class="photo" />
      </ion-item>
      <ion-item v-if="selectedPhoto">
        <ion-icon :icon="pricetag"></ion-icon>
        <ion-label class="spaced-label">
          {{ " " + selectedPhoto.name }}
        </ion-label>
      </ion-item>
      <ion-item v-if="selectedPhoto">
        <ion-icon :icon="text"></ion-icon>
        <ion-label class="spaced-label">
          {{ selectedPhoto.description }}
        </ion-label>
      </ion-item>
      <ion-item v-if="selectedPhoto">
        <ion-icon :icon="calendar"></ion-icon>
        <ion-label class="spaced-label">
          {{ selectedPhoto.date }}
        </ion-label>
      </ion-item>
      <ion-item v-if="selectedPhoto">
        <ion-icon :icon="location"></ion-icon>
        <ion-label class="spaced-label">
          {{ selectedPhoto.location }}
        </ion-label>
      </ion-item>
      <ion-item v-if="selectedPhoto">
        <ion-icon :icon="link"></ion-icon>
        <ion-label class="spaced-label">
          {{ selectedPhoto.url }}
        </ion-label>
      </ion-item>
      <ion-item v-else>
        <ion-label>No photo data available.</ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { pricetag, text, calendar, location, link } from "ionicons/icons";
import {
  IonPage,
  IonButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonIcon,
  IonLabel,
} from "@ionic/vue";
const router = useRouter();
const route = useRoute();

const selectedPhoto = ref(null);

// Pobierz dane zdjęcia z parametrów routera
if (route.query.id) {
  selectedPhoto.value = {
    id: route.query.id,
    name: route.query.name,
    description: route.query.description,
    date: route.query.date,
    location: route.query.location,
    url: route.query.url,
  };
}

const goBack = () => {
  router.push("/tabs/tab1");
};
</script>

<style scoped>
.ion-toolbar {
  display: flex;
  justify-items: center;
  align-items: center;
}
.spaced-label {
  padding-left: 15px;
}

.photo-style {
  display: flex;
  justify-content: center;
  align-items: center; 
  max-width: 70%;
  max-height: 70%; 
  margin: 0 auto;
}

.photo {
  width: 100%; 
  height: auto; 
}
</style>
