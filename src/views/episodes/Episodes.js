import React, { Component } from 'react';
import api from '../../services/api';
import { CircularProgress, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Paper, TableContainer } from '@material-ui/core';
import { ReactComponent as SvgWifi} from '../../assets/icons/wifi_off-24px.svg';

class Episodes extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          data: null,
          loading: false,
          limit: 10,
          limits: [10, 25, 50],
          page: 0
        };

        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.listEpisodes()    
    }

    async listEpisodes(newFilter = null) {
        let { limit, page } = this.state;
        if (newFilter) {
            limit = newFilter.limit;
            page = newFilter.page;
        }
        this.setState({ loading: true });
        const data = await api.listEpisodes({ page: page, limit: limit});
        this.setState({ data: data, loading: false, limit: limit, page: page});
    }

    handleChangePage(event, newPage) {
        const { limit } = this.state;
        this.listEpisodes({page: newPage, limit: limit});
    }
    
    handleChangeRowsPerPage(event) {
        const newLimit = event.target.value;
        this.listEpisodes({page: 0, limit: newLimit});
    }

    render () {
        const { data, loading, page, limits, limit } = this.state;
        const online = window.navigator.onLine;

        return (
            <div>
                { data && data.episodes.length && !loading ? 
                <Paper>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { data.episodes.map((d) =>
                                <TableRow key={d.guid}>
                                    <TableCell>{d.title}</TableCell>
                                </TableRow>
                                ) }
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
                    <CircularProgress color="inherit" />
                    <span>Carregando episódios</span>
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
