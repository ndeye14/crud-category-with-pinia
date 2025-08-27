<template>
    <!-- table -->

    <section class="table_outer">


        <div class="container">
            <h4 class="text-center pt-4">La liste des categories</h4>

            <div class="row justify-content-center mt-4">
                <!-- entete -->

                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12 mb-2">
                        <div class="row">
                            <div class="col-6">
                                <!-- Button trigger modal -->
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop">
                                    <i class="bi bi-plus-lg"></i>Ajouter une catégorie
                                </button>
                            </div>
                            <div class="col-3">
                                <ThemeToggle />

                                <!-- <select class="form-select form-select-solid ms-3" v-model="itemsPerPage"
                                    @change="updateItemsPerPage">
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                </select> -->
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 mb-2 ">
                        <input type="text" v-model="searchQuery" @input="updateSearchQuery"
                            class="form-control form-control-solid  ps-13" placeholder="Recherche  catégorie" />
                    </div>

                </div>
                <!-- end entete -->
                <div class="col-12">
                    <div class="card border-0 shadow">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-hover table-line table-striped table-borderless mb-0">
                                    <thead class="table-dark">
                                        <tr>

                                            <th scope="col-3">ID</th>
                                            <th scope="col-3" @click="changeSort('name')">NOM
                                                <i :class="{
                                                    'bi bi-arrow-up': sortField === 'name' && sortOrder === 'asc',
                                                    'bi bi-arrow-down': sortField === 'name' && sortOrder === 'desc',
                                                }"></i>
                                            </th>
                                            <th scope="col-4">DESCRIPTION</th>
                                            <th scope="col-3" @click="changeSort('created_at')">CREER PAR
                                                <i :class="{
                                                    'bi bi-arrow-up': sortField === 'created_at' && sortOrder === 'asc',
                                                    'bi bi-arrow-down': sortField === 'created_at' && sortOrder === 'desc',
                                                }"></i>
                                            </th>
                                            <th scope="col-2">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in categories" :key="item.id">
                                            <td>{{ (currentPage - 1) * itemsPerPage + index
                                                + 1 }}</td>
                                            <td>{{ item.name }}</td>
                                            <td>{{ item}}</td>
                                            <td>{{ formatDate(item.createdAt) }}</td>
                                            <td>
                                                <button type="button" class="btn btn-success btn-sm px-2 me-2"
                                                    @click="categoryStore.showCategoryDetails(item.id)"
                                                    data-bs-toggle="modal" data-bs-target="#staticBackdropEdit">
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <button type="button" class="btn btn-primary btn-sm px-2 me-2"
                                                    data-bs-toggle="modal" data-bs-target="#staticBackdrop1"
                                                    @click="categoryStore.showCategoryDetails(item.id)">
                                                    <i class="fa-solid fa-eye"></i>
                                                </button>
                                                <button type="button" class="btn btn-danger btn-sm px-2"
                                                    @click="handleDeleteClick(item.id)">
                                                    <i class="bi bi-trash-fill"></i>
                                                </button>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>


                        </div>
                        <!-- Pagination -->
                        <ul v-if="totalPages > 1" class="pagination justify-content-center">
                            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                <a class="page-link" href="#" @click.prevent="emitPrevPage">Previous</a>
                            </li>
                            <li class="page-item" :class="{ active: page === currentPage }" v-for="page in totalPages"
                                :key="page">
                                <a class="page-link" href="#" @click.prevent="emitGoToPage(page)">
                                    {{ page }}
                                </a>
                            </li>
                            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                <a class="page-link" href="#" @click.prevent="emitNextPage">Next</a>
                            </li>
                        </ul>

                    </div>

                </div>
            </div>
        </div>

        <!-- toast -->
        <div id="kt_docs_toast_stack_container"
            class="toast-container position-fixed top-0 end-0 p-3 toast-container-custom">
            <div class="toast  text-white bg-success" ref="toastRef" role="alert" aria-live="assertive"
                aria-atomic="true">
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

        <!-- confirm delete -->
        <div class="modal fade" id="confirmationModal" tabindex="-1" aria-labelledby="confirmationModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="confirmationModalLabel">Confirmation de Suppression</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Êtes-vous sûr de vouloir supprimer cette catégorie ?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                        <button type="button" class="btn btn-danger" @click="confirmDelete">Supprimer</button>
                    </div>
                </div>
            </div>
        </div>

    </section>

    <!-- end table -->

