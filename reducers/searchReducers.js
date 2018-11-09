const defaultState = {
  studentRecords :[],
  isLoading:false,
  err:undefined
  
 
  
    
    
  
  
  
  }
  const reducer = (state = defaultState, action) => {
  
  
    switch (action.type) {
        case "RECIEVE_DATA":{

            
            let studentRecords= [...action.payload,...state.studentRecords, ]
            state = {...state, studentRecords:studentRecords ,isLoading:false,err:false}
            //console.log(studentRecords)
			break
           // state 
          
        }
        case "FETCH_DATA_START":{

       state = {...state ,isLoading:true,err:false}
            break

        }
        case "RECIEVE_ERROR":{
        
            state = {...state ,isLoading:false,err:action.payload}
            break
        }
      
      
    }
    return state;
  }
  
  export default reducer;