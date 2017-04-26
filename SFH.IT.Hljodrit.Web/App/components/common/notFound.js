import React from 'react';

export default class NotFound extends React.Component {
    render() {
        return (
            <div className="not-found">
                <div className="title">404</div>
                <div className="sub-title">Síðan sem þú leitar að, fannst ekki.</div>
            </div>
        );
    }
}