import React from 'react';
import Spinner from 'react-spinner';
import ListItem from './listItem';

export default class ListView extends React.Component {

    renderList() {
        if (!this.props.isFetching) {
            return this.props.items.map((item) => {
                return <ListItem
                            key={item.id}
                            item={item}
                            add={(item) => this.props.add(item)}
                            rowClass={this.props.rowClass} />
            });
        }
    }

    render() {
        return (
            <div className={!this.props.isFetching && this.props.items.length === 0 ? 'hidden' : ''}>
                <Spinner className={this.props.isFetching ? '' : 'hidden'} />
                {this.renderList()}
            </div>
        );
    }
}
