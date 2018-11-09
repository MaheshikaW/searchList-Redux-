const defaultState = {
  studentRecords :[],
 
  
    
    
  
  
  
  }
  const reducer = (state = defaultState, action) => {
  
  
    switch (action.type) {
        case "RECIEVE_DATA":{

            
            let studentRecords= [...action.payload,...state.studentRecords, ]
            state = {...state, studentRecords:studentRecords }
            console.log(studentRecords)
			break
           // state 
            break
        }
        case "FETCH_DATA_START":{
       
            break

        }
        case "RECIEVE_ERROR":{
           console.log(action.payload)

            break
        }
      
      
    }
    return state;
  }
  
  export default reducer;