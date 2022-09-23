import React from 'react';
import '../App.css';

class about extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            done: false
        };
    }

    componentDidMount() {
        fetch("/api/about.json", {
          headers : {
            'Access-Control-Allow-Origin' : '*'
          }
        })
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                data: json,
                done: true
            });
        })
    }

    render() {
        const { data, done } = this.state;
        console.log(data);
        if (!done) {
            return <div>Loading...</div>;
        }
        return (
            <div>{ JSON.stringify(data, null, 2) }</div>
        );
    }
}

export default about;
