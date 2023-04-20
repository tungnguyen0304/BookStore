export const cartReducer = (state = [], action) => {
    let exist
    switch (action.type) {
        case "INCREASE":
            exist = state.find((x) => x.ID === action.payload.ID);
            if (exist) {
                return state.map((x) =>
                    x.ID === action.payload.ID ? { ...exist, qty: exist.qty + 1 } : x
                );
            } else {
                return [...state, { ...action.payload, qty: 1 }];
            }
        case "DECREASE":
            exist = state.find((x) => x.ID === action.payload.ID);
            if (exist.qty === 1) {
                return state.filter((x) => x.ID !== action.payload.ID);
            } else {
                return state.map((x) =>
                    x.ID === action.payload.ID ? { ...exist, qty: exist.qty - 1 } : x
            );
            }
        case "DELETE":
            return state.filter((x) => x.ID !== action.payload.ID);
        default: 
            return state;
    }
};
  
  
  export default cartReducer;