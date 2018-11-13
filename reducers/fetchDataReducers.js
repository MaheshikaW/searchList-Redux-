const defaultState = {
  studentRecords :[],
  clickTimes:0,
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
        case "SEARCH_BY_VALUE":{
            let AllRecords = action.payload.allRecords
            
            
             let filterList = AllRecords.filter(student =>
               (student["schoolname"] === action.payload.schoolname || student["schoolname"] .toLowerCase().includes(action.payload.schoolname )) || ( student["schoolyear"] == action.payload.schoolname || student["schoolyear"] .toLowerCase().includes(action.payload.schoolname ) ) || (student["districtname"] == action.payload.schoolname ||  student["districtname"] .toLowerCase().includes(action.payload.schoolname ) ) )
            
           
               state ={...state,studentRecords:filterList}
        
             break
        }
      
        case "SORT_BY_VALUE":{
            let AllRecords = action.payload.allRecords
            let sortValue = action.payload.sortval
            let sortList = AllRecords.filter(student => student[ sortValue ] != null).sort((a, b) => {
              
                if (a[sortValue] < b[sortValue]) { return -1; }
               if (a[sortValue] > b[sortValue]) { return 1; }
            
              return 0;

            })

            state ={...state,studentRecords:sortList}
           // console.log(sortList,sortValue)
          break
        }
       case "SORT_BY_CLASS":{
           let AllRecords = action.payload.allRecords
            let sortValue = action.payload.sortval
            let sortList = AllRecords.filter(student => student[ sortValue ] != null).sort((a, b) => 
                a[sortValue] - b[sortValue])
       

            state ={...state,studentRecords:sortList}
            //console.log(sortList)
         break
        }
       
      
    }
    return state;
  }
  
  export default reducer;