import { createSlice} from '@reduxjs/toolkit';
const getproduct = createSlice({
  name: 'getproduct',

  initialState: {
    users: [],
    userscontainer:[],
    loading: false,
    error: null,
  },
  reducers: {
    filterusers: (state, action) => {
      const { sizes = [], brands = [], conditions = [], colors = [], subCategories = [], minPrice = 0, maxPrice = Number.MAX_SAFE_INTEGER } = action.payload;
      console.log(action.payload);
      const filteredUsers = state.userscontainer.filter(user => (
        (sizes.length === 0 || sizes.includes(user.size)) &&
        (brands.length === 0 || brands.includes(user.brand)) &&
        (conditions.length === 0 || conditions.includes(user.condition)) &&
        (colors.length === 0 || colors.includes(user.color)) &&
        (subCategories.length === 0 || subCategories.includes(user.sub_cat)) &&
        (user.price >= minPrice && user.price <= maxPrice)
      ));
      state.users = filteredUsers;
    },
    fetchDataStart: (state) => {
      state.loading = true;
    },
    fetchDataSuccess :(state, action) => {
      state.loading = false;
    
      state.users = action.payload;
      state.userscontainer=action.payload;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure , filterusers} = getproduct.actions;

export default getproduct.reducer;