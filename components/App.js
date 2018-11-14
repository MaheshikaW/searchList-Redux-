import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from './Search';
import Pagination from './Pagination';
import Pageheader from './Pageheader'
import * as fetchDataActions from '../Actions/fetchDataActions';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            recordsPerPage: 35,
            pageNumbersPerPage: 5,
            schoolName: '',
            year:'',
            sortValue: '',
            district:'',
            clickTimes:0
         
            
        }
        this.handleClick = this.handleClick.bind(this);
        this.handlePages = this.handlePages.bind(this);
        this.handlePagesLess = this.handlePagesLess.bind(this);
        this.serachByValue = this. serachByValue.bind(this);
        this.sortBySchool = this.sortBySchool.bind(this);
        this.sortByYear = this.sortByYear.bind(this);
        this.sortByDistrict = this.sortByDistrict.bind(this);
        this.sortByDemographic = this.sortByDemographic.bind(this);
        this.sortByClassSize = this.sortByClassSize.bind(this);

    }

    componentDidMount() {
      
        this.props.dispatch(fetchDataActions.fetchData())
    }
    serachByValue(event) {
        this.setState({ [event.target.name]: event.target.value })
        if(event.target.value === ''){
            this.props.dispatch(fetchDataActions.fetchData())
        }
        else{
        let allRecords = this.props.studentRecords
        this.props.dispatch(fetchDataActions.serachByValue(event.target.value, allRecords))
    
}}
    sortBySchool() {
        let allRecords = this.props.studentRecords
        this.setState({ sortValue: "schoolname",clickTimes:this.state.clickTimes+1}, () => {
            this.props.dispatch(fetchDataActions.sortByValue(allRecords,this.state.sortValue,this.state.clickTimes))
        })
      }
    sortByYear() {
        let allRecords = this.props.studentRecords
        this.setState({sortValue: "schoolyear" ,clickTimes:this.state.clickTimes+1}, () => {
            this.props.dispatch(fetchDataActions.sortByValue(allRecords,this.state.sortValue,this.state.clickTimes))
        })
    }
    sortByDistrict() {
        let allRecords = this.props.studentRecords
        this.setState({sortValue: "districtname",clickTimes:this.state.clickTimes+1}, () => {
            this.props.dispatch(fetchDataActions.sortByValue(allRecords,this.state.sortValue,this.state.clickTimes))
        })
    }
    sortByDemographic() { 
        let allRecords = this.props.studentRecords
        this.setState({sortValue: "demographic",clickTimes:this.state.clickTimes+1}, () => {
            this.props.dispatch(fetchDataActions.sortByValue(allRecords,this.state.sortValue,this.state.clickTimes))
        })
    }
    sortByClassSize() {
        let allRecords = this.props.studentRecords
        this.setState({sortValue: "classsize",clickTimes:this.state.clickTimes+1}, () => {
            this.props.dispatch(fetchDataActions.sortByClassSize(allRecords,this.state.sortValue,this.state.clickTimes))
        })
    }

    handleClick(event) {
        this.setState({ currentPage: Number(event.target.id) });
    }
    handlePages() {
        let currentpages = this.state.pageNumbersPerPage
        this.setState({ pageNumbersPerPage: currentpages - 2 })
    }
    handlePagesLess() {
        let currentpages = this.state.pageNumbersPerPage
        this.setState({ pageNumbersPerPage: currentpages + 2 })
    }
    render() {
        var { currentPage, recordsPerPage, pageNumbersPerPage } = this.state;
        const indexOfLastRecord = currentPage * recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
        const currentRecordsPerPage=30;
        const currentrecords = this.props.studentRecords.slice(indexOfFirstRecord, indexOfLastRecord);

        let data;
        if (this.state.schoolName !== '' || this.state.year !== '' || this.state.district !== '' || this.state.sortValue !=='' ) {
            data = <div >{this.props.studentRecords.slice((currentPage * currentRecordsPerPage - currentRecordsPerPage), 
                (currentPage * currentRecordsPerPage)).map((student, index) =>
                <div key={index}><div className="col-md-4"  >{student.schoolname}</div>
                    <div className="col-md-1">{student.schoolyear}</div>&nbsp;
                              <div className="col-md-3" >{student.districtname}</div>
                    <div className="col-md-2" >{student.demographic}</div>
                    <div className="col-md-1" >{student.classsize}</div></div>
            )
            }</div>

        }
  
else {data = <div >{currentrecords.map((student, index) =>
                <div key={index}><div className="col-md-4" >{student.schoolname}</div>
                    <div className="col-md-1">{student.schoolyear}</div>&nbsp;
                      <div className="col-md-3" >{student.districtname}</div>
                    <div className="col-md-2" >{student.demographic}</div>
                    <div className="col-md-1" >{student.classsize}</div></div>
            )
            }</div>

        }
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.studentRecords.length / recordsPerPage); i++) {
            pageNumbers.push(i);
        }

        const nmub = [];
        for (let i = 1; i <= Math.ceil(pageNumbers.length / pageNumbersPerPage); i++) {
            nmub.push(i);
        }
        const stylea = {
            padding: 8,
            cursor: 'pointer'
        }
        const renderPageNumbers = nmub.map(number => {
            return (
                <a style={stylea}  key={number} id={number} onClick={this.handleClick}>{number}</a>
            );
        });
        return (
            <div>
             
                <Search schoolName={this.state.schoolName} year={this.state.year} district={this.state.district}  serachByValue={this.serachByValue} error={this.props.err}  />
                <div><Pageheader sortBySchool={this.sortBySchool} sortByYear={this.sortByYear} sortByDistrict={this.sortByDistrict}
                    sortByDemographic={this.sortByDemographic} sortByClassSize={this.sortByClassSize} />
                    {data}</div>
                <div>
                    <Pagination renderPageNumbers={renderPageNumbers} handlePagesLess={this.handlePagesLess}
                        handlePages={this.handlePages} />
                </div>
            </div>
        )
    }
}
const storeProps = (store) => ({
    studentRecords: store.SearchList.studentRecords,
    searchList :store.SearchList.searchList,
    error: store.SearchList.err,
   })
export default connect(storeProps)(App);