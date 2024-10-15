<template>
    <div class="modal fade" ref="editCategoryModalRef" id="staticBackdropEdit" data-bs-backdrop="static"
        data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Modification de la catégorie</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" v-if="storeCategory.selectedCategory">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Nom catégorie</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1"
                            v-model="storeCategory.selectedCategory.name" placeholder="nom de la catégorie">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                            v-model="storeCategory.selectedCategory.description"></textarea>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fermer</button>
                    <button type="button" class="btn btn-success" @click="submit">Soumettre</button>
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
import { defineComponent, ref } from 'vue';
import { useCategoryStore, type Category } from "@/stores/useCategoryStore";
import { Modal, Toast } from "bootstrap";

export default defineComponent({
    name: "EditCategoryModal",
    setup(_, { emit }) {
        const storeCategory = useCategoryStore();
        const editCategoryModalRef = ref<null | HTMLElement>(null);
        const toastMessage = ref<string>("");
        const toastRef = ref<null | HTMLElement>(null);

        const hideModal = (modalRef: HTMLElement | null) => {
            if (modalRef) {
                const modalInstance = Modal.getInstance(modalRef);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        };
        

        const submit = async () => {
            if (!storeCategory.selectedCategory) return;
            try {
                await storeCategory.editCategory(storeCategory.selectedCategory.id, storeCategory.selectedCategory);
                if (editCategoryModalRef.value) {
                    showToast("catégorie modifiée avec success");
                    hideModal(editCategoryModalRef.value);
                    emit("categoryUpdated");
                }
            } catch (error) {
                showToast("erreur l'hors de la modification");
                console.error("Error editing catégorie:", error);
            }
        };
        const showToast = (message: string) => {
            toastMessage.value = message;
            if (toastRef.value) {
                const toastInstance = Toast.getOrCreateInstance(toastRef.value);
                toastInstance.show();
            }
        };

        return {
            storeCategory,
            submit,
            editCategoryModalRef,
             toastMessage ,
            toastRef,
            showToast,
        }
    },
})
</script> 



