class Pagination<T> {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  items: T[];
  filters: Record<string, string>;
  sortField: string;
  sortOrder: "asc" | "desc";

  constructor(config?: Partial<Pagination<T>>) {
    this.itemsPerPage = config?.itemsPerPage || 15;
    this.currentPage = config?.currentPage || 1;
    this.totalItems = config?.totalItems || 0;
    this.items = config?.items || [];
    this.filters = config?.filters || {};
    this.sortField = config?.sortField || null;
    this.sortOrder = config?.sortOrder || "asc";
  }

  setItemsPerPage(count: number) {
    this.itemsPerPage = count;
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  setTotalItems(total: number) {
    this.totalItems = total;
  }

  setItems(items: T[]) {
    this.items = items;
    if (this.items.length === 0 && this.currentPage > this.totalPages()) {
      this.currentPage = this.totalPages();
    }
  }

  addFilter(field: string, value: string) {
    this.filters[field] = value;
  }

  removeFilter(field: string) {
    delete this.filters[field];
  }

  setSortField(field: string) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
    } else {
      this.sortField = field;
      this.sortOrder = "asc";
    }
  }

  setSortOrder(order: "asc" | "desc") {
    this.sortOrder = order;
  }

  get offset() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) this.currentPage++;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  getTotalItems() {
    return this.totalItems;
  }

  get queryString() {
    const filterString = Object.entries(this.filters)
      .map(([field, value]) => {
        return `filter[${field}]=${value}`;
      })
      .join("&");

    const sortString = this.sortField
      ? `&sort=${this.sortOrder === "asc" ? "" : "-"}${this.sortField}`
      : "";

    const paginationString = `page=${this.currentPage}`;

    return `${paginationString}${
      filterString ? "&" + filterString : ""
    }${sortString}`;
  }
}

export default Pagination;
