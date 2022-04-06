const reactSnippets = [
    {
        key: 'export default component',
        prefix: 'edc',
        body: `const $1 = () => {return <div>$1</div>;};export default $1;`,
        specification: '',
        description: ''
    },
    {
        key: 'export default connect component',
        prefix: 'edcc',
        body: `import { connect } from 'react-redux';
        import { bindActionCreators } from 'redux';
        
        const App = ({ user, actions }) => {
            return (
                <div>
                    <h1>{{ user }}</h1>
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
            };};
            export default connect(mapStateToProps, mapDispatchToProps)(App);`,
        specification: '',
        description: ''
    }
];

module.exports = reactSnippets;