</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    computed,
    getCurrentInstance,
    onMounted,
    watch,
    
} from "vue";
import { useCategoryStore, type Category } from "@/stores/useCategoryStore";
import { Toast, Modal } from 'bootstrap';
import ThemeToggle from '@/components/ThemeToggle.vue'



export default defineComponent({
    name: "CategoryTable",
    components: {
        ThemeToggle
    },
    

    setup() {
        
        const searchQuery = ref("");
        const categoryStore = useCategoryStore(); // Utilisation du store de catégorie
        
        const toastMessage = ref("");
        const toastRef = ref("");
        
        const itemsPerPage = ref(15); // Nombre d'éléments par page
        const categoryToDelete = ref<string | null>(null); // ID de la catégorie à supprimer
        
        // Instance actuelle du composant
        const instance = getCurrentInstance();
        const categories = computed(() => categoryStore.pagination.items);
        
        // Observer les changements de itemsPerPage et mettre à jour les catégories en conséquence
        watch(itemsPerPage, (newCount) => {
            categoryStore.pagination.setItemsPerPage(newCount);
            categoryStore.getAllCategories();
            
        });
        watch(searchQuery, (newQuery) => {
            if (!newQuery) {
                categoryStore.pagination.setCurrentPage(1); // Réinitialiser à la première page uniquement si la recherche est vide
            }
            categoryStore.getAllCategories();
        });
        // Lors du montage du composant, récupérer les catégories
        onMounted(async () => {
            try {
                await categoryStore.getAllCategories();
                await categoryStore.pagination.items;
               
                console.log(categories.value)
                console.log("iiiiiiii", categoryStore.pagination)
            } catch (error) {
                console.error("Error fetching categories on mount:", error);
            }
        });
        
        
        // Mettre à jour la requête de recherche et appliquer le filtre
        const updateSearchQuery = (e: Event) => {
            const input = e.target as HTMLInputElement;
            const query = input.value;
            categoryStore.pagination.addFilter("name",  query);
            categoryStore.getAllCategories();
        };
        
        
        

        // Mettre à jour le nombre d'éléments par page
        const updateItemsPerPage = async (e: Event) => {
            const select = e.target as HTMLSelectElement;
            const newItemsPerPage = Number(select.value);
            console.log("Nouveau nombre d'éléments par page : ", newItemsPerPage);

            categoryStore.pagination.setItemsPerPage(newItemsPerPage);
            await categoryStore.getAllCategories();
            console.log(categoryStore.getAllCategories() )
        };
        


        
        // Calcul des pages courantes et totales pour la pagination
        const currentPage = computed(() => categoryStore.pagination.currentPage);
        
        const totalPages = computed(() => categoryStore.pagination.totalPages());
            console.log("fffffffff",totalPages.value);
        console.log("nnnnnn",currentPage.value);
    
        const sortField = computed(() => categoryStore.pagination.sortField);
        const sortOrder = computed(() => categoryStore.pagination.sortOrder);
        console.log(sortOrder.value, sortField.value)
        // Passer à la page précédente et mettre à jour les catégories
        const emitPrevPage = async () => {
            categoryStore.pagination.prevPage();
            await categoryStore.getAllCategories();
            scrollToTop(); // Remonter en haut de la page
        };

        // Passer à la page suivante et mettre à jour les catégories
        const emitNextPage = async () => {
            categoryStore.pagination.nextPage();
            await categoryStore.getAllCategories();
            scrollToTop(); // Remonter en haut de la page
        };

        // Aller à une page spécifique et mettre à jour les catégories
        const emitGoToPage = async (page: number) => {
            categoryStore.pagination.goToPage(page);
            await categoryStore.getAllCategories();
            scrollToTop(); // Remonter en haut de la page
        };


        // Méthode pour afficher le toast
        const showToast = (message: string) => {
            toastMessage.value = message;
            console.log("Toast message:", message);
            console.log("Toast ref:", toastRef.value);
            if (toastRef.value) {
                const toastInstance = Toast.getOrCreateInstance(toastRef.value);
                toastInstance.show();
            }
        };
        // const handleDeleteClick = async (id) => {
        //     try {
        //         await categoryStore.deleteCategory(id);
        //         showToast("Category supprimée avec succès");
        //         await categoryStore.getAllCategories();
        //     } catch (error) {
        //         console.error("Erreur lors de la suppression de la catégorie : ", error);
        //         showToast("Erreur lors de la suppression de la catégorie");
        //     }
        // };
        // Fonction pour afficher la boîte de dialogue de confirmation
        const handleDeleteClick = (id: string) => {
            categoryToDelete.value = id; // Définir la catégorie à supprimer
            const confirmationModal = new Modal(document.getElementById('confirmationModal') as HTMLElement);
            confirmationModal.show(); // Afficher la boîte de dialogue
        };
        // Fonction pour confirmer la suppression
        const confirmDelete = async () => {
            if (categoryToDelete.value) {
                try {
                    await categoryStore.deleteCategory(categoryToDelete.value);
                    showToast("Category supprimée avec succès");
                    await categoryStore.getAllCategories();
                } catch (error) {
                    console.error("Erreur lors de la suppression de la catégorie : ", error);
                    showToast("Erreur lors de la suppression de la catégorie");
                } finally {
                    categoryToDelete.value = null; // Réinitialiser la catégorie à supprimer
                    const confirmationModal = Modal.getInstance(document.getElementById('confirmationModal') as HTMLElement);
                    confirmationModal?.hide(); // Cacher la boîte de dialogue
                }
            }
        };


        const handleEditClick = (id: string) => {
            instance?.emit("editCategory", id);
            categoryStore.getAllCategories();
        };
       
        // Changer le tri des catégories par champ
        const changeSort = (field: string) => {
            categoryStore.pagination.setSortField(field);
            console.log("field",field)

            // Afficher les valeurs de sortField et sortOrder après la modification
            console.log(`Tri par champ: ${categoryStore.pagination.sortField}`);
            console.log(`Ordre de tri: ${categoryStore.pagination.sortOrder}`);

            // Récupérer toutes les catégories avec les nouveaux paramètres de tri
            categoryStore.getAllCategories();
           
            console.log("change sort",categoryStore.getAllCategories())
            
        };
        // defilement en haut
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth', // Animation fluide
            });
        };
        // formatage de la date 
        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            const options: Intl.DateTimeFormatOptions = {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            };
            return date.toLocaleDateString('fr-FR', options); // Utilise 'fr-FR' pour le format français
        };

        




        // Retour des éléments et fonctions nécessaires au template
        return {
            handleDeleteClick,
            handleEditClick,
            searchQuery,
            emitPrevPage,
            emitNextPage,
            emitGoToPage,
            categoryStore,
            toastMessage,
            toastRef,
            showToast,
            updateSearchQuery,
            updateItemsPerPage,
            itemsPerPage,
            changeSort,
            sortField,
            sortOrder,
            currentPage,
            totalPages,
            categories,
            scrollToTop,
            formatDate,
            confirmDelete,

        };
    },
});
</script>
<style>
@import  '../assets/main.css';


.table_outer {
    padding: 20px 0px;
    position: relative;
    min-height: 100vh;
    
}

table {
    position: sticky;
    top: 0;
    z-index: 1;
    
}

table td,
table th {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.card {
    border-radius: .5rem;
}
.container{
    width: 1300px !important;
    justify-content: center;
}
.toast-container-custom {
    z-index: 1050;
}
.toast{
background-color: red;
}
</style>


