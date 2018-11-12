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
export const  serachBySchoolname =(schoolname,allRecords) =>{
    return ((dispatch)=>{
		dispatch(serachByschoolName(schoolname,allRecords))
	})
}
export const searchByYear =(year,allRecords)=>{
    return ((dispatch)=>{
        dispatch(searchByyear(year,allRecords))
    })
}
export const searchByDistrict=(district,allRecords)=>{
    return ((dispatch)=>{
        dispatch(searchBydistrict(district,allRecords))
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

function serachByschoolName(schoolname,allRecords){
    return {
         type:"SEARCH_BY_SCHOOLNAME",
         payload:{schoolname,allRecords}
     }
     
 }
 function searchByyear(year,allRecords){
    return {
         type:"SEARCH_BY_YEAR",
         payload:{year,allRecords}
     }
     
 }
 function searchBydistrict(district,allRecords){
     return{
         type:"SEARCH_BY_DISTRICT",
         payload:{district,allRecords}
     }
 }
