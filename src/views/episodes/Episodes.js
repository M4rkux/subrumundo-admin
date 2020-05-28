import React, { Component } from 'react';
import api from '../../services/api';
import { CircularProgress, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Paper, TableContainer, TableSortLabel } from '@material-ui/core';
import { ReactComponent as SvgWifi} from '../../assets/icons/wifi_off-24px.svg';
import utils from '../../services/utils';
import './Episodes.scss';

class Episodes extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          data: null,
          loading: false,
          limit: 10,
          limits: [10, 25, 50],
          page: 0,
          order: {
              by: 'isoDate',
              asc: false
            }
        };

        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeOrder = this.handleChangeOrder.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.listEpisodes()    
    }

    async listEpisodes(newFilter = null) {
        let { limit, page, order } = this.state;
        if (newFilter) {
            limit = newFilter.limit;
            page = newFilter.page;
            order = newFilter.order;
        }
        this.setState({ loading: true });
        const data = await api.listEpisodes({ page: page, limit: limit, order: order});
        this.setState({ data: data, loading: false, limit: limit, page: page, order: order});
    }

    handleChangePage(event, newPage) {
        const { limit, order } = this.state;
        this.listEpisodes({page: newPage, limit: limit, order: order});
    }
    
    handleChangeRowsPerPage(event) {
        const newLimit = event.target.value;
        const { order } = this.state;
        this.listEpisodes({page: 0, limit: newLimit, order: order});
    }

    handleChangeOrder(event, orderBy) {
        const { page, limit, order } = this.state;
        const newOrder = {
            by: orderBy,
            asc: !order.asc
        }
        this.listEpisodes({page: page, limit: limit, order: newOrder});
    }

    render () {
        const { data, loading, page, limits, limit, order } = this.state;
        const online = window.navigator.onLine;

        return (
            <div>
                { data && data.episodes.length ? 
                <Paper>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="column-title">
                                        <TableSortLabel
                                            active={order.by === 'title'}
                                            direction={order.by === 'title' && !order.asc ? 'desc' : 'asc'}
                                            onClick={event => {this.handleChangeOrder(event, 'title')}}>Nome</TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel 
                                            active={order.by === 'isoDate'}
                                            direction={order.by === 'isoDate' && !order.asc ? 'desc' : 'asc'}
                                            onClick={event => {this.handleChangeOrder(event, 'isoDate')}}>Data de publicação</TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel>Exclusiva de patrões</TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel>Jogável</TableSortLabel>
                                    </TableCell>
                                    <TableCell>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { !loading ? data.episodes.map((d) =>
                                <TableRow key={d.guid}>
                                    <TableCell>{d.title}</TableCell>
                                    <TableCell>{utils.formatDate(d.isoDate)}</TableCell>
                                    <TableCell>{d.patrons ? 'Sim' : 'Não'}</TableCell>
                                    <TableCell>{d.playable ? 'Sim' : 'Não'}</TableCell>
                                    <TableCell>XXX</TableCell>
                                </TableRow>
                                ) : <TableRow>
                                    <TableCell colSpan="5" className="table-loading">
                                        <CircularProgress color="inherit" />
                                    </TableCell>
                                </TableRow> }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={limits}
                        component="div"
                        count={data.total}
                        rowsPerPage={limit}
                        page={page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
                    
                : loading ? <div className="loading-div">
                    <CircularProgress color="primary" />
                </div> : 
                <div className="no-connection">
                    <SvgWifi className="white" />
                    {online ?
                        <span>Algo deu errado com o serviço do google, tente novamente em alguns instantes</span>
                        :
                        <span>A lista de episódios ficará indisponível enquanto você estiver offline</span> }
                </div>
            }
            </div>
        );
    }
}

export default Episodes;
