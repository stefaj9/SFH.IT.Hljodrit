import React from 'react';
import { connect } from 'react-redux';
import { getMediaById } from '../../actions/songActions';
import Spinner from 'react-spinner';

class MediaDetails extends React.Component {
    componentWillMount() {
        this.props.getMediaById(this.props.routeParams.mediaId);
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            currentMedia: {},
            hasFetched: false
        }
    }

    renderContent() {
        if (!this.props.isFetching) {
            debugger;
            return (
                <div>
                    <h2>{ this.props.media.mediaTitle }</h2>
                    <h4>{'Flytjandi: ' + this.props.media.mainArtist }</h4>
                </div>
            );
        }


    }

    render() {
        return (
            <div>
                <Spinner className={this.props.isFetching ? '' : 'hidden'} />
                { this.renderContent() }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.songs.isFetching,
        media: state.songs.selectedMedia
    }
}

export default connect(mapStateToProps, { getMediaById }) (MediaDetails);