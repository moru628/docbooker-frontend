const initialState = {
    message: "Hello, world!",
  };
  
  const simpleReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_MESSAGE":
        return {
          ...state,
          message: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default simpleReducer;
  