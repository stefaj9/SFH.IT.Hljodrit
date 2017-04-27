import React, {PropTypes} from 'react';
import moment from 'moment';

const MediaDetailsForm = ({title, artist, isrc, duration, publisher, label, releaseYear}) => {
    return (
        <div>
            <h2>{title}</h2>
            <div className="row">
                <div className="col-xs-12 col-sm-6 form-group">
                    <label>Aðalflytjandi</label>
                    <input type="text" className="form-control" disabled="true"
                           value={artist} />
                </div>
                <div className="col-xs-12 col-sm-6 form-group">
                    <label>Isrc</label>
                        <input type="text" className="form-control"disabled="true"
                               value={isrc}
                        />
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-6 form-group">
                    <label>Útgefandi</label>
                        <input type="text" className="form-control" disabled="true"
                               value={publisher != null ? publisher.fullName : 'Ekki skráð'}/>
                </div>
                <div className="col-xs-12 col-sm-6 form-group">
                    <label>Label</label>
                    <input type="text" className="form-control" disabled="true"
                           value={label != null ? label.labelName : 'Ekki skráð'}>
                    </input>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-6 form-group">
                    <label>Lengd</label>
                        <input type="text" className="form-control" disabled="true"
                               value={duration}/>
                </div>
                <div className="col-xs-12 col-sm-6 form-group">
                    <label>Útgáfuár</label>
                    <input type="text" className="form-control" disabled="true"
                           value={moment(releaseYear).format('ll')}>
                    </input>
                </div>
            </div>
        </div>
    )
};

MediaDetailsForm.propTypes = {
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    isrc: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    publisher: PropTypes.object,
    label: PropTypes.object,
    releaseYear: PropTypes.string.isRequired
};

export default MediaDetailsForm;