function reducer(state, action) {
  switch (action.type) {
    case "Current_User":
      return { ...state, user: action.payload };
    case "Get_All_Products":
      return { ...state, products: action.payload };
    case "Create_One_Products":
      return { ...state, products: [...state.products, action.payload] };
    case "Update_one_Products":
      return {
        ...state, products: state.products.map((products) =>
          products._id === action.payload._id ? { ...products, ...action.payload } : products
        ),
      };
    case "Delete_One_Products":
      return {
        ...state, products: state.products.filter((products) => products._id !== action.payload_.id)
      };
    default:
      return state;
  }
}
export default reducer;