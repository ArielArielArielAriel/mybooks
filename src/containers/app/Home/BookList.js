import React from 'react'
import { Button } from 'semantic-ui-react'
import BookItem from './BookItem'
import { connect } from 'react-redux'
import { formMode } from './../common/Utils'
import BookModal from './../Home/BookModal'

class BookList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAddModalOpen: false,
        };
    }

    render() {
        const { books } = this.props;
        const { isAddModalOpen } = this.state;

        return (
            <div className="ui link cards center aligned segment book-list">
                <div className="full-width">

                    <Button className="open-book-modal" onClick={(e) => { this.setState({ isAddModalOpen: true }) }} positive>Add</Button>
                    <BookModal isOpen={isAddModalOpen} mode={formMode.Add} closingCallback={() => this.setState({ isAddModalOpen: false })} />

                </div>

                {
                    books && typeof (books) === 'object' &&
                    Object.keys(books).map(key => <BookItem key={key} book={books[key]} />)
                }
            </div>
        );
    }
}

const mapStateToProps = ({ booksMainObj }) => ({
    books: booksMainObj.booksHashTable
});

const mapDispatchToProps = null;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookList);