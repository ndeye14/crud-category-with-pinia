

<template>
    <!-- Modal -->
    <div class="modal fade" ref="addCategoryModalRef" id="staticBackdrop" data-bs-backdrop="static"
        data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title  text-center fs-5" id="staticBackdropLabel">Ajouter une catégorie</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" ref="formRef">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Nom catégorie</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" v-model="formData.name"
                            placeholder="nom de la catégorie">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" v-model="formData.description"
                            rows="3"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fermer</button>
                    <button type="button" class="btn btn-success" :disabled="!categoryName.trim()"
                        @click="submit">Soumettre</button>
                </div>
            </div>
        </div>
    </div>
    <!-- toast -->
    <div id="kt_docs_toast_stack_container"
        class="toast-container position-fixed top-0 end-0 p-3 toast-container-custom">
        <div class="toast bg-success text-white" ref="toastRef" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="ki-duotone ki-abstract-23 fs-2 text-success me-3"><span class="path1"></span><span
                        class="path2"></span></i>
                <strong class="me-auto">Notification</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {{ toastMessage }}
            </div>

        </div>
    </div>
</template>


<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import { useCategoryStore, type Category } from "@/stores/useCategoryStore";
import { Modal, Toast } from "bootstrap";




export default defineComponent({
    name: "AddCategoryModal",
    
    setup(_, { emit }) {
        const storeCategory = useCategoryStore();
        const toastMessage = ref<string>("");
        const toastRef = ref<null | HTMLElement>(null);
        const loading = ref<boolean>(false);
        const formRef = ref<null | HTMLFormElement>(null);
        const addCategoryModalRef = ref<null | HTMLElement>(null);
        const categoryName = computed(() => formData.value.name);
        



        const formData = ref<Category>({
            name: "",
            id: "",
            created_at: new Date(),
            updated_at: new Date(),
            description: "",

        });
        console.log("je suis formData",formData);


        const hideModal = (modalRef: HTMLElement | null) => {
            if (modalRef) {
                const modalInstance = Modal.getInstance(modalRef);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        };

        const showToast = (message: string) => {
            toastMessage.value = message;
            if (toastRef.value) {
                const toastInstance = Toast.getOrCreateInstance(toastRef.value);
                toastInstance.show();
            }
        };
        const submit = async () => {
            if (!formRef.value) return;
            console.log(formRef.value);

            try {
                loading.value = true;
                await storeCategory.addCategory(formData.value);

                showToast("catégorie ajoutée avec success");
                hideModal(addCategoryModalRef.value);
                //  permet au composant courant de signaler à son environnement qu'une nouvelle catégorie a été ajoutée, offrant ainsi une manière propre et découplée pour les autres composants de réagir à cet événement.
                emit("categoryAdded");
                // Réinitialisation des champs de formData
                formData.value = {
                    name: '',
                    description: '',
                    id: '',
                    created_at: '',
                    updated_at: '',
                    
                };

            } catch (error) {
                showToast("erreur l'hors de l'ajout");
            } finally {
                loading.value = false;
            }
        };
        
        
        

        

        return {
            submit,
            formRef,
            formData,
            loading,
            addCategoryModalRef,
            toastRef,
            toastMessage,
            categoryName
           
           
            
        };
    },
});
</script>
<style scoped>



</style>
