import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as searchAction from '../Actions/searchActions'


class App extends Component {
    constructor(props) {
        super(props);
    
  


    }
    componentDidMount(){
        this.props.dispatch(searchAction.fetchData())
    }
   
render(){


   let data = <div >{this.props.studentRecords.map((student, index) =>
        <div key={index}><div className="col-md-2"  >{student.schoolname}</div>
            <div className="col-md-1">{student.schoolyear}</div>&nbsp;
                      <div className="col-md-3" >{student.districtname}</div>
            <div className="col-md-3" >{student.demographic}</div>
            <div className="col-md-1" >{student.classsize}</div></div>
    )
    }</div>
    return(
        <div>{data}</div>
    )
}





}
const storeProps = (store) => ({
    studentRecords:store.SearchList.studentRecords,

})
export default connect(storeProps)(App);