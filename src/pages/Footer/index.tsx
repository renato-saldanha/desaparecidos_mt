import React from 'react';
 
class Footer  extends React.Component<object, object> {
    constructor(props: object) {
        super(props);
        this.state = {  };
    }
    render() { 
        return (  
            <footer className="items-center justify-center mb-2 mt-auto text-center ">
                <p>Todos os diretos reservados ©2025</p>    
            </footer>
        );
    }
}
 
export default Footer ;