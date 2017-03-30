import React from 'react';
import {connect} from 'react-redux';
import {getAllAlbums} from '../../actions/AlbumsActions';
import PageSelector from '../common/pageSelector';
import Paging from '../common/paging';
import AlbumList from './albumListView';

class Albums extends React.Component {

    componentWillMount() {
        this.props.getAllAlbums(this.state.pageSize, this.state.page);
    }
    constructor(props, context) {
        super(props, context);

        this.state = {
            page: 1,
            pageSize: 25,
        }
    }

    changePageSize(newPageSize) {
        this.setState({
            pageSize: newPageSize
        });

        this.props.getAllAlbums(newPageSize, this.state.page);
    }

    render() {
        return (
            <div>
                <h2>Plötur</h2>
                <PageSelector change={newPageSize => this.changePageSize(newPageSize)} />
                <AlbumList albums={this.props.albums}
                               isFetching={this.props.isFetching}
                               onSelect={this.props.selectAlbum} />
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
