import React from 'react';

export default class Paging extends React.Component {
    render() {
        return (
            <div className={'pull-right paging' + (this.props.visible ? '' : ' hidden')}>
                <div className="page-title">{`Síða ${this.props.currentPage} af ${this.props.maximumPage}`}</div>
                <a href="#" className={this.props.currentPage === 1 ? 'disabled' : ''} onClick={() => this.props.changePage(this.props.currentPage - 1)}>Fyrri</a>..<a href="#" className={this.props.currentPage === this.props.maximumPage ? 'disabled' : ''} onClick={() => this.props.changePage(this.props.currentPage + 1)}>Næsta</a>
            </div>
        );
    }
}