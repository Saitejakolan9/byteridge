import React from 'react';

import PaginationCount  from '../Pagination/PaginationCount';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

import { Navbar, Nav} from 'react-bootstrap';
import './Audit.css'
import Datatable from '../Datatable/Datatable';
class Auditpage extends React.Component {
 
    constructor(props){
        super(props)
        this.state = {
            totalItems : 0,
            currentPage : 1,
            users : null
        }
    }
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

   
    render() {
        const { user, users } = this.props;

        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand ></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link ><Link to="/">Home</Link></Nav.Link>
                        <Nav.Link href="#features">Auditor</Nav.Link>
                        <Nav.Link> <Link to="/login">Logout</Link></Nav.Link>
                    </Nav>
                </Navbar>
                <div className="col-md-6 col-md-offset-3">

                    <h1>Hi {user.firstName}!</h1>
                    <p>You're logged in with React!!</p>
                    <h3>All login audit :</h3>
                    {users.loading && <em>Loading users...</em>}
                    {users.error && <span className="text-danger">ERROR: {users.error}</span>}

                    {/* mycode */}

                    {
                        users.items ? 
                            <Datatable users={users} handleDeleteUser={(id) => this.handleDeleteUser(id)}></Datatable>
                        : <div>No data</div>
                    }
                    {/* mycode */}


                    {/* {users.items &&
                        <ul className="user-screen">
                            {users.items.map((user, index) =>
                                <li key={user.id}>
                                    {user.id + ' ' + user.role + ' ' + user.createdDate + ' '}
                                    {user.firstName + ' ' + user.lastName}
                                    {
                                        user.deleting ? <em> - Deleting...</em>
                                            : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                                : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                    }
                                </li>
                            )}

                        </ul>
                    } */}
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedAuditPage = connect(mapState, actionCreators)(Auditpage);
export { connectedAuditPage as Auditpage };