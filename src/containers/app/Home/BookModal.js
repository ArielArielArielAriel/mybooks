import React from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Header, Image, Modal } from 'semantic-ui-react'
import { formMode } from '../common/Utils'
import { ValidatorForm } from 'react-form-validator-core';
import TextValidator from '../common/TextValidator';
import consts from '../common/consts';
import { addBook, editBook } from '../../../modules/books';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import uuid from 'uuid'

//TODO: make this modal generic
class BookModal extends React.Component {
    constructor(props) {
        super(props);
        const { mode, book } = this.props;
        if (mode === formMode.Edit) {
            this.state = {
                isBookTitleUnique: true,
                currentBook: Object.assign({}, book)
            };
        } else {
            this.state = {
                currentBook: {
                    isBookTitleUnique: true,
                    id: uuid(),
                    publishDate: new Date().toISOString()
                }
            };
        }
    }

    componentWillReceiveProps() {
        const { mode } = this.props;
        if (mode === formMode.Add) {
            this.setState({
                isBookTitleUnique: true,
                currentBook:
                {
                    id: uuid(),
                    publishDate: new Date().toISOString(),
                    authorName: undefined,
                    bookTitle: undefined
                }
            });
        }
    }

    updateCurrentBookStateValue = (e, value) => {
        let { currentBook } = this.state;
        currentBook[value] = e.target.value;
        this.setState({
            currentBook: currentBook
        });
    }

    updateCurrentBookStatePublishDate = (date) => {
        if (!date) {
            return;
        }
        let { currentBook } = this.state;
        currentBook.publishDate = date;
        this.setState({
            currentBook: currentBook
        });
    }

    getModalTitle = () => {
        const { mode } = this.props;
        switch (mode) {
            case formMode.Add:
                return 'Add book';
            case formMode.Edit:
                return 'Edit book';
            default:
                return '';
        }
    };

    handleSubmit = () => {
        const { errors } = this.refs.form;
        const { currentBook } = this.state;
        const { mode, addBook, editBook, bookNames } = this.props;
        
        if (errors && errors.length) return;

        if (bookNames[currentBook.bookTitle] && bookNames[currentBook.bookTitle] !== currentBook.id) {
            this.setState({isBookTitleUnique: false});
            return;
        }


        switch (mode) {
            case formMode.Add:
                addBook(currentBook);
                break;
            case formMode.Edit:
                editBook(currentBook);
                break;
        }
        this.props.closingCallback();
    };

    render() {
        const { closingCallback, isOpen, mode } = this.props;
        const { currentBook, isBookTitleUnique } = this.state;
        const { id, authorName, publishDate, bookTitle } = currentBook;

        return (
            <Modal open={isOpen} onClose={closingCallback} onSubmit={this.handleSubmit.bind(this)} >
                <Modal.Header>{this.getModalTitle()}</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
                    <Modal.Description className="book-modal-desc">
                        <Header>Book's data</Header>

                        <ValidatorForm
                            ref="form"
                            onSubmit={this.handleSubmit}
                            instantValidate={true}
                            className="ui form field"
                        >

                            <div className="field">
                                <label> {mode === formMode.Add && '(new)'} ID: {id}</label>
                            </div>
                            <div className="field">
                                <label>Author Name</label>
                                <TextValidator
                                    onChange={(e) => this.updateCurrentBookStateValue(e, 'authorName')}
                                    value={authorName}
                                    name="author-name"
                                    placeholder="Author Name"
                                    validators={['required']}
                                    errorMessages={[consts.requiredErrorMessage]} />                           
                            </div>
                            <div className="field">
                                <label>Book Title</label>
                                <TextValidator
                                    onChange={(e) => this.updateCurrentBookStateValue(e, 'bookTitle')}
                                    value={bookTitle}
                                    name="book-title"
                                    placeholder="Book Title"
                                    validators={['required']}
                                    errorMessages={['this field is required']} />
                                    {!isBookTitleUnique && <div style={{color: 'red'}}>this field must be unique</div>}
                                    {/* TODO: add a custom rule, instead of code checking, get rid the inline style */}
                            </div>

                            <div className="field">
                                <label>Publish date</label>
                                <DatePicker readOnly onChange={(date) => this.updateCurrentBookStatePublishDate(date)} dateFormat="DD/MM/YYYY" selected={moment(publishDate)} />
                            </div>

                            <button className="ui button primary" type="submit">Submit</button>
                        </ValidatorForm>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

const mapStateToProps = ({ booksMainObj }) => ({
    books: booksMainObj.booksHashTable,
    bookNames: booksMainObj.namesHashTable
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addBook,
    editBook
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookModal);