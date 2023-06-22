import { Component } from 'react';

const liff = window.liff;

class TestLine extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            userLineID: '',
            pictureUrl: ''
        };
    }

    componentDidMount = async () => {
        await liff.init({ liffId: `1661497668-0x4z2MQE` }).catch(err => { throw err });
        if (liff.isLoggedIn()) {
            let getProfile = await liff.getProfile();
            console.log(liff.getAccessToken())
            console.log(liff.getDecodedIDToken())
            console.log(liff.getIDToken())
            //console.log(getProfile);
            this.setState({
                name: getProfile.displayName,
                userLineID: getProfile.userId,
                pictureUrl: getProfile.pictureUrl,
            });
        } else {
            liff.login();
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="support">
                        <p>ชื่อ {this.state.name}</p>
                        <p>Line ID {this.state.userLineID}</p>
                        <img alt='pic' width={200} src={this.state.pictureUrl} />
                    </div>
                </header>
                <div>
                    <button onClick={() => liff.logout()}>Logout</button>
                </div>
            </div>
        );
    }
}

export default TestLine;