import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { getTeams, getTopCrimesForTeams } from '../../data/actions/crime-actions';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { states as allStates } from "./../../data/reducers/crime-reducer";

class State extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: '',
            openModal: false,
            states: [],
            items: []
        }
    }

    handleClickOpen() {
        this.setState({
            openModal: true
        })
    }

    handleClose() {
        this.setState({
            openModal: false,
        })
    }


    componentDidMount() {
        const { teamIsFetched, getTeams } = this.props
        if (!teamIsFetched) {
            getTeams(() => {
                this.getStates()
            })
        } else {
            this.getStates()
        }

    }

    refine(teams) {
        const { searchTerm } = this.state
        if (searchTerm !== '') {
            return teams.filter(c => c.Category.includes(searchTerm) || c.arrest_count.includes(searchTerm))
        }
        return teams

    }

    search(term) {
        this.setState({
            searchTerm: term
        })
    }

    getStates() {
        const { teams } = this.props
        this.setState({
            states: teams.reduce((acc, val) => {
                if (acc[val.state]) {
                    acc[val.state].cities.push(val)
                } else {
                    acc[val.state] = {
                        state: val.state,
                        cities: [val]
                    }
                }
                return acc
            }, [])
        })
    }

    calculateCrimeForState(cities) {
        const { teams, getTopCrimesForTeams } = this.props

        const teamMoniker = cities.map(c => c.Team)
        getTopCrimesForTeams(teamMoniker, () => {
            const totalCrimes = cities.flatMap(c => c.topCrimes)
                .reduce((acc, val) => {
                    if (acc[val.Category]) {
                        acc[val.Category].arrest_count += +val.arrest_count
                    } else {
                        acc[val.Category] = {
                            Category: val.Category,
                            arrest_count: +val.arrest_count
                        }
                    }

                    return acc
                }, [])
            totalCrimes.sort((a, b) => {
                console.log(a, b);
                return 0
            })

            this.setState({
                items: totalCrimes,
            }, () => {
                this.setState({
                    openModal: true
                })
            }
            )




        })
    }

    render() {
        const { teams, getTopCrimesForTeams } = this.props
        const { states, openModal, items } = this.state

        return (
            <>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={3}>
                            {Object.entries(states).map((state, index) => (
                                <Grid key={index} item xs={3}>
                                    <Card >
                                        <CardContent>

                                            <span>
                                                {state[1].state}
                                            </span>
                                            <span>
                                                ({state[1].cities.length})
                                            </span>
                                            <hr />
                                            <div>
                                                {

                                                    teams.filter(t => t.state == state[1].state)
                                                        .map((e,index) => {
                                                            return <div key={index}>
                                                                <div style={{ display: "inline-block", margin: 2}}>{e.Team}</div>
                                                                <div style={{ display: "inline-block", margin: 2}}>{e.topCrimes.length !=0 && e.topCrimes.length}</div>
                                                            </div>
                                                        })
                                                }
                                            </div>

                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="secondary" onClick={() => {
                                                this.calculateCrimeForState(state[1].cities)
                                            }}>Most Popular Crimes</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                <Dialog
                    open={openModal}
                    onClose={this.handleClose.bind(this)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="lg"
                >
                    <DialogTitle id="alert-dialog-title">{"Total Crimes"}</DialogTitle>
                    <DialogContent>
                        {
                            Object.entries(items).map((t, index) => {
                                return (
                                    <div key={index} style={{ marginBottom: 4, width: 600, display: 'flex', justifyContent: 'space-between' }}>
                                        <span>{t[1].Category}</span>
                                        <span>{t[1].arrest_count}</span>
                                    </div>
                                )
                            })
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose.bind(this)} color="primary" autoFocus>
                            Close
                         </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

const stp = (state, props) => {
    return {
        teamRequestStatus: state.crimes.team.requestStatus,
        teamIsFetched: state.crimes.team.isFetched,
        teams: state.crimes.team.data,
    }
}

const atp = {
    getTeams: getTeams,
    getTopCrimesForTeams: getTopCrimesForTeams
}

export default withRouter(connect(stp, atp)(State))
