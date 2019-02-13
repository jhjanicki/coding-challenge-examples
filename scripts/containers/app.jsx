import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import { withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';

import Gallery from '../components/Gallery';
import Header from '../components/Header';
import { fetchData } from '../actions/dataActions';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  icon: {
    margin: theme.spacing.unit * 2
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: '#009688',
      cursor: 'pointer'
    }
  }
});

class App extends Component {
  constructor(){
    super();
    this.state = {
      order:'asc',
      asc: true,
      page:1,
      pages:[1,2,3,4,5],
      headerClass: 'header',
      logoClass:'logo',
      scrolled: false,
      fisrtClick: true
    };
    this.getRange.bind(this);
  }

  componentDidMount(){
    this.props.fetchData(this.state.page,this.state.order);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () =>{
    if(window.pageYOffset >= 100) {
       this.setState({
         headerClass: 'header_compact',
         logoClass: 'logo_compact',
         scrolled: true
       })
    }else{
      this.setState({
        headerClass: 'header',
        logoClass: 'logo',
        scrolled: false
      })
    }
  }

  handleClickOrder = () =>{

    // bug: I think it's related to async, but the order state isn't updating before the fetch so I'm manually passing

      if(this.state.order==='asc'){
       this.setState({ asc: false, order: 'desc' },this.props.fetchData(this.state.page,'desc'))
      }else{
       this.setState({ asc: true, order: 'asc' },this.props.fetchData(this.state.page,'asc'))
      }

  }

  handleClickPrev = () =>{
    if(this.state.page>=2){
      this.setState({
        page: this.state.page-1
      }, this.updatePageRange)
    }
  }

  handleClickNext = () =>{
    this.setState({
      page: this.state.page+1
    },this.updatePageRange)
  }

  handleClickPage = (e,item) =>{
    this.setState({
      page: item
    },this.updatePageRange)
  }

  updatePageRange =() =>{
    this.setState({
      pages: this.getRange(5,this.state.page)
    },this.props.fetchData(this.state.page,this.state.order))
  }

  getRange = (size, startAt = 1) => {
    if(startAt >= 3){
        return [...Array(size).keys()].map(i => i + startAt-2);
    }else if(startAt==1 || startAt ==2){
        return [1,2,3,4,5]
    }else{
        return [...Array(size).keys()].map(i => i + startAt);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header onScroll={this.handleScroll.bind(this)} headerClass={this.state.headerClass} logoClass={this.state.logoClass} scrolled={this.state.scrolled}/>
        <Container>
          <Row>
            <Col xs={12} s={6} md={4}>
              <SvgIcon className={classes.icon, classes.iconHover} onClick={this.handleClickOrder.bind(this)}>
                <path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"/>
              </SvgIcon>
              <span>Title</span>
             <SvgIcon className={classes.icon}>
              {this.state.asc?<path d="M7 14l5-5 5 5z"/>:<path d="M7 10l5 5 5-5z"/>}
            </SvgIcon>
            </Col>
            <Col xs={12} s={6} md={4} className="text-center">
              <SvgIcon className={classes.icon, classes.iconHover} onClick={this.handleClickPrev.bind(this)}>
                <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
              </SvgIcon>

              {this.state.pages.map(item => (
                <span className={`pageitem ${item==this.state.page?"activePage":""}`} onClick={((e) => this.handleClickPage(e,item)).bind(this)}>{item}</span>
              ))}
              <SvgIcon className={classes.icon, classes.iconHover} onClick={this.handleClickNext.bind(this)}>
                <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
              </SvgIcon>
            </Col>
            <Col xs={12} s={6} md={4}>
            </Col>
          </Row>
            {this.props.fetchInProgress ?
              <div className="loader-wrapper"><Loader
               type="Puff"
               color="#343a40"
               height="100"
               width="100"
              /></div>:<Gallery data={this.props.data}/>}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state =>(
  {
    data:state.data,
    fetchInProgress: state.fetchInProgress
  }
)

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (page,order) => dispatch(fetchData(page,order))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
