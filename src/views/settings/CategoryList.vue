<template>
    <div>
        <TablesWidget9 widget-classes="mb-5 mb-xl-8" @editCategory="handleEditCategory"
            @categoryAdded="getAllCategories" @categoryUpdated="getAllCategories">
        </TablesWidget9>
        <!-- Le parent pourrait écouter l'événement "categoryAdded" et déclencher la méthode getAllCategories, qui pourrait par exemple recharger la liste des catégories : -->
        <AddCategory @categoryAdded="getAllCategories" />
        <DetailCategory />
        <EditCategoryModal :editCategoryId="selectedCategoryId" @categoryUpdated="getAllCategories" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import TablesWidget9 from "@/views/CategoryTable.vue";
import { useCategoryStore } from "@/stores/useCategoryStore";
import AddCategory from "@/components/modals/AddCategoryModal.vue"
import DetailCategory from "@/components/modals/DetailCategoryModal.vue"
import EditCategoryModal from "@/components/modals/EditCategoryModal.vue";

export default defineComponent({
    name: "CategoryList",
    
    components: {
        TablesWidget9,
        AddCategory,
        DetailCategory,
        EditCategoryModal,
    },
    setup() {
        const selectedCategoryId = ref<string>("");
        const categoryStore = useCategoryStore();
        const { getAllCategories } = categoryStore;
        
        

        const handleEditCategory = (id: string) => {
            selectedCategoryId.value = id;
        };
        

        onMounted(async () => {
            try {
                await getAllCategories();
            } catch (error) {
                console.error("Error fetching categories on mount:", error);
            }
        });

        return {
            getAllCategories,
            handleEditCategory,
            selectedCategoryId,
          
            
        };
    },
});
</script>
