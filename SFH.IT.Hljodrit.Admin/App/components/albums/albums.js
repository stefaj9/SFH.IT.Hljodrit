import React from 'react';
import {connect} from 'react-redux';
import {getAllAlbums} from '../../actions/AlbumsActions';
import PageSelector from '../common/pageSelector';
import Paging from '../common/paging';
import AlbumList from './albumListView';
import SearchBar from '../common/searchBar';
import SearchTypeSelector from './searchTypeSelector';

class Albums extends React.Component {

    componentWillMount() {
        this.props.getAllAlbums(this.state.pageSize, this.state.page, this.state.searchString,
                                this.state.searchTypes[this.state.currentSearchType]);
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            pageSize: 25,
            searchString: '',
            currentSearchType: 0,
            searchTypes: [
                'albumTitle',
                'mainArtistName',
                'releaseYear'
            ]
        }
    }

    changeSearchType(idx) {
        this.setState({
            currentSearchType: parseInt(idx)
        });
    }

    changePageSize(newPageSize) {
        this.setState({
            pageSize: newPageSize
        });

        this.props.getAllAlbums(newPageSize, this.state.page, this.state.searchString,
                                this.state.searchTypes[this.state.currentSearchType]);
    }

    changePageNumber(newPageNumber) {
        this.setState({
            page: newPageNumber
        });

        this.props.getAllAlbums(this.state.pageSize, newPageNumber, this.state.searchString,
                                this.state.searchTypes[this.state.currentSearchType]);
    }

    searchBy(search) {
        if (!search) {
            this.setState({currentSearchType: 0});
        }
        this.setState({searchString: search.trim()}, () => {
            this.props.getAllAlbums(this.state.pageSize, this.state.page, this.state.searchString,
                                    this.state.searchTypes[this.state.currentSearchType]);
        });
    }

    render() {
        return (
            <div>
                <h2>Plötur</h2>
                <div className="row space-20">
                    <div className="col-xs-12 col-sm-8 no-padding">
                        <SearchBar 
                            visible={true} 
                            searchBy={(search) => this.searchBy(search)} 
                            searchTerm={this.state.searchString}
                            iconOn={false} />
                    </div>
                    <div className="col-xs-12 col-sm-4 no-padding">
                        <SearchTypeSelector onSelect = {idx => this.changeSearchType(idx)} />
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
