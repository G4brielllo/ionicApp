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
      <ion-item class="photo-style">
        <img :src="selectedPhoto.url" alt="Photo" class="photo" />
      </ion-item>
      <ion-item>
        <ion-icon :icon="pricetag"></ion-icon>
        <ion-label class="spaced-label">
          {{ " " + selectedPhoto.name }}
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-icon :icon="text"></ion-icon>
        <ion-label class="spaced-label">
          {{ selectedPhoto.description }}
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-icon :icon="calendar"></ion-icon>
        <ion-label class="spaced-label">
          {{ selectedPhoto.date }}
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-icon :icon="location"></ion-icon>
        <ion-label class="spaced-label">
          {{ selectedPhoto.location }}
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-icon :icon="link"></ion-icon>
        <ion-label class="spaced-label">
          {{ selectedPhoto.url }}
        </ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { pricetag, text, calendar, location, link } from "ionicons/icons";
import { useRouter } from "vue-router";
const router = useRouter();

const store = useStore();

const selectedPhoto = computed(() => store.getters.getSelectedPhoto);
import {
  IonButtons,
  IonButton,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/vue";

const goBack = () => {
    router.push('/tabs/tab1'); 
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
