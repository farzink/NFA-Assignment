import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { getTeams, getTopCrimesForTeam } from '../../data/actions/crime-actions';

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

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class Team extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: '',
            openModal: false,
            topCrimes: []
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
            topCrimes: []
        })
    }


    componentDidMount() {
        const { teamIsFetched, getTeams } = this.props
        if (!teamIsFetched) {
            getTeams()
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

    render() {
        const { teams, getTopCrimesForTeam } = this.props
        const { topCrimes, openModal } = this.state

        return (
            <>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={3}>
                            {teams.map((team, index) => (
                                <Grid key={index} item>
                                    <Card style={{ cursor: 'pointer' }}>
                                        <CardContent>
                                            {team.Team_preffered_name}
                                            <br />
                                            {team.Team_city}
                                            <br />
                                            {team.Team_Conference_Division}
                                            <br />
                                            {team.state}
                                        </CardContent>
                                        <CardActions>                                            
                                            <Button size="small" color="primary" onClick={() => {
                                                getTopCrimesForTeam(team.Team, () => {
                                                    this.setState({
                                                        topCrimes: team.Team,
                                                    }, () => {
                                                        this.setState({
                                                            openModal: true
                                                        })
                                                    })
                                                })
                                            }}>Top Crimes ({team.arrest_count})</Button>
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
                    <DialogTitle id="alert-dialog-title">{"Top Crimes"}</DialogTitle>
                    <DialogContent>
                        {
                              teams.find(t => t.Team === topCrimes) &&
                              teams.find(t => t.Team === topCrimes).topCrimes.map((t, index) => {
                                  return (
                                      <div key={index} style={{marginBottom: 4, width: 600, display: 'flex', justifyContent: 'space-between'}}>
                                          <span>{t.Category}</span>
                                          <span>{t.arrest_count}</span>
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
    getTopCrimesForTeam: getTopCrimesForTeam
}

export default withRouter(connect(stp, atp)(Team))
