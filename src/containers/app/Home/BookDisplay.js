import React from 'react'
import moment from 'moment'
import BookModal from './BookModal'
import { toBookTitle, formMode } from '../common/Utils'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class BookDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditModalOpen: false,
            isDeleteModalOpen: false,
            isModalOpened: false
        };
    }
    
    render() {
        const { isEditModalOpen, isDeleteModalOpen } = this.state;
        const { book } = this.props;
        const { id, authorName, publishDate, bookTitle } = book;

        return (
            <React.Fragment>
                <div className="card">             
                    <div className="image" onClick={(e) => {  this.setState({ isEditModalOpen: true }) }}>
                        <img alt="a book" title="a book" src="https://semantic-ui.com/images/avatar2/large/elyse.png" />
                    </div>
                    <div className="content">
                        <div className="header">{toBookTitle(bookTitle)}</div>
                        <div className="meta">
                            <a>{id}</a>
                        </div>
                        <div className="description">
                            {authorName}
                        </div>
                    </div>
                    <div className="extra content">
                        <span className="right floated">
                            {moment(publishDate).format('DD/MM/YYYY')}
                        </span>
                        <span>
                            <i className="user icon"></i>
                            Publish date
                    </span>
                    </div>
                </div>

                <BookModal isOpen={isEditModalOpen} book={book} mode={formMode.Edit} closingCallback={() => this.setState({ isEditModalOpen: false })} />

            </React.Fragment>

        );
    }

}