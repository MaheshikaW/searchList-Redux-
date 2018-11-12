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
            year: '',
            district: '',
            sortValue: '',
            clickTimes: 0,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handlePages = this.handlePages.bind(this);
        this.handlePagesLess = this.handlePagesLess.bind(this);
        this.serachBySchoolname = this.serachBySchoolname.bind(this);
        this.searchByYear = this.searchByYear.bind(this);
        this.searchByDistrict = this.searchByDistrict.bind(this);
        this.sortBySchool = this.sortBySchool.bind(this);
        this.sortByYear = this.sortByYear.bind(this);
        this.sortByDistrict = this.sortByDistrict.bind(this);
        this.sortByDemographic = this.sortByDemographic.bind(this);
        this.sortByClassSize = this.sortByClassSize.bind(this);

    }

    componentDidMount() {
        this.props.dispatch(fetchDataActions.fetchData())
    }
    serachBySchoolname(event) {
        this.setState({ schoolName: event.target.value })
        let allRecords = this.props.studentRecords
        this.props.dispatch(fetchDataActions.serachBySchoolname(event.target.value, allRecords))

    }
    searchByYear(e) {
        let allRecords = this.props.studentRecords
        this.setState({ year: e.target.value });
        this.props.dispatch(fetchDataActions.searchByYear(e.target.value, allRecords))
    }
    searchByDistrict(e) {
        let allRecords = this.props.studentRecords
        this.setState({ district: e.target.value });
        this.props.dispatch(fetchDataActions.searchByDistrict(e.target.value, allRecords))
    }
    sortBySchool() {
        this.setState({ sortValue: "schoolname", clickTimes: this.state.clickTimes + 1 })
    }
    sortByYear() {
        this.setState({ sortValue: "schoolyear", clickTimes: this.state.clickTimes + 1 })
    }
    sortByDistrict() {
        this.setState({ sortValue: "districtname", clickTimes: this.state.clickTimes + 1 })
    }
    sortByDemographic() {
        this.setState({ sortValue: "demographic", clickTimes: this.state.clickTimes + 1 })
    }
    sortByClassSize() {
        this.setState({ sortValue: "classsize", clickTimes: this.state.clickTimes + 1 })
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
        if (this.state.schoolName !== '' || this.state.year !== '' || this.state.district !== '') {
            data = <div >{this.props.studentRecords.slice((currentPage * currentRecordsPerPage - currentRecordsPerPage), (currentPage * currentRecordsPerPage)).map((student, index) =>
                <div key={index}><div className="col-md-4"  >{student.schoolname}</div>
                    <div className="col-md-1">{student.schoolyear}</div>&nbsp;
                              <div className="col-md-3" >{student.districtname}</div>
                    <div className="col-md-2" >{student.demographic}</div>
                    <div className="col-md-1" >{student.classsize}</div></div>
            )
            }</div>

        }
        if (this.state.sortValue !== '' && this.state.clickTimes % 2 == 0) {
            data = <div >{this.props.studentRecords.filter(student => student[this.state.sortValue] != null).sort((a, b) => {
                if (a[this.state.sortValue] < b[this.state.sortValue]) { return -1; }
                if (a[this.state.sortValue] > b[this.state.sortValue]) { return 1; }
                return 0;

            }).slice((currentPage * currentRecordsPerPage - currentRecordsPerPage), (currentPage * currentRecordsPerPage)).map((student, index) =>
                <div key={index}><div className="col-md-4" >{student.schoolname}</div>
                    <div className="col-md-1" >{student.schoolyear}</div>&nbsp;
                          <div className="col-md-3">{student.districtname}</div>
                    <div className="col-md-2" >{student.demographic}</div>
                    <div className="col-md-1">{student.classsize}</div></div>
            )
            }</div>

            if (this.state.sortValue === "classsize" && this.state.clickTimes % 2 == 0) {
                data = <div >{this.props.studentRecords.filter(student => student[this.state.sortValue] != null).sort((a, b) =>
                    a[this.state.sortValue] - b[this.state.sortValue]).slice((currentPage * currentRecordsPerPage - currentRecordsPerPage), (currentPage * currentRecordsPerPage)).map((student, index) =>
                        <div key={index}><div className="col-md-4" >{student.schoolname}</div>
                            <div className="col-md-1" >{student.schoolyear}</div>&nbsp;
                                  <div className="col-md-3">{student.districtname}</div>
                            <div className="col-md-2" >{student.demographic}</div>
                            <div className="col-md-1">{student.classsize}</div></div>
                    )
                }</div>
            }
        }
        else if (this.state.sortValue !== '') {

            data = <div >{this.props.studentRecords.filter(student => student[this.state.sortValue] != null).sort((a, b) => {
                if (a[this.state.sortValue] > b[this.state.sortValue]) { return -1; }
                if (a[this.state.sortValue] < b[this.state.sortValue]) { return 1; }
                return 0;

            }).slice((currentPage * currentRecordsPerPage - currentRecordsPerPage), (currentPage * currentRecordsPerPage)).map((student, index) =>
                <div key={index}><div className="col-md-4" >{student.schoolname}</div>
                    <div className="col-md-1" >{student.schoolyear}</div>&nbsp;
                          <div className="col-md-3">{student.districtname}</div>
                    <div className="col-md-2" >{student.demographic}</div>
                    <div className="col-md-1">{student.classsize}</div></div>
            )
            }</div>
        }
        else {
            data = <div >{currentrecords.map((student, index) =>
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
                <Search schoolName={this.state.schoolName} serachBySchoolname={this.serachBySchoolname} year={this.state.year}
                    searchByYear={this.searchByYear} searchByDistrict={this.searchByDistrict} error={this.props.err} district={this.state.district} />
                <div> <Pageheader sortBySchool={this.sortBySchool} sortByYear={this.sortByYear} sortByDistrict={this.sortByDistrict}
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
    error: store.SearchList.err,
   
})
export default connect(storeProps)(App);