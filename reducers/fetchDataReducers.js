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
        case "SEARCH_BY_SCHOOLNAME":{
            let AllRecords = action.payload.allRecords
            let filterList = AllRecords.filter(student =>
             student["schoolname"] === action.payload.schoolname || student["schoolname"].toLowerCase().includes(action.payload.schoolname))
             state ={...state,studentRecords:filterList}
             break
        }
        case "SEARCH_BY_YEAR":{
            let AllRecords = action.payload.allRecords
            let filterList = AllRecords.filter(student =>
             student["schoolyear"] === action.payload.year || student["schoolyear"].toLowerCase().includes(action.payload.year))
             state ={...state,studentRecords:filterList}
             break
        }
        case "SEARCH_BY_DISTRICT":{
            let AllRecords = action.payload.allRecords
            let filterList = AllRecords.filter(student =>
             student["districtname"] === action.payload.district || student["districtname"].toLowerCase().includes(action.payload.district))
             state ={...state,studentRecords:filterList}
             break
        }
      
      
    }
    return state;
  }
  
  export default reducer;