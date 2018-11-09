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

