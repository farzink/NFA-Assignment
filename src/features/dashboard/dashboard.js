import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { getCrimes } from '../../data/actions/crime-actions';
import TextField from '@material-ui/core/TextField';


import Button from '@material-ui/core/Button';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: ''
        }
    }

    componentDidMount() {
        const { isFetched, getCrimes } = this.props
        if (!isFetched) {
            getCrimes()
        }
    }

    refine(crimes) {
        const { searchTerm } = this.state
        if (searchTerm !== '') {
            return crimes.filter(c => c.Category.includes(searchTerm) || c.arrest_count.includes(searchTerm))
        }
        return crimes

    }

    search(term) {
        this.setState({
            searchTerm: term
        })
    }

    render() {
        const { crimes } = this.props
        return (
            <div>
                <div>
                    <TextField
                        id="outlined-search"
                        label="Search field"
                        type="search"                        
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => {
                            this.search(e.target.value)
                        }}
                    />                    
                </div>
                <div>
                    {
                        this.refine(crimes).map((c, index) => (
                            <Button key={index} style={{ margin: 5 }} variant="contained" color="default">{c.Category} ({c.arrest_count})</Button>
                        ))
                    }
                </div>
            </div>
        )
    }
}

const stp = (state, props) => {
    return {
        crimeRequestStatus: state.crimes.crime.requestStatus,
        crimeIsFetched: state.crimes.crime.isFetched,
        crimes: state.crimes.crime.data,
    }
}

const atp = {
    getCrimes: getCrimes

}

export default withRouter(connect(stp, atp)(Dashboard))
