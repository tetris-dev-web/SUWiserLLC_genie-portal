import React from 'react';

class VotesViewCapitalRaisedRectText extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      showText: false,
    };
    this.handleHover = this.handleHover.bind(this)
  }

  handleHover(){
    this.SetState({showText: !this.state.showText}, ()=> console.log(this.state.showText))
  }

  render(){
    const { x, y, activation } = this.props;

    return (
        <text className="votes-view-capital-raised-text" x={x} y={y}>
          <tspan dy={".4em"}>
            {this.state.showText && `$ ${Number(activation.capital/1000.0).toLocaleString()} k`}
          </tspan>
        </text>
    );
  }
}

export default VotesViewCapitalRaisedRectText;
