const defaultState = {
    studentRecords: [],
    allRecords:[],
    isLoading: false,
    err: undefined


}
const reducer = (state = defaultState, action) => {


    switch (action.type) {
        case "RECIEVE_DATA": {
            let studentRecords = [...action.payload, ...state.studentRecords]
            state = { ...state, studentRecords: studentRecords, isLoading: false, err: false ,allRecords:studentRecords}
            break
        }
        case "FETCH_DATA_START": {

            state = { ...state, isLoading: true, err: false }
            break

        }
        case "RECIEVE_ERROR": {

            state = { ...state, isLoading: false, err: action.payload }
            break
        }
        case "SEARCH_BY_VALUE": {
            let AllRecords =state.allRecords
            let searchvalues = action.payload.searchvalue
            let filterList = AllRecords
            console.log( searchvalues)
            Object.keys(searchvalues).map((key,index)=>{
                let currentFilterList = filterList.filter(student => (searchvalues[key]!="" && student[key].toLowerCase().includes(searchvalues[key] ) ))
                filterList =  [...currentFilterList]
            })
         
           state = { ...state, studentRecords: filterList}
           
           break
        }

        case "SORT_BY_VALUE": {
            let AllRecords = action.payload.allRecords
            let sortValue = action.payload.sortval
            let clickTimes = action.payload.clicks
            let sortList
            if (clickTimes % 2 == 0) {
                sortList = AllRecords.filter(student => student[sortValue] != null).sort((a, b) => {
                    if (a[sortValue] < b[sortValue]) { return -1; }
                    if (a[sortValue] > b[sortValue]) { return 1; }
                    return 0;
                })
            }
            else {
                sortList = AllRecords.filter(student => student[sortValue] != null).sort((a, b) => {
                    if (a[sortValue] > b[sortValue]) { return -1; }
                    if (a[sortValue] < b[sortValue]) { return 1; }

                    return 0;
                })
            }
                state = { ...state, studentRecords: sortList, clickTimes: clickTimes }
                break
        }
        case "SORT_BY_CLASS": {
            let AllRecords = action.payload.allRecords
            let sortValue = action.payload.sortval
            let clickTimes = action.payload.clicks
            let sortList
            if (clickTimes % 2 == 0) {
                sortList = AllRecords.filter(student => student[sortValue] != null).sort((a, b) =>
                    a[sortValue] - b[sortValue])
            }
            else {
                sortList = AllRecords.filter(student => student[sortValue] != null).sort((a, b) =>
                    b[sortValue] - a[sortValue])
            }

            state = { ...state, studentRecords: sortList }

            break
        }


    }
    return state;
}

export default reducer;