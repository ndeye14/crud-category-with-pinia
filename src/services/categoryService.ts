import type  { App } from "vue";
import type { AxiosResponse } from "axios";
import axios from "axios";
import VueAxios from "vue-axios";

class CategoryService {
  public static vueInstance: App;

  public static init(app: App<Element>) {
    CategoryService.vueInstance = app;
    CategoryService.vueInstance.use(VueAxios, axios);
    CategoryService.vueInstance.axios.defaults.baseURL =
      import.meta.env.VITE_APP_API_URL;
  }
  

  public static async post(
    resource: string,
    params: any
  ): Promise<AxiosResponse> {
    return CategoryService.vueInstance.axios.post(`${resource}`, params, {});
  }
  public static async update(
    resource: string,
    slug: string,
    params: any
  ): Promise<AxiosResponse> {
    return CategoryService.vueInstance.axios.put(
      `${resource}/${slug}`,
      params,
      {}
    );
  }
  public static async put(
    resource: string,
    params: any
  ): Promise<AxiosResponse> {
    return CategoryService.vueInstance.axios.put(`${resource}`, params);
  }

  public static async delete(resource: string): Promise<AxiosResponse> {
    
    return CategoryService.vueInstance.axios.delete(resource, {});
  }

  public static async getById(resource: string): Promise<AxiosResponse> {
   
    return CategoryService.vueInstance.axios.get(resource);
  }

  public static async getAll(resource: string): Promise<AxiosResponse> {
    
    return CategoryService.vueInstance.axios.get(resource);
  }
}

export default CategoryService;
