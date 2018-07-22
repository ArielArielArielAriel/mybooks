import React from 'react'
import moment from 'moment'
import BookModal from './BookModal'
import { toBookTitle, formMode } from '../common/Utils'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { removeBook } from '../../../modules/books';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class BookItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditModalOpen: false,
            isDeleteModalOpen: false,
            isModalOpened: false
        };
    }

    renderDeleteButton = (id) => {
        const { isDeleteModalOpen } = this.state;
        const { removeBook } = this.props;
        //TODO: make this modal generic
        return (
            <Modal open={isDeleteModalOpen} onClose={(e) => { this.setState({ isDeleteModalOpen: false }); }} trigger={
                <Button onClick={(e) => { this.setState({ isDeleteModalOpen: true }); e.stopPropagation(); }}>
                    <i className="trash icon book-display-delete"></i>
                </Button>

            } basic size='small'>
                <Header icon='archive' content='Archive Old Books' />
                <Modal.Content>
                    <p>
                        Are you sure?
             </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => { this.setState({ isDeleteModalOpen: false }) }} basic color='red' inverted>
                        <Icon name='remove' /> No
               </Button>
                    <Button onClick={() => { removeBook(id); this.setState({ isDeleteModalOpen: false }) }} color='green' inverted>
                        <Icon name='checkmark' /> Yes
               </Button>
                </Modal.Actions>
            </Modal>
        );
    }

    render() {
        const { isEditModalOpen } = this.state;
        const { book } = this.props;
        const { id, authorName, publishDate, bookTitle } = book;

        return (
            <React.Fragment>

                <div className="card"  >


                    <div className="image" onClick={(e) => { this.setState({ isEditModalOpen: true }) }}>
                        <img alt="a book" title="a book" src="https://semantic-ui.com/images/avatar2/large/elyse.png" />
                    </div>
                    <div className="content cursor-text">
                        <div className="header">{toBookTitle(bookTitle)}</div>
                        <div className="meta">
                            <a>{id}</a>
                        </div>
                        <div className="description">
                            {authorName}
                        </div>
                    </div>
                    <div className="extra content cursor-text">
                        <span className="right floated">
                            {moment(publishDate).format('DD/MM/YYYY')}
                        </span>
                        <span>
                            <i className="user icon"></i>
                            Publish date
                    </span>
                    </div>

                    {this.renderDeleteButton(id)}

                </div>

                <BookModal isOpen={isEditModalOpen} book={book} mode={formMode.Edit} closingCallback={() => this.setState({ isEditModalOpen: false })} />

            </React.Fragment>

        );
    }

}

const mapStateToProps = null;

const mapDispatchToProps = dispatch => bindActionCreators({
    removeBook
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookItem);