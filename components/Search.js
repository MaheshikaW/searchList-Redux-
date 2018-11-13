import React, { Component } from 'react';
import { Glyphicon, FormControl, Form } from 'react-bootstrap';

export class Search extends React.Component {

  render() {


    const styleCard = {
      borderStyle: 'ridge',
      borderWidth: 'thin',
    }
    const styleForm = {
      padding: "20px"
    }

    return (
      <div>
        <div style={styleCard} className="row">
          <div className="card">
            <br /><br />

            <Form inline style={styleForm}>
            
              <span>{this.props.error}</span>
              <Glyphicon glyph="search" /> &nbsp;
            <FormControl
                type="text"
                onChange={this.props.serachByValue}
                value={this.props.schoolName}
                name="schoolName"
                placeholder="School Name.."

              />

              &nbsp;
           <FormControl
                type="text"
                onChange={this.props.serachByValue}
                value={this.props.year}
                name="year"
                placeholder="School Year.."

              />
              &nbsp;
              <FormControl
                type="text"
                onChange={this.props.serachByValue}
                value={this.props.district}
                name="district"
                placeholder="District.."

              />
              &nbsp;

                    </Form>
            <div>

            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Search;