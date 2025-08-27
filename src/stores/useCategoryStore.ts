import { defineStore } from "pinia";
import { ref } from "vue";
import CategoryService from "@/services/categoryService";
import Pagination from "@/shared/pagination";
import { formatItem, formatCategoryData } from "@/shared/apiformat";

export interface Category {
  id: string;
  name: string;
  description: string;
  created_at: any;
  updated_at: any;
}

export const useCategoryStore = defineStore("category", () => {
  const errors = ref({});
  const pagination = ref(new Pagination<Category>());
  const selectedCategory = ref(null);
  const showModal = ref(false);

  function setError(error: any) {
    errors.value = { ...error };
  }

  const addCategory = async (credentials: Category) => {
    const payload = {
      name: credentials.name,
      description: credentials.description,
    };

    try {
      const { data } = await CategoryService.post("categories", payload);
      const newCategory = formatItem(data);
      pagination.value.setItems([newCategory, ...pagination.value.items]);
      pagination.value.setTotalItems(pagination.value.totalItems + 1);
    } catch (error) {
      setError(error);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await CategoryService.delete(`categories/${id}`);
      pagination.value.setItems(
        pagination.value.items.filter((cat) => cat.id !== id)
      );
      pagination.value.setTotalItems(pagination.value.totalItems - 1);

      if (
        pagination.value.items.length === 0 &&
        pagination.value.currentPage > 1
      ) {
        pagination.value.prevPage();
      }
    } catch (error) {
      setError(error);
    }
  };

  const getCategoryById = async (id: string) => {
    try {
      const response = await CategoryService.getById(`categories/${id}`);
      console.log(response.data.data);
      console.log(formatItem(response.data.data));
      return formatItem(response.data.data);
    } catch (error) {
      setError(error);
      throw error;
    }
  };
  // const getCategoryById = async (id) => {
  //   try {
  //     const { data } = await CategoryService.getById(`categories/${id}`);
  //     console.log("Détails de la catégorie récupérée : ", data); // Debugging
  //     console.log("Détails de la catégorie récupérée : ", formatItem(data)); // Debugging
  //     return formatItem(data);
  //   } catch (error) {
  //     setError(error);
  //     throw error;
  //   }
  // };

  const editCategory = async (id: string, updatedCategory: Category) => {
    try {
      const { data } = await CategoryService.update(
        `categories`,
        id,
        updatedCategory
      );
      const updatedItem = formatItem(data);
      const index = pagination.value.items.findIndex((cat) => cat.id === id);
      if (index !== -1) {
        pagination.value.items[index] = updatedItem;
      }
    } catch (error) {
      setError(error);
    }
  };

  const showCategoryDetails = async (categoryId: string) => {
    try {
      selectedCategory.value = await getCategoryById(categoryId);
      console.log("id", selectedCategory.value);
      showModal.value = true;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails de la catégorie:",
        error
      );
    }
  };

  // const getAllCategories = async (
  //   params: {
  //     filters?: Record<string, string>;
  //     sortField?: string;
  //     sortOrder?: string;
  //     itemsPerPage?: number;
  //     currentPage?: number;
  //     searchField?: string;
  //     searchQuery?: string;
  //   } = {}
  // ) => {
  //   try {
  //     // Mise à jour des paramètres de pagination.value selon les arguments passés
  //     // Cette ligne fusionne les paramètres passés (params) avec les valeurs actuelles de pagination.value
  //     // Cela permet de mettre à jour plusieurs paramètres de pagination en une seule fois
  //     Object.assign(pagination.value, params);

  //     // Construction de l'URL de requête en utilisant la chaîne de requête générée par pagination.value.queryString
  //     const requestUrl = `categories?${pagination.value.queryString}`;

  //     // Envoi de la requête GET à l'API pour récupérer les catégories
  //     const response = await CategoryService.getAll(requestUrl);

  //     // Affichage de l'URL de requête dans la console pour débogage
  //     console.log(requestUrl);
  //     console.log(response.data);

  //     // Mise à jour des éléments de pagination avec les données reçues de l'API
  //     pagination.value.setItems(formatCategoryData(response.data));

  //     // Mise à jour du nombre total d'éléments de pagination
  //     // Si le nombre total d'éléments (data.meta?.count) est disponible, il est utilisé
  //     // Sinon, la longueur des éléments actuels (pagination.value.items.length) est utilisée
  //     pagination.value.setTotalItems(
  //       response.data.meta?.total || pagination.value.items.length
  //     );
  //     console.log(response.data);
  //     console.log(pagination.value);
  //   } catch (error) {
  //     // En cas d'erreur, capture et enregistrement de l'erreur dans l'état
  //     setError(error);

  //     // L'erreur est relancée pour être éventuellement gérée par le code appelant
  //     throw error;
  //   }
  // };
//  const getAllCategories = async (
//   params: {
//     filters?: Record<string, string>;
//     sortField?: string;
//     sortOrder?: string;
//     itemsPerPage?: number;
//     currentPage?: number;
//     searchField?: string;
//     searchQuery?: string;
//   } = {}
// ) => {
//   try {
//     Object.assign(pagination.value, params);

//     const requestUrl = `categories?${pagination.value.queryString}`;
//     const response = await CategoryService.getAll(requestUrl);

//     console.log("Hydra API response:", response.data);

//     // Les catégories sont dans response.data.member
//     pagination.value.setItems(formatCategoryData(response.data.member));

//     // Le total est dans response.data.totalItems
//     pagination.value.setTotalItems(
//       response.data.totalItems || response.data.member.length
//     );

//     console.log(pagination.value);
//   } catch (error) {
//     setError(error);
//     throw error;
//   }
// };

  const getAllCategories = async (
  params: {
    filters?: Record<string, string>;
    sortField?: string;
    sortOrder?: string;
    itemsPerPage?: number;
    currentPage?: number;
    searchField?: string;
    searchQuery?: string;
  } = {}
) => {
  try {
    Object.assign(pagination.value, params);

    const requestUrl = `categories?${pagination.value.queryString}`;
    const response = await CategoryService.getAll(requestUrl);

    console.log("API Response brut:", response.data);

    // Vérification du format Hydra
    if (!response.data || !Array.isArray(response.data.member)) {
      throw new Error("Réponse API invalide : format Hydra attendu");
    }

    // Mise à jour des catégories
    pagination.value.setItems(formatCategoryData(response.data.member));

    // Nombre total d’items
    pagination.value.setTotalItems(
      response.data.totalItems || response.data.member.length
    );

    console.log("Pagination mise à jour:", pagination.value);
  } catch (error) {
    console.error("Erreur dans getAllCategories:", error);
    setError(error);
    throw error;
  }
};


  

  return {
    pagination,
    getAllCategories,
    addCategory,
    deleteCategory,
    getCategoryById,
    editCategory,
    showCategoryDetails,
    selectedCategory,
  };
});


