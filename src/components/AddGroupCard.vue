<template>
    <div class="simpleCard">
        <h2>Lista de Grupos Publicos</h2>
        <hr>
        <div v-for="(group, index) in publicGroups" :key="group.idIssue" class="chat-item">
            <div class="chat-info">
                <h3>{{ group.name }}</h3>
                <p> {{ group.description }}</p>
            </div>
            <div class="chat-sidebar">
                <button class="simpleButton" @click="enterTheChat(group.id, index)">Entrar</button>
                <Loader :showLoader="loadingAddGroup[index]" :typeLoader="1" />
            </div>
            <hr>
        </div>
        <Loader :showLoader="loading" :typeLoader="2" />
    </div>
</template>

<script>
import axios from 'axios';
import Loader from '@/components/Loader.vue'
export default {
    components: {
        Loader
    },
    data() {
        return {
            loading: false,
            loadingAddGroup: [],
            publicGroups: [],
        };
    },
    mounted() {
        this.getIssues();
    },
    methods: {
        async getIssues() {
            this.loading = true;
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/Groups/PublicGroups`);
                // Asigna directamente los datos de respuesta a this.Groups
                this.loading = false;
                this.publicGroups = response.data.data;
                this.loadingAddGroup = new Array(this.publicGroups.length).fill(false);
                console.log(this.publicGroups); // Comprueba que los datos se hayan asignado correctamente
            } catch (error) {
                this.loading = false;
                console.error('Error al obtener los issues:', error);
            }
        },
        async enterTheChat(id, index) {
            this.loadingAddGroup[index] = true;
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/Issues/groupId`, {
                    idGroup: id,
                    joinedDate: this.convertHour(),
                });
                this.loadingAddGroup[index] = false;
                console.log(response.data);
                window.confirm('😎👌 El usuario se ha agregado al Grupo');
                window.location.reload();
            } catch (error) {
                console.error(error.message);
                window.alert('El usuario ya esta agregado al Grupo');
                this.loadingAddGroup[index] = false;
            }
        },
        convertHour() {
            const fechaHoraActual = new Date();
            const year = fechaHoraActual.getFullYear();
            const month = String(fechaHoraActual.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
            const day = String(fechaHoraActual.getDate()).padStart(2, '0');
            const hours = String(fechaHoraActual.getHours()).padStart(2, '0');
            const minutes = String(fechaHoraActual.getMinutes()).padStart(2, '0');
            const seconds = String(fechaHoraActual.getSeconds()).padStart(2, '0');

            const fechaHoraFormateada = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

            return fechaHoraFormateada;
        }
    }

};
</script>

<style></style>