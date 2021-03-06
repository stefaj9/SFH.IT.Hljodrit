import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getAllAlbums } from '../../actions/albumsActions';
import PageSelector from '../common/pageSelector';
import Paging from '../common/paging';
import AlbumList from './albumListView';
import SearchBar from '../common/searchBar';
import SearchTypeSelector from '../common/SearchTypeSelector';
import AlbumSelectorData from './albumSelectorData';

class Albums extends React.Component {

    componentWillMount() {
        this.props.getAllAlbums(this.state.pageSize, this.state.page, this.state.searchString,
                                this.state.currentSearchType);
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            pageSize: 25,
            searchString: '',
            currentSearchType: Object.keys(AlbumSelectorData)[0]
        }
    }

    changePageSize(newPageSize) {
        this.setState({
            pageSize: newPageSize
        });

        this.props.getAllAlbums(newPageSize, this.state.page, this.state.searchString,
                                this.state.currentSearchType);
    }

    changePageNumber(newPageNumber) {
        this.setState({
            page: newPageNumber
        });

        this.props.getAllAlbums(this.state.pageSize, newPageNumber, this.state.searchString,
                                this.state.currentSearchType);
    }

    searchBy(search) {
        if (!search) {
            this.setState({currentSearchType: Object.keys(AlbumSelectorData)[0]});
        }
        this.setState({searchString: search.trim()}, () => {
            this.props.getAllAlbums(this.state.pageSize, this.state.page, this.state.searchString,
                                    this.state.currentSearchType);
        });
    }

    render() {
        return (
            <div>
                <h2>Plötur</h2>
                <div className="add-project space-20 text-right row">
                    <button className="btn btn-default" onClick={() => browserHistory.push('/app/albums/createalbum')}>
                        <i className="fa fa-fw fa-plus"></i>
                        Bæta við plötu
                    </button>
                </div>
                <div className="row space-20">
                    <div className="col-xs-12 col-sm-8 no-padding">
                        <SearchBar 
                            visible={true} 
                            searchBy={(search) => this.searchBy(search)} 
                            searchTerm={this.state.searchString}
                            iconOn={false} />
                    </div>
                    <div className="col-xs-12 col-sm-4 no-padding">
                        <SearchTypeSelector onSelect = { newSearchType => this.setState({currentSearchType: newSearchType}) }
                                            searchOptions={AlbumSelectorData} />
                    </div>
                </div>
                <PageSelector change={newPageSize => this.changePageSize(newPageSize)} />
                <AlbumList albums={this.props.albums}
                        isFetching={this.props.isFetching} />
                <Paging visible={!this.props.isFetching}
                        currentPage={this.props.currentPage}
                        maximumPage={this.props.maximumPage}
                        changePage={newPageNumber => this.changePageNumber(newPageNumber)} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        albums: state.albums.envelope.objects,
        currentPage: state.albums.envelope.currentPage,
        maximumPage: state.albums.envelope.maximumPage,
        isFetching: state.albums.isFetching
    }
}

export default connect(mapStateToProps, {getAllAlbums})(Albums);
