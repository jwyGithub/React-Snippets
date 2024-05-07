import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const App = ({ user, actions }) => {
    return (
        <div>
            <h1>{user}</h1>
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        user: state.user ?? 'test'
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        actions: bindActionCreators(
            {
                writeComment: comment => ({
                    comment,
                    type: 'WRITE_COMMENT'
                })
            },
            dispatch
        )
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

