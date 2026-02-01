import { HttpClient } from "./axios/HttpClient";
import { Category, SubCategory } from "@/models/Category";
import { CategoryStore } from "@/stores";
import Injector from "@/utils/injector";
import { CATEGORY_STORE } from "@/stores/identifiers";

class CategoryService extends HttpClient {
  private static instance: CategoryService;
  private _categoryStore: CategoryStore;

  constructor() {
    super();
    this._categoryStore = Injector.get<CategoryStore>(CATEGORY_STORE);
  }

  static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }
    return CategoryService.instance;
  }

  async getCategories(): Promise<Category[]> {
    this._categoryStore.setLoading(true);
    return this.get<Category[]>(`/categories`)
    .then((response) => {
        this._categoryStore.setCategories(response);
        return response;
    })
    .catch((error: Error) => {
        console.error(`Error fetch categories:`, error);
        throw error;
    })
    .finally(() => this._categoryStore.setLoading(false));
  }

  async createCategory(category: Category): Promise<any> {
    return this.put(`/category/create/${category.uuid}`, {...category})
    .then((response) => {
        this.getCategories();
        return response;
    })
    .catch((error: Error) => {
        console.error(`Error create category ${category.uuid}:`, error);
        throw error;
    });
  }

  async createSubCategory(subcategory: SubCategory): Promise<any> {
    return this.put(`/category/create/${subcategory.uuid}`, {...subcategory})
    .then((response) => {
      this.getCategories();
      return response;
    })
    .catch((error: Error) => {
        console.error(`Error create subcategory ${subcategory.uuid}:`, error);
        throw error;
    });
  }

  async saveCategory(category: Category): Promise<any> {
    return this.put(`/category/update/${category.uuid}`, {...category})
    .then((response) => {
        this.getCategories();
        return response;
    })
    .catch((error: Error) => {
        console.error(`Error update category ${category.uuid}:`, error);
        throw error;
    });
  }

  async saveSubCategory(subcategory: SubCategory): Promise<any> {
    return this.put(`/category/update/${subcategory.uuid}`, {...subcategory})
    .then((response) => {
      this.getCategories();
      return response;
    })
    .catch((error: Error) => {
        console.error(`Error update subcategory ${subcategory.uuid}:`, error);
        throw error;
    });
  }

  async getSubCategoriesByParentUuid(uuid: string): Promise<SubCategory[]> {
    return this.get<SubCategory[]>(`/category/childs/${uuid}`)
    .then((response) => {
        return response;
    })
    .catch((error: Error) => {
        console.error(`Error fetch subcategory ${uuid}:`, error);
        throw error;
    });
  }

  async deleteSubCategory(uuid: string): Promise<any> {
    return this.delete(`/category/childs/${uuid}`)
    .then((response) => {
        return response;
    })
    .catch((error: Error) => {
        console.error(`Error delete subcategory ${uuid}:`, error);
        throw error;
    });
  }

  async deleteCategory(uuid: string): Promise<any> {
    return this.delete(`/category/${uuid}`)
    .then((response) => {
        this.getCategories();
        return response;
    })
    .catch((error: Error) => {
        console.error(`Error delete category ${uuid}:`, error);
        throw error;
    });
  }
}

export default CategoryService;
