import React from 'react';
import { connect } from 'react-redux';
import { getMediaRecordingsByCriteria, hasStoppedFetchingSongs } from '../../actions/songActions';
import MediaTable from './mediaTable';
import SearchBar from '../common/searchBar';
import SearchTypeSelector from '../common/SearchTypeSelector';
import MediaSelectorData from './mediaSelectorData';

class Media extends React.Component {

    componentWillMount() {
        this.props.hasStoppedFetchingSongs();
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            page: 1,
            pageSize: 25,
            searchString: '',
            currentSearchType: Object.keys(MediaSelectorData)[0]
        };

        this.changePageSize = this.changePageSize.bind(this);
        this.changePageNumber = this.changePageNumber.bind(this);
    }

    changePageSize(newPageSize) {
        this.setState({
            pageSize: newPageSize
        });
    }

    changePageNumber(newPageNumber) {
        let thiss = this;
        this.setState({
            page: newPageNumber
        }, function() {
            thiss.props.getMediaRecordingsByCriteria(thiss.state.pageSize,
                thiss.state.page,
                thiss.state.searchString,
                thiss.state.currentSearchType);
        });
    }

    getNewSongs(e) {
        if (Media.hitReturn(e.keyCode)) {
            this.props.getMediaRecordingsByCriteria(this.state.pageSize,
                this.state.page,
                this.state.searchString,
                this.state.currentSearchType);
        }
    }

    static hitReturn(code) {
        return code === 13;
    }

    searchBy(search) {
        if (!search) {
            this.setState({currentSearchType: Object.keys(MediaSelectorData)[0]});
        }
        this.setState({searchString: search.trim()}, () => {
            this.props.getMediaRecordingsByCriteria(this.state.pageSize,
                this.state.page,
                this.state.searchString,
                this.state.currentSearchType);
        });
    }

    render() {
        return (
            <div>
                <h1>Hljóðrit</h1>
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
                                            searchOptions={MediaSelectorData} />
                    </div>
                </div>
                <div className="row">
                    <MediaTable isFetching={this.props.isFetchingPublisher}
                                objects={this.props.mediaEnvelope.objects}
                                currentPage={this.props.currentPage}
                                maximumPage={this.props.maximumPage}
                                changePageSize={this.changePageSize}
                                changePageNumber={this.changePageNumber} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetchingPublisher: state.songs.isFetchingPublisher,
        mediaEnvelope: state.songs.mediaRecordingEnvelope,
        currentPage: state.songs.mediaRecordingEnvelope.currentPage,
        maximumPage: state.songs.mediaRecordingEnvelope.maximumPage
    }
}

export default connect(mapStateToProps, { getMediaRecordingsByCriteria, hasStoppedFetchingSongs }) (Media);