<template>
    <div class="modal fade" ref="addCategoryModalRef" id="staticBackdrop1" data-bs-backdrop="static"
        data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body" ref="formRef">
                    <div class="modal-header">
                        <h5 class="card-title text-center">Detail de la Catégorie</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="card-body" v-if="categoryStore.selectedCategory" ref="formRef">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"><strong>ID:</strong>{{
                                categoryStore.selectedCategory.id }} </label>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"><strong>Name:</strong> {{
                                categoryStore.selectedCategory.name }}</label>

                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label"><strong>Description:</strong> {{
                                categoryStore.selectedCategory.description }}</label>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {
    defineComponent,
    ref,
    computed,

} from "vue";
import { useCategoryStore } from "@/stores/useCategoryStore";

export default defineComponent({
    name: "DetailCategory",
    
    setup() {
        
        const categoryStore = useCategoryStore(); 
        console.log("Form data edit", categoryStore.selectedCategory);
        
        
        // Retour des éléments et fonctions nécessaires au template
        return {
            
            categoryStore,
            

        };
    },
});
</script>
