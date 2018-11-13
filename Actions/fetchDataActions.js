import axios from 'axios'


export const fetchData=()=>{
    return((dispatch)=>{
    
        dispatch(fetchSearchData())
        axios.get("https://data.delaware.gov/resource/ncv7-2w22.json")
        .then((response)=>{
           dispatch(recieveData(response))
        }) 
    .catch((err)=>{
        dispatch(recieveErr(err))

    })
})
}
export const  serachByValue =(schoolname,allRecords) =>{
    return ((dispatch)=>{
		dispatch(serachByvalue(schoolname,allRecords))
	})
}


export const sortByValue=(allRecords,sortval)=>{
    return ((dispatch)=>{
        dispatch(sortByvalue(allRecords,sortval))
    })
}
export const sortByClassSize=(allRecords,sortval)=>{
    return ((dispatch)=>{
        dispatch(sortByClass(allRecords,sortval))
    })
}




function fetchSearchData(){
    return {
        type:"FETCH_DATA_START"
    }

}

function recieveData(response){
    return{
        type:"RECIEVE_DATA",
        payload:response.data
    }
}

function recieveErr(err){
    return{
        type:"RECIEVE_ERROR",
        payload:err
    }
}

function serachByvalue(schoolname,allRecords){
    return {
         type:"SEARCH_BY_VALUE",
         payload:{schoolname,allRecords}
     }
     
 }

 function sortByvalue(allRecords,sortval){
     return{
         type:"SORT_BY_VALUE",
         payload:{allRecords,sortval}
     }
 }
 function sortByClass(allRecords,sortval){
    return{
        type:"SORT_BY_CLASS",
        payload:{allRecords,sortval}
    }
}
